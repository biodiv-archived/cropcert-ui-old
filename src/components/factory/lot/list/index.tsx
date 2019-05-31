import { Button, DataTable, InlineLoading } from "carbon-components-react";
import { navigate } from "gatsby";
import { observer } from "mobx-react";
import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";

import { LOT_BASIC } from "./header.constants";
import { LotStore } from "/@stores/lot.store";
import LotListCell from "./lot-list-cell";
import LotListModal from "./lot-list-modal";

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

interface IState {
  lotType;
  modalData;
  isModalOpen;
}

@observer
export default class LotListComponent extends Component<{}, IState> {
  lotStore = new LotStore();

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      modalData: { type: null, id: null, value: null },
      isModalOpen: false,
    };
  }

  componentDidMount() {
    this.lotStore.lazyListLot(true);
  }

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

  handleSubmit = (modalType, form) => {
    this.lotStore.updateLotInfo(modalType, form);
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
          <h1 className="eco--title">
            Lots
          </h1>
        </div>
        <div className="bx--col-lg-6 bx--col-md-12 text-right">
          <Button
            kind="primary"
            className="eco--button-table-primary"
            disabled={selectedRows.length <= 0}
            onClick={() => {
              alert("TODO");
              // console.log(selectedRows);
              // navigate("/collection-center/lot-processing/create", {
              //   state: { selectedRows },
              // });
            }}
          >
            Send to NUCAFE
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
                      {row.cells.map(cell =>
                        LotListCell(cell, row.id, this.openModal)
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

  render() {
    return (
      <>
        <LotListModal
          isModalOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
          handleSubmit={this.handleSubmit}
          modalData={this.state.modalData}
        />
        <DataTable
          rows={this.lotStore.lots || []}
          headers={LOT_BASIC}
          render={this.renderDataTable}
        />
      </>
    );
  }
}
