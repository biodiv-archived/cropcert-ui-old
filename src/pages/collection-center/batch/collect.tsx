import { Button } from "carbon-components-react";
import React, { Component } from "react";
import {
  FieldControl,
  FieldGroup,
  FormBuilder,
  Validators,
} from "react-reactive-form";

import {
  dateInput,
  numberInput,
  selectInput,
  textInput,
} from "/@components/@core/form";
import Layout from "/@components/@core/layout.component";
import SEO from "/@components/@core/seo.component";
import { BatchingStore } from "/@stores/batching.store";
import { getUser } from "/@utils/auth";
import { getToday } from "/@utils/basic";
import { ROLES } from "/@utils/constants";

export default class CollectionCollectPage extends Component {
  batchingStore = new BatchingStore();
  typeOptions = [{ name: "Dry", value: "DRY" }, { name: "Wet", value: "WET" }];
  collectForm;

  constructor(props) {
    super(props);
    this.collectForm = FormBuilder.group({
      ccCode: [getUser().ccCode, Validators.required],
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
              render={numberInput}
              meta={{ label: "CC Code", readOnly: true }}
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
      <Layout roles={[ROLES.COLLECTION_CENTER]}>
        <SEO title="Collect Collection" />
        <h1 className="eco--title">Collect Batch</h1>
        <FieldGroup control={this.collectForm} render={this.renderFieldGroup} />
      </Layout>
    );
  }
}
