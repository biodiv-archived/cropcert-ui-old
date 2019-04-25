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

import {
  numberInput,
  selectInput,
  tableNumberInput,
} from "/@components/@core/form";
import { BatchingStore } from "/@stores/batching.store";
import { getUser } from "/@utils/auth";

interface IState {
  collectForm;
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

export default class BatchCreateComponent extends Component<{}, IState> {
  batchingStore = new BatchingStore();
  showMoistureContent = false;
  collections = (window.history.state || {}).selectedCollections || [];

  qualityOptions = [
    { name: "Default", value: "default" },
    { name: "Good", value: "good" },
    { name: "Great", value: "great" },
  ];

  tableHeadings = ["Collection Id", "Quantity"];

  constructor(props) {
    super(props);
    let collectFormObj = {
      ccCode: [getUser().ccCode, Validators.required],
      moistureContent: [, Validators.required],
      quality: [this.qualityOptions[0].value, Validators.required],
    };
    let maxTargetWeight = 0;
    this.collections.forEach(c => {
      maxTargetWeight += c.availableQuantity;
      collectFormObj = {
        ...collectFormObj,
        [`collectionId_${c.collectionId}`]: [
          c.collectionId,
          Validators.required,
        ],
        [`quantity_${c.collectionId}`]: [
          c.availableQuantity,
          [Validators.required, Validators.max(c.availableQuantity)],
        ],
        [`quality_${c.collectionId}`]: [
          this.qualityOptions[0].value,
          [Validators.required],
        ],
      };
    });
    collectFormObj["targetWeight"] = [
      maxTargetWeight,
      Validators.max(maxTargetWeight),
    ];
    this.state = {
      collectForm: FormBuilder.group(collectFormObj),
    };
  }

  genBatchJSON = v => {
    let cols: any = [];
    this.collections.forEach(c => {
      if (v[`quantity_${c.collectionId}`] > 0) {
        cols.push({
          collectionId: c.collectionId,
          quantity: parseInt(v[`quantity_${c.collectionId}`]),
          quality: v[`quality_${c.collectionId}`],
        });
      }
    });
    return {
      ccCode: v.ccCode,
      moistureContent: parseInt(v.moistureContent),
      quality: v.quality,
      collections: cols,
    };
  };

  handleSubmit = e => {
    e.preventDefault();
    this.batchingStore.createBatchfromCollections(
      this.genBatchJSON(this.state.collectForm.value)
    );
  };

  renderFieldGroup = ({ get, invalid }) => {
    return (
      <form className="bx--form" onSubmit={this.handleSubmit}>
        <div className="bx--row">
          <div className="bx--col-lg-8 bx--col-md-12">
            <h2 className="eco--form-title">
              <ListIcon />
              &ensp;{this.collections.length} Collection(s)
            </h2>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {this.tableHeadings.map(h => (
                      <TableHeader key={h}>
                        <span className="bx--table-header-label">{h}</span>
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.collections.map(c => (
                    <TableRow key={c.collectionId}>
                      <TableCell>{c.collectionId}</TableCell>
                      <TableCell>
                        <FieldControl
                          name={`quantity_${c.collectionId}`}
                          render={tableNumberInput}
                          meta={{
                            label: `Quantity (Max ${c.availableQuantity})`,
                          }}
                        />
                        out of {c.availableQuantity}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="bx--col-lg-4 bx--col-md-12">
            <h2 className="eco--form-title">
              <SettingsIcon />
              &ensp;Batch Configuration
            </h2>
            <FieldControl
              name="moistureContent"
              render={numberInput}
              meta={{ label: "Moisture Content" }}
            />
            <FieldControl
              name="quality"
              render={selectInput}
              meta={{
                label: "Quality",
                options: this.qualityOptions,
              }}
            />
            <div className="bx--row">
              <div className="bx--col-lg-6 bx--col-md-12 eco--form-total">
                {this.collections.reduce((acc, c) => {
                  return (
                    acc +
                    parseInt(
                      this.state.collectForm.value[
                        "quantity_" + c.collectionId
                      ].toString()
                    )
                  );
                }, 0)}
                KG
              </div>
              <div className="bx--col-lg-6 bx--col-md-12 eco--form-submit">
                <Button
                  className="btn btn-primary btn-lg btn-block"
                  type="submit"
                  disabled={invalid}
                >
                  Create Batch
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
        <h1 className="eco--title">Create Batch</h1>
        <If condition={this.collections.length > 0}>
          <FieldGroup
            control={this.state.collectForm}
            render={this.renderFieldGroup}
          />
        </If>
        <If condition={this.collections.length <= 0}>
          Please select collections first
        </If>
      </>
    );
  }
}
