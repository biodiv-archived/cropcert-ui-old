import { Button, DataTable } from "carbon-components-react";
import { observer } from "mobx-react";
import React, { Component } from "react";

import { LotStore } from "/@stores/lot.store";
import { LCS } from "/@utils/constants";

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
  history = window.history.state || {};

  componentDidMount() {
    if (this.history.rows.length === 0) {
      console.warn("No Data!");
    }
  }

  onConfirm = () => {
    this.setState({ requestStatus: LCS.PROCESSING });
    this.lotStore.dispatchLot(
      this.history.lotIDs || [],
      this.history.toKey || "",
      this.history.to || ""
    );
  };

  renderDataTable = ({ rows, headers, getHeaderProps, getRowProps }) => (
    <>
      <div className="bx--row">
        <div className="bx--col-lg-6 bx--col-md-12">
          <h1 className="eco--title">{this.history.title} Summery</h1>
        </div>
        <div className="bx--col-lg-6 bx--col-md-12 text-right">
          <Button
            kind="primary"
            className="eco--button-table-primary"
            onClick={this.onConfirm}
          >
            Confirm {this.history.action}
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
      <DataTable
        rows={this.history.rows || []}
        headers={this.history.header || []}
        render={this.renderDataTable}
      />
    );
  }
}
