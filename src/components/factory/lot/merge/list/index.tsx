import "./list.scss";

import { Button, DataTable, InlineLoading } from "carbon-components-react";
import { observer } from "mobx-react";
import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";

import { LOT_BASIC } from "./header.constants";
import { LotStore } from "/@stores/lot.store";

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
  TableSelectAll,
  TableSelectRow,
} = DataTable;

@observer
export default class MergeLotListComponent extends Component {
  lotStore = new LotStore();

  componentDidMount() {
    this.lotStore.lazyListLot(true);
  }

  renderDataTable = ({
    rows,
    headers,
    getHeaderProps,
    getSelectionProps,
    selectedRows,
    getRowProps,
  }) => (
    <>
      <div className="bx--row">
        <div className="bx--col-lg-6 bx--col-md-12">
          <h1 className="eco--title">Merge Lots</h1>
        </div>
        <div className="bx--col-lg-6 bx--col-md-12 text-right">
          <Button
            kind="primary"
            className="eco--button-table-primary multiple"
            disabled={selectedRows.length <= 0}
            onClick={() => {
              alert("TODO");
            }}
          >
            Merge & Process
          </Button>
          <Button
            kind="primary"
            className="eco--button-table-primary multiple"
            disabled={selectedRows.length <= 0}
            onClick={() => {
              this.lotStore.processLot(selectedRows);
            }}
          >
            Process
          </Button>
        </div>
      </div>
      <br />
      <InfiniteScroll
        pageStart={0}
        loadMore={() => {
          rows.length > 0 ? this.lotStore.lazyListLot(false) : null;
        }}
        hasMore={this.lotStore.lazyListHasMore}
        loader={
          <InlineLoading key={rows.length} description="Loading data..." />
        }
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableSelectAll {...getSelectionProps()} />
                {headers.map(header => (
                  <TableHeader {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => {
                return (
                  <React.Fragment key={row.id}>
                    <TableRow {...getRowProps({ row })}>
                      <TableSelectRow {...getSelectionProps({ row })} />
                      {row.cells.map(cell => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </InfiniteScroll>
    </>
  );

  render() {
    return (
      <>
        <DataTable
          rows={this.lotStore.lots || []}
          headers={LOT_BASIC}
          render={this.renderDataTable}
        />
      </>
    );
  }
}
