import "../../list/batching-table/batching-table.component.scss";

import {
  Button,
  Checkbox,
  DataTable,
  Loading,
} from "carbon-components-react";
import { If } from "control-statements";
import { navigate } from "gatsby";
import { observer } from "mobx-react";
import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";

import ExpandRow from "../../list/batching-table/expandrow";
import { TABLE_HEADER_FIELDS } from "../../list/batching-table/header.constants";
import { CollectionStore } from "/@stores/collections.store";

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  TableSelectRow,
  TableSelectAll,
  TableExpandRow,
  TableExpandHeader,
} = DataTable;

interface IProps {
  isAvailableOnly: boolean;
}

interface IState {
  isAvailableOnly: boolean;
}

@observer
export default class CollectionListComponent extends Component<IProps, IState> {
  collectionStore = new CollectionStore();

  constructor(props) {
    super(props);
    this.collectionStore.lazyList(true);
  }

  componentDidMount = () => {
    this.setState({ isAvailableOnly: this.props.isAvailableOnly });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  updateByAvailability = v => {
    this.setState({ isAvailableOnly: v });
  };

  createBatch = selectedRows => {
    const sRows = selectedRows.map(row => ({
      collectionId: parseInt(row.id),
      quantity: row.cells[4].value,
      availableQuantity: row.cells[5].value,
    }));
    navigate("/collection-center/batch/create", {
      state: { selectedCollections: sRows },
    });
  };

  renderDataTable = ({
    rows,
    headers,
    getHeaderProps,
    getSelectionProps,
    selectedRows,
    getRowProps,
  }) => {
    return (
      <>
        <div className="bx--row">
          <div className="bx--col-lg-9 bx--col-sm-12">
            <Button
              kind="primary"
              disabled={selectedRows.length <= 0}
              className="eco--button-table-primary"
              onClick={() => this.createBatch(selectedRows)}
            >
              Create Batch
            </Button>
            <h1 className="eco--title">Collections</h1>
            <InfiniteScroll
              pageStart={0}
              loadMore={() => {
                rows.length > 0 ? this.collectionStore.lazyList(false) : null;
              }}
              hasMore={this.collectionStore.lazyListHasMore}
              loader={
                <Loading
                  key={rows.length}
                  description="Loading data..."
                />
              }
            >
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableExpandHeader />
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
                      const availableKgs = row.cells[5].value > 0;
                      return (
                        <React.Fragment key={row.id}>
                          <If
                            condition={
                              this.state.isAvailableOnly ? availableKgs : true
                            }
                          >
                            <TableExpandRow {...getRowProps({ row })}>
                              <TableSelectRow {...getSelectionProps({ row })} />
                              {row.cells.map(cell => (
                                <TableCell key={cell.id}>
                                  {cell.value}
                                </TableCell>
                              ))}
                            </TableExpandRow>
                            {row.isExpanded && (
                              <ExpandRow
                                collectionStore={this.collectionStore}
                                colSpan={headers.length + 2}
                                collectionId={row.id}
                              />
                            )}
                          </If>
                        </React.Fragment>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </InfiniteScroll>
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <h1 className="eco--title">Filter</h1>
            <fieldset className="bx--fieldset">
              <legend className="bx--label">Available for batching</legend>
              <Checkbox
                {...(this.props.isAvailableOnly
                  ? { defaultChecked: true }
                  : null)}
                labelText="Available Only"
                onChange={this.updateByAvailability}
                id="availability"
              />
            </fieldset>
          </div>
        </div>
      </>
    );
  };

  render() {
    return (
      <DataTable
        rows={this.collectionStore.collections || []}
        headers={TABLE_HEADER_FIELDS}
        render={this.renderDataTable}
      />
    );
  }
}
