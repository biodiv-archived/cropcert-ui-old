import { Button, DataTable, InlineLoading } from "carbon-components-react";
import { navigate } from "gatsby";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";

import ExpandRow from "./expandrow";
import {
  LOT_BASIC,
  LOT_FACTORY,
  LOT_UNION_CUPPING,
  LOT_UNION_GREEN,
  LOT_UNION_GRN,
} from "./header.constants";
import LotListCell from "./lot-list-cell";
import LotListModal from "./lot-list-modal";
import { LotStore } from "/@stores/lot.store";
import { LOT_ACTIONS, LOT_STATUS } from "/@utils/constants";

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
  TableExpandHeader,
  TableExpandRow,
} = DataTable;

interface IState {
  lotType;
  modalData;
  isModalOpen;
}

interface IProps {
  lotStatus;
  action;
  title;
  endpoint;
}

@observer
export default class DispatchLotComponent extends Component<IProps, IState> {
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
    this.lotStore.lazyListLot(true, this.props.lotStatus);
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
    this.lotStore.updateLotInfo(modalType, form, this.props.lotStatus);
    this.closeModal();
  };

  toLotSummery(selectedRows) {
    const _sRows = selectedRows.map(r => r.id);
    navigate(this.props.endpoint, {
      state: {
        rows: toJS(this.lotStore.lots).filter(lot => {
          return _sRows.includes(lot.id.toString());
        }),
        header: LOT_BASIC,
        lotIDs: _sRows,
      },
    });
  }

  getHeader = () => {
    switch (this.props.action) {
      case LOT_ACTIONS.AT_FACTORY.action:
        return LOT_FACTORY;

      case LOT_ACTIONS.AT_UNION_GRN.action:
        return LOT_UNION_GRN;

      case LOT_ACTIONS.AT_UNION_GREEN.action:
        return LOT_UNION_GREEN;

      case LOT_ACTIONS.AT_UNION_CUPPING.action:
        return LOT_UNION_CUPPING;

      default:
        return LOT_BASIC;
    }
  };

  renderActionButton = selectedRows => {
    return this.props.action !== "NA" ? (
      <Button
        kind="primary"
        className="eco--button-table-primary"
        disabled={selectedRows.length <= 0}
        onClick={() => {
          this.toLotSummery(selectedRows);
        }}
      >
        {this.props.action}
      </Button>
    ) : (
      ""
    );
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
          <h1 className="eco--title">{this.props.title}</h1>
        </div>
        <div className="bx--col-lg-6 bx--col-md-12 text-right">
          {this.renderActionButton(selectedRows)}
        </div>
      </div>
      <br />
      <InfiniteScroll
        pageStart={0}
        loadMore={() => {
          rows.length > 0
            ? this.lotStore.lazyListLot(false, LOT_STATUS.AT_CO_OPERATIVE)
            : null;
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
                return (
                  <React.Fragment key={row.id}>
                    <TableExpandRow {...getRowProps({ row })}>
                      <TableSelectRow {...getSelectionProps({ row })} />
                      {row.cells.map(cell =>
                        LotListCell(cell, row.id, this.openModal)
                      )}
                    </TableExpandRow>
                    {row.isExpanded && (
                      <ExpandRow
                        lotStore={this.lotStore}
                        colSpan={headers.length + 2}
                        lotId={row.id}
                      />
                    )}
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
          headers={this.getHeader()}
          render={this.renderDataTable}
        />
      </>
    );
  }
}
