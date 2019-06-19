import { Button } from "carbon-components-react";
import React, { Component } from "react";
import { FieldControl, FieldGroup, FormBuilder, Validators } from "react-reactive-form";

import { dateInput, numberInput, selectInput, textInput } from "/@components/@core/form";
import { BatchingStore } from "/@stores/batching.store";
import { hasAccess } from "/@utils/auth";
import { getToday } from "/@utils/basic";
import { ROLES } from "/@utils/constants";

interface IProps {
  accessibleCCs;
}

export default class BatchCollect extends Component<IProps> {
  batchingStore = new BatchingStore();

  typeOptions = [{ name: "Dry", value: "DRY" }, { name: "Wet", value: "WET" }];
  collectForm;

  constructor(props) {
    super(props);
    this.collectForm = FormBuilder.group({
      ccCode: [this.props.accessibleCCs[0].value, Validators.required],
      quantity: ["", Validators.required],
      date: [getToday(), Validators.required],
      timestamp: [new Date(), Validators.required],
      type: [this.typeOptions[0].value],
      note: [,],
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.batchingStore.collect(this.collectForm.value);
  };

  renderFieldGroup = ({ get, invalid }) => {
    return (
      <form className="bx--form" onSubmit={this.handleSubmit}>
        <div className="bx--row">
          <div className="bx--col-lg-4 bx--col-sm-12">
            <FieldControl
              name="ccCode"
              render={selectInput}
              meta={{
                label: "Collection Center",
                options: this.props.accessibleCCs,
                readOnly: !hasAccess([ROLES.FACTORY]),
              }}
            />
          </div>
          <div className="bx--col-lg-4 bx--col-sm-12">
            <FieldControl
              name="date"
              render={dateInput}
              meta={{ label: "Date" }}
            />
          </div>
        </div>
        <div className="bx--row">
          <div className="bx--col-lg-4 bx--col-sm-12">
            <FieldControl
              name="quantity"
              render={numberInput}
              meta={{ label: "Quantity (in KGs)" }}
            />
          </div>
          <div className="bx--col-lg-4 bx--col-sm-12">
            <FieldControl
              name="type"
              render={selectInput}
              meta={{
                label: "Type",
                options: this.typeOptions,
              }}
            />
          </div>
        </div>
        <div className="bx--row">
          <div className="bx--col-lg-8 bx--col-sm-12">
            <FieldControl
              name="note"
              render={textInput}
              meta={{ label: "Note" }}
            />
          </div>
        </div>
        <Button type="submit" disabled={invalid}>
          Collect Batch
        </Button>
      </form>
    );
  };

  render() {
    return (
      <FieldGroup control={this.collectForm} render={this.renderFieldGroup} />
    );
  }
}
