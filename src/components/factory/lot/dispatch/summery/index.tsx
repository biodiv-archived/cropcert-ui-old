import { Button, DataTable, InlineNotification } from "carbon-components-react";
import { observer } from "mobx-react";
import React, { Component } from "react";

import { LotStore } from "/@stores/lot.store";
import { LCS } from "/@utils/constants";
import { Link } from "gatsby";
import { getRedirect } from "/@utils/auth";

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} = DataTable;

interface IState {
  requestStatus;
}

@observer
export default class DispatchSummeryComponent extends Component<{}, IState> {
  lotStore = new LotStore();
  history = window.history.state || {};

  constructor(props) {
    super(props);
    this.state = {
      requestStatus: LCS.NOT_DONE,
    };
  }

  componentDidMount() {
    console.log(this.history.rows);
    if (this.history.rows.length === 0) {
      console.warn("No Data!");
    }
  }

  onConfirm = () => {
    this.setState({ requestStatus: LCS.PROCESSING });
    this.lotStore
      .dispatchLot(
        this.history.lotIDs || [],
        this.history.toKey || "",
        this.history.to || ""
      )
      .then(r => {
        console.log(r);
        this.setState({ requestStatus: LCS.DONE });
      })
      .catch(error => {
        console.error(error);
        this.setState({ requestStatus: LCS.ERROR });
      });
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
            disabled={this.state.requestStatus !== LCS.NOT_DONE}
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
    switch (this.state.requestStatus) {
      case LCS.NOT_DONE:
        return (
          <DataTable
            rows={this.history.rows || []}
            headers={this.history.header || []}
            render={this.renderDataTable}
          />
        );

      case LCS.DONE:
        return (
          <div>
            <br />
            <InlineNotification
              kind="success"
              lowContrast
              title="Success"
              subtitle={`${this.history.title} completed successfully`}
            />
            <Link
              to={getRedirect()}
              className="btn btn-primary btn-lg btn-block bx--btn bx--btn--primary"
            >
              Go to Dashboard
            </Link>
            <Link
              to={this.history.back}
              className="btn btn-primary btn-lg btn-block bx--btn bx--btn--primary ml-2"
            >
              Go Back
            </Link>
          </div>
        );

      case LCS.ERROR:
        return (
          <InlineNotification
            kind="error"
            lowContrast
            title="Error"
            subtitle="There was some error while creating lot"
          />
        );

      default:
        return <>...</>;
    }
  }
}
