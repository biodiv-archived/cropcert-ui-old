import {
  Button,
  ContentSwitcher,
  DataTable,
  InlineLoading,
  Switch,
  Dropdown,
} from "carbon-components-react";
import { observer } from "mobx-react";
import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";

import BatchListCell from "./batch-list-cell";
import BatchListModal from "./batch-list-modal";
import { FIELDS_DRY, FIELDS_WET } from "./header.constants";
import { BatchingStore } from "/@stores/batching.store";
import { navigate } from "gatsby";

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableHeader,
  TableSelectAll,
  TableSelectRow,
} = DataTable;

interface IState {
  batchType;
  modalData;
  isModalOpen;
  ccCode;
  ccName;
}

interface IProps {
  accessibleCCs;
}

@observer
export default class BatchListComponent extends Component<IProps, IState> {
  batchingStore = new BatchingStore();

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      batchType: "DRY",
      ccCode: this.props.accessibleCCs[0].id,
      ccName: this.props.accessibleCCs[0].ccName,
      modalData: { type: null, id: null, value: null },
    };
  }

  componentDidMount() {
    this.batchingStore.lazyList(true, this.state.batchType, this.state.ccCode);
  }

  handleSubmit = (modalType, form) => {
    this.batchingStore.updateBatchInfo(modalType, form);
    this.closeModal();
  };

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
          <h1 className="eco--title">Batches</h1>
        </div>
        <div className="bx--col-lg-6 bx--col-md-12 text-right">
          <Button
            kind="primary"
            className="eco--button-table-primary"
            disabled={selectedRows.length <= 0}
            onClick={() => {
              navigate("/collection-center/lot/create", {
                state: {
                  selectedRows,
                  lotType: this.state.batchType,
                  ccCode: this.state.ccCode,
                  ccName: this.state.ccName,
                },
              });
            }}
          >
            Create Lot
          </Button>
        </div>
      </div>

      <div className="bx--row">
        <div className="bx--col-lg-4 bx--col-md-12">
          <Dropdown
            id="cc-selector"
            label="Collection Center"
            titleText="Collection Center"
            initialSelectedItem={this.props.accessibleCCs[0]}
            items={this.props.accessibleCCs}
            onChange={({ selectedItem }) => {
              this.setState({
                ccCode: selectedItem.id,
                ccName: selectedItem.ccName,
              });
              this.batchingStore.lazyList(
                true,
                this.state.batchType,
                selectedItem.id
              );
            }}
          />
        </div>
        <div className="bx--col-lg-2 bx--offset-lg-6">
          <ContentSwitcher
            className="eco--button-switcher"
            onChange={({ name }) => {
              this.setState({ batchType: name });
              this.batchingStore.lazyList(true, name, this.state.ccCode);
            }}
          >
            <Switch name="DRY" text="DRY" />
            <Switch name="WET" text="WET" />
          </ContentSwitcher>
        </div>
      </div>

      <br />

      <InfiniteScroll
        pageStart={0}
        loadMore={() => {
          rows.length > 0
            ? this.batchingStore.lazyList(
                false,
                this.state.batchType,
                this.state.ccCode
              )
            : null;
        }}
        hasMore={this.batchingStore.lazyListHasMore}
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
    </>
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
        <BatchListModal
          isModalOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
          handleSubmit={this.handleSubmit}
          modalData={this.state.modalData}
        />
        <DataTable
          rows={this.batchingStore.batches || []}
          headers={this.state.batchType === "DRY" ? FIELDS_DRY : FIELDS_WET}
          render={this.renderDataTable}
        />
      </>
    );
  }
}
