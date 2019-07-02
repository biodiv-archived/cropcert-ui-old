import ListIcon from "@carbon/icons-react/es/list/20";
import SettingsIcon from "@carbon/icons-react/es/settings/20";
import { window } from "browser-monads";
import { Button, DataTable, InlineNotification } from "carbon-components-react";
import { Link } from "gatsby";
import { observer } from "mobx-react";
import React, { Component } from "react";
import {
  FieldControl,
  FieldGroup,
  FormBuilder,
  Validators,
} from "react-reactive-form";

import { FIELDS_DRY, FIELDS_WET } from "../../batch/list/header.constants";
import { textInput } from "/@components/@core/form";
import { LotStore } from "/@stores/lot.store";
import { getRedirect } from "/@utils/auth";
import { getToday } from "/@utils/basic";
import { LCS } from "/@utils/constants";

interface IState {
  totalWeight;
  batchesRows;
  lotForm;
  lotCreationStatus;
}

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
} = DataTable;

@observer
export default class LotCreateComponent extends Component<{}, IState> {
  lotStore = new LotStore();
  batches = (window.history.state || {}).selectedRows || [];
  lotType = (window.history.state || {}).lotType || [];
  ccName = (window.history.state || {}).ccName || [];

  constructor(props) {
    super(props);

    let totalWeight = 0;
    let batchIds: number[] = [];

    const _batchesRows = this.batches.map(c => {
      totalWeight += c.cells[c.cells.length - 1].value;
      batchIds.push(parseInt(`${c.id}`));
      return c.cells.reduce(
        (acc, c) => ({ ...acc, [c.info.header]: c.value }),
        {}
      );
    });

    const form = FormBuilder.group({
      batchIds: [batchIds, Validators.required],
      totalWeight: [totalWeight, Validators.required],
      lotName: [`${this.ccName}_Lot_${getToday()}`],
      date: [getToday(), Validators.required],
      timestamp: [new Date(), Validators.required],
      type: [this.lotType],
    });

    this.state = {
      batchesRows: _batchesRows,
      totalWeight,
      lotForm: form,
      lotCreationStatus: LCS.NOT_CREATED,
    };
  }

  genBatchJSON = () => {
    const _formValues = this.state.lotForm.value;
    return {
      lotName: _formValues.lotName,
      quantity: this.state.totalWeight,
      timeToFactory: new Date().getTime(),
      type: _formValues.type,
      batchIds: _formValues.batchIds,
      createdOn: new Date().getTime(),
    };
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ lotCreationStatus: LCS.CREATING });
    this.lotStore
      .createLotfromBatches(this.genBatchJSON())
      .then(response => {
        this.setState({ lotCreationStatus: LCS.CREATED });
      })
      .catch(error => {
        this.setState({ lotCreationStatus: LCS.ERROR });
      });
  };

  renderFieldGroup = ({ get, invalid }) => {
    return (
      <form className="bx--form" onSubmit={this.handleSubmit}>
        <div className="bx--row">
          <div className="bx--col-lg-8 bx--col-md-12">
            <h2 className="eco--form-title">
              <ListIcon />
              &ensp;{this.state.batchesRows.length} Batches(s)
            </h2>
            <DataTable
              rows={this.state.batchesRows || []}
              headers={this.lotType == "DRY" ? FIELDS_DRY : FIELDS_WET}
              render={({ rows, headers, getHeaderProps }) => (
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
                        <TableRow key={row.id}>
                          {row.cells.map(cell => (
                            <TableCell key={cell.id}>{cell.value}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            />
          </div>
          <div className="bx--col-lg-4 bx--col-md-12">
            <h2 className="eco--form-title">
              <SettingsIcon />
              &ensp;Lot Info
            </h2>
            <FieldControl
              name="lotName"
              render={textInput}
              meta={{ label: "Lot Name", readOnly: true }}
            />
            <FieldControl
              name="date"
              render={textInput}
              meta={{ label: "Date", readOnly: true }}
            />
            <FieldControl
              name="type"
              render={textInput}
              meta={{ label: "Batch Type", readOnly: true }}
            />
            <div className="bx--row">
              <div className="bx--col-lg-5 bx--col-md-12 eco--form-total">
                {this.state.totalWeight}
                KG
              </div>
              <div className="bx--col-lg-7 bx--col-md-12 eco--form-submit">
                <Button
                  className="btn btn-primary btn-lg btn-block"
                  type="submit"
                  disabled={
                    invalid || this.state.lotCreationStatus !== LCS.NOT_CREATED
                  }
                >
                  Create Lot
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  };

  renderSwitch = () => {
    switch (this.state.lotCreationStatus) {
      case LCS.NOT_CREATED:
        return this.state.batchesRows.length > 0 ? (
          <FieldGroup
            control={this.state.lotForm}
            render={this.renderFieldGroup}
          />
        ) : (
          <>Please select collections first</>
        );

      case LCS.CREATED:
        return (
          <>
            <InlineNotification
              kind="success"
              lowContrast
              title="Success"
              subtitle="Your lot was created successfully"
            />
            <Link
              to={getRedirect()}
              className="btn btn-primary btn-lg btn-block bx--btn bx--btn--primary"
            >
              Go to Dashboard
            </Link>
            <Link
              to="/collection-center/batch/list/"
              className="btn btn-primary btn-lg btn-block bx--btn bx--btn--primary ml-2"
            >
              Create another lot
            </Link>
          </>
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
    }
  };

  render() {
    return (
      <>
        <h1 className="eco--title">Create Lot</h1>
        {this.renderSwitch()}
      </>
    );
  }
}
