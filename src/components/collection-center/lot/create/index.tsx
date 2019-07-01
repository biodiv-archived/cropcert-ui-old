import ListIcon from "@carbon/icons-react/es/list/20";
import SettingsIcon from "@carbon/icons-react/es/settings/20";
import { window } from "browser-monads";
import { Button, DataTable } from "carbon-components-react";
import { If } from "control-statements";
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
import { getToday, toFriendlyCellValue } from "/@utils/basic";
import { observer } from "mobx-react";

interface IState {
  totalWeight;
  batchesRows;
  lotForm;
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
      lotName: [`${this.ccName}_Lot_${new Date().toISOString()}`],
      date: [getToday(), Validators.required],
      timestamp: [new Date(), Validators.required],
      type: [this.lotType],
    });

    this.state = {
      batchesRows: _batchesRows,
      totalWeight,
      lotForm: form,
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
    this.lotStore.createLotfromBatches(this.genBatchJSON());
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
                            <TableCell key={cell.id}>
                              {toFriendlyCellValue(cell)}
                            </TableCell>
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
                  disabled={invalid}
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

  render() {
    return (
      <>
        <h1 className="eco--title">Create Lot</h1>
        <If condition={this.state.batchesRows.length > 0}>
          <FieldGroup
            control={this.state.lotForm}
            render={this.renderFieldGroup}
          />
        </If>
        <If condition={this.state.batchesRows.length <= 0}>
          Please select collections first
        </If>
      </>
    );
  }
}
