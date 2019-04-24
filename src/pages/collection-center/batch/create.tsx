import { window } from "browser-monads";
import SettingsIcon from "@carbon/icons-react/es/settings/20";
import ListIcon from "@carbon/icons-react/es/list/20";
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
import { getUser } from "/@utils/auth";

interface IState {
  collectForm;
}

export default class BatchCreatePage extends Component<{}, IState> {
  batchingStore = new BatchingStore();
  showMoistureContent = false;
  collections = (window.history.state || {}).selectedCollections || [];

  qualityOptions = [
    { name: "Default", value: "default" },
    { name: "Good", value: "good" },
    { name: "Great", value: "great" },
  ];

  constructor(props) {
    super(props);
    let collectFormObj = {
      ccCode: [getUser().ccCode, Validators.required],
      moistureContent: [, Validators.required],
      quality: [this.qualityOptions[0].value, Validators.required],
    };
    this.collections.forEach(c => {
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
    this.state = {
      collectForm: FormBuilder.group(collectFormObj),
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.batchingStore.createBatchfromCollections(this.state.collectForm.value);
  };

  renderFieldGroup = ({ get, invalid }) => {
    return (
      <form className="bx--form" onSubmit={this.handleSubmit}>
        <h2 className="eco--form-heading">
          <SettingsIcon />
          &ensp;Batch Configuration
        </h2>
        <div className="bx--row">
          <div className="bx--col-lg-4 bx--col-sm-12">
            <FieldControl
              name="moistureContent"
              render={numberInput}
              meta={{ label: "Moisture Content" }}
            />
          </div>
          <div className="bx--col-lg-4 bx--col-sm-12">
            <FieldControl
              name="quality"
              render={selectInput}
              meta={{
                label: "Quality",
                options: this.qualityOptions,
              }}
            />
          </div>
        </div>
        <h2 className="eco--form-heading">
          <ListIcon />
          &ensp;Collection(s)
        </h2>
        {this.collections.map(c => (
          <div className="bx--row" key={c.collectionId}>
            <div className="bx--col-lg-4 bx--col-sm-12">
              <FieldControl
                name={`collectionId_${c.collectionId}`}
                render={numberInput}
                meta={{
                  label: `Collection #${c.collectionId}`,
                  readOnly: true,
                }}
              />
            </div>
            <div className="bx--col-lg-4 bx--col-sm-12">
              <FieldControl
                name={`quantity_${c.collectionId}`}
                render={numberInput}
                meta={{ label: `Quantity (Max ${c.availableQuantity})` }}
              />
            </div>
            <div className="bx--col-lg-4 bx--col-sm-12">
              <FieldControl
                name={`quality_${c.collectionId}`}
                render={selectInput}
                meta={{
                  label: "Quality",
                  options: this.qualityOptions,
                }}
              />
            </div>
          </div>
        ))}
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
    // this.collectForm
    //   .get("moistureContentCalculationType")
    //   .valueChanges.subscribe(value => {
    //     this.showMoistureContent = value === "MANUAL";
    //   });
    return (
      <Layout roles={[ROLES.AUTHORIZED]}>
        <SEO title="Create Batch" />
        <h1 className="eco--title">
          Create Batch &rarr; {this.collections.length} Collection(s)
        </h1>
        <If condition={this.collections.length > 0}>
          <FieldGroup
            control={this.state.collectForm}
            render={this.renderFieldGroup}
          />
        </If>
        <If condition={this.collections.length <= 0}>
          Please select collections first
        </If>
      </Layout>
    );
  }
}
