import Add from "@carbon/icons-react/es/add/16";
import Edit from "@carbon/icons-react/es/edit/16";
import { DataTable, InlineLoading } from "carbon-components-react";
import { Link } from "gatsby";
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

interface IState {
  lotType;
  modalData;
  isModalOpen;
}

@observer
export default class CoopLotListComponent extends Component<{}, IState> {
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
          <h1 className="eco--title">Lots</h1>
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
                {headers.map(header => (
                  <TableHeader {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
                <TableHeader>Report</TableHeader>
                <TableHeader>Cupping</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => {
                return (
                  <TableRow {...getRowProps({ row })} key={row.id}>
                    {row.cells.map(cell => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                    <TableCell key={`qa_${row.id}`}>
                      <Link to={`/cooperative/qa?lotId=${row.cells[1].value}`}>
                        <Edit />
                      </Link>
                    </TableCell>
                    <TableCell key={`cupping_${row.id}`}>
                      <Link
                        to={`/cooperative/cupping?lotId=${row.cells[1].value}`}
                      >
                        <Add />
                      </Link>
                    </TableCell>
                  </TableRow>
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
