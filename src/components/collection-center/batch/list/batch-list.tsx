import { DataTable, InlineLoading, Tab, Tabs } from "carbon-components-react";
import { observer } from "mobx-react";
import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";

import BatchListCell from "./batch-list-cell";
import BatchListModal from "./batch-list-modal";
import { FIELDS_DRY, FIELDS_WET } from "./header.constants";
import { BatchingStore } from "/@stores/batching.store";

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  TableSelectAll,
  TableSelectRow,
} = DataTable;

interface IState {
  batchType;
  modalData;
  isModalOpen;
}

@observer
export default class BatchListComponent extends Component<{}, IState> {
  batchingStore = new BatchingStore();

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      batchType: "DRY",
      modalData: { type: null, id: null, value: null },
    };
  }

  componentDidMount() {
    this.batchingStore.lazyList(true, this.state.batchType);
  }

  renderDataTable = ({
    rows,
    headers,
    getHeaderProps,
    getSelectionProps,
    getRowProps,
  }) => (
    <InfiniteScroll
      pageStart={0}
      loadMore={() => {
        rows.length > 0
          ? this.batchingStore.lazyList(false, this.state.batchType)
          : null;
      }}
      hasMore={this.batchingStore.lazyListHasMore}
      loader={<InlineLoading key={rows.length} description="Loading data..." />}
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
                    {row.cells.map(cell =>
                      BatchListCell(cell, row.id, this.openModal)
                    )}
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </InfiniteScroll>
  );

  openModal = (modalType, id, value) => {
    this.setState({
      modalData: {
        modalType,
        id,
        value,
      },
      isModalOpen: true,
    });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    return (
      <>
        <h1 className="eco--title">Batches</h1>
        <BatchListModal
          isModalOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
          modalData={this.state.modalData}
        />
        <Tabs>
          <Tab
            label="Dry"
            onClick={() => {
              this.setState({ batchType: "DRY" });
              this.batchingStore.lazyList(true, "DRY");
            }}
          />
          <Tab
            label="Wet"
            onClick={() => {
              this.setState({ batchType: "WET" });
              this.batchingStore.lazyList(true, "WET");
            }}
          />
        </Tabs>
        <DataTable
          rows={this.batchingStore.batches || []}
          headers={this.state.batchType === "DRY" ? FIELDS_DRY : FIELDS_WET}
          render={this.renderDataTable}
        />
      </>
    );
  }
}
