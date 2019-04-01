import { Button } from "carbon-components-react";
import { If } from "control-statements";
import React, { Component } from "react";
import {
  FieldControl,
  FieldGroup,
  FormBuilder,
  Validators,
} from "react-reactive-form";

import { numberInput, selectInput } from "/@components/@core/form";
import Layout from "/@components/@core/layout.component";
import SEO from "/@components/@core/seo.component";
import { BatchingStore } from "/@stores/batching.store";
import { ROLES } from "/@utils/constants";

export default class BatchCreatePage extends Component {
  batchingStore = new BatchingStore();
  showMoistureContent = false;
  collections =
    typeof window !== `undefined`
      ? window.history.state.sCollections || []
      : [];

  moistureCalculationTypeOptions = [
    { name: "Average", value: "AVERAGE" },
    { name: "Sum", value: "SUM" },
    { name: "Min", value: "MIN" },
    { name: "Max", value: "MAX" },
    { name: "Count", value: "COUNT" },
    { name: "Manual", value: "MANUAL" },
  ];

  collectForm = FormBuilder.group({
    collectionIds: [this.collections, Validators.required],
    moistureContentCalculationType: [
      this.moistureCalculationTypeOptions[0].value,
      Validators.required,
    ],
    factoryId: ["", Validators.required],
    moistureContent: [0, Validators.min(0)],
  });

  handleSubmit = e => {
    e.preventDefault();
    this.batchingStore.createBatchfromCollections(this.collectForm.value);
  };

  renderFieldGroup = ({ get, invalid }) => {
    return (
      <form className="bx--form" onSubmit={this.handleSubmit}>
        <div className="bx--row">
          <div className="bx--col-lg-4 bx--col-sm-12">
            <FieldControl
              name="factoryId"
              render={numberInput}
              meta={{ label: "Factory Id" }}
            />
          </div>
          <div className="bx--col-lg-4 bx--col-sm-12">
            <FieldControl
              name="moistureContentCalculationType"
              render={selectInput}
              meta={{
                label: "Moisture Content Calculation Type",
                options: this.moistureCalculationTypeOptions,
              }}
            />
          </div>
          <div className="bx--col-lg-4 bx--col-sm-12">
            <If condition={this.showMoistureContent}>
              <FieldControl
                name="moistureContent"
                render={numberInput}
                meta={{ label: "Moisture Content" }}
              />
            </If>
          </div>
        </div>
        <Button
          className="btn btn-primary btn-lg btn-block"
          type="submit"
          disabled={invalid}
        >
          Create Batch
        </Button>
      </form>
    );
  };

  render() {
    this.collectForm
      .get("moistureContentCalculationType")
      .valueChanges.subscribe(value => {
        this.showMoistureContent = value === "MANUAL";
      });
    return (
      <Layout roles={[ROLES.AUTHORIZED]}>
        <SEO title="Create Batch" />
        <h1 className="eco--title">
          Create Batch &rarr; {this.collections.length} Collection(s)
        </h1>
        <FieldGroup control={this.collectForm} render={this.renderFieldGroup} />
      </Layout>
    );
  }
}
