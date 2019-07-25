import "react-sortable-tree/style.css";
import "./pagestyle.scss";

import React, { useEffect, useState } from "react";
import SortableTree, { toggleExpandedForAll } from "react-sortable-tree";
import DocumentAdd from "@carbon/icons-react/es/document--add/20";
import Edit from "@carbon/icons-react/es/edit/20";
import ArrowRight from "@carbon/icons-react/es/arrow--right/20";
import ArrowLeft from "@carbon/icons-react/es/arrow--left/20";
import { Button, TextInput, Search } from "carbon-components-react";
import { navigate } from "gatsby";

export default function PageList({ pagesStore, pages }) {
  const [searchString, setSearchString] = useState("");
  const [searchFocusIndex, setSearchFocusIndex] = useState(0);
  const [searchFoundCount, setSearchFoundCount] = useState(0);
  const [treeData, setTreeData] = useState([] as any);

  useEffect(() => {
    setTreeData(pages);
  }, [pages]);

  const handleTreeOnChange = treeData => {
    setTreeData(treeData);
  };

  const handleSearchOnChange = e => {
    setSearchString(e.target.value);
  };

  const selectPrevMatch = () => {
    setSearchFocusIndex(
      searchFocusIndex !== null
        ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
        : searchFoundCount - 1
    );
  };

  const selectNextMatch = () => {
    setSearchFocusIndex(
      searchFocusIndex !== null ? (searchFocusIndex + 1) % searchFoundCount : 0
    );
  };

  const toggleNodeExpansion = expanded => {
    setTreeData(
      toggleExpandedForAll({
        treeData,
        expanded,
      })
    );
  };

  const alertNodeInfo = ({ node, path, treeIndex }) => {
    const objectString = Object.keys(node)
      .map(k => (k === "children" ? "children: Array" : `${k}: '${node[k]}'`))
      .join(",\n   ");

    alert(
      "Info passed to the button generator:\n\n" +
        `node: {\n   ${objectString}\n},\n` +
        `path: [${path.join(", ")}],\n` +
        `treeIndex: ${treeIndex}`
    );
  };

  const managePage = id => {
    navigate(`/admin/pages/manage-page?id=${id}&mode=edit`);
  };

  const createPage = (id = -1) => {
    navigate(`/admin/pages/manage-page?parentId=${id}&mode=create`);
  };

  const generateNodeProps = rowInfo => ({
    buttons: [
      <button
        className="eco--btn-transparent"
        onClick={() => managePage(rowInfo.node.id)}
      >
        <Edit />
      </button>,
      <button
        className="eco--btn-transparent"
        onClick={() => createPage(rowInfo.node.id)}
      >
        <DocumentAdd />
      </button>,
    ],
  });

  const RenderSortableTree = () => (
    <SortableTree
      treeData={treeData}
      onChange={handleTreeOnChange}
      onMoveNode={console.log}
      maxDepth={5}
      searchQuery={searchString}
      searchFocusOffset={searchFocusIndex}
      canDrag={({ node }) => !node.noDragging}
      canDrop={({ nextParent }) => !nextParent || !nextParent.noChildren}
      searchFinishCallback={matches => {
        setSearchFoundCount(matches.length);
        setSearchFocusIndex(
          matches.length > 0 ? searchFocusIndex % matches.length : 0
        );
      }}
      isVirtualized={true}
      generateNodeProps={generateNodeProps}
    />
  );

  return (
    <>
      <div className="bx--row">
        <div className="bx--col-lg-4 bx--col-md-12">
          <h1 className="eco--title">Static Pages</h1>
        </div>
        <div className="bx--col-lg-4 bx--col-md-12 eco--title-actions">
          <Button onClick={() => toggleNodeExpansion(true)}>Expand all</Button>
          <Button onClick={() => toggleNodeExpansion(false)}>
            Collapse all
          </Button>
        </div>
        <div className="bx--col-lg-4 bx--col-md-12 eco--title-actions">
          <div style={{ display: "flex" }}>
            <Search
              labelText="Search"
              onChange={handleSearchOnChange}
              id="search-1"
            />
            <button
              onClick={selectPrevMatch}
              className="bx--search-button"
              type="button"
              aria-label={"Previous"}
              title={"Previous"}
            >
              <ArrowLeft />
            </button>
            <button
              onClick={selectNextMatch}
              className="bx--search-button"
              type="button"
              aria-label={"Next"}
              title={"Next"}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <div className="tree-wrapper">
          {treeData.length > 0 && RenderSortableTree()}
        </div>
      </div>
    </>
  );
}
