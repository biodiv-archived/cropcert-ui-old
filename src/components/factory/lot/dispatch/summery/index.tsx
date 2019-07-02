import { Button, DataTable, InlineLoading } from "carbon-components-react";
import { observer } from "mobx-react";
import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";

import { LotStore } from "/@stores/lot.store";
import { navigate } from "gatsby";

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} = DataTable;

@observer
export default class DispatchSummeryComponent extends Component {
  lotStore = new LotStore();
  summeryRows = (window.history.state || {}).rows || [];
  summeryHeader = (window.history.state || {}).header || [];
  summeryLotIDs = (window.history.state || {}).lotIDs || [];

  componentDidMount() {
    console.log(this.summeryLotIDs);
    if (this.summeryRows.length === 0) {
      navigate("/cooperative/lot/dispatch-lots");
    }
  }

  renderDataTable = ({ rows, headers, getHeaderProps, getRowProps }) => (
    <>
      <div className="bx--row">
        <div className="bx--col-lg-6 bx--col-md-12">
          <h1 className="eco--title">Dispatch Summery</h1>
        </div>
        <div className="bx--col-lg-6 bx--col-md-12 text-right">
          <Button
            kind="primary"
            className="eco--button-table-primary"
            onClick={() => {
              this.lotStore.dispatchLot(this.summeryLotIDs);
            }}
          >
            Confirm Dispatch
          </Button>
        </div>
      </div>
      <br />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map(header => (
                <TableHeader {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id} {...getRowProps({ row })}>
                {row.cells.map(cell => (
                  <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  render() {
    return (
      <>
        <DataTable
          rows={this.summeryRows || []}
          headers={this.summeryHeader}
          render={this.renderDataTable}
        />
      </>
    );
  }
}
