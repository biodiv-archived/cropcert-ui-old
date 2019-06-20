import { Button, DataTable, InlineLoading } from "carbon-components-react";
import { observer } from "mobx-react";
import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Edit from "@carbon/icons-react/es/edit/16";

import { LOT_BASIC } from "./header.constants";
import { LotStore } from "/@stores/lot.store";
import { Link } from "gatsby";

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
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => {
                return (
                  <React.Fragment key={row.id}>
                    <TableRow {...getRowProps({ row })}>
                      {row.cells.map(cell => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                      <TableCell key={row.id}>
                        <Link to={`../../qa?lotId=${row.id}`}>
                          <Edit />
                        </Link>
                      </TableCell>
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