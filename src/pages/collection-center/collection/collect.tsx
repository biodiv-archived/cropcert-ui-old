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
import { CollectionStore } from "/@stores/collections.store";
import { getUser } from "/@utils/auth";
import { getToday } from "/@utils/basic";
import { ROLES } from "/@utils/constants";

export default class CollectionCollectPage extends Component {
  collectionStore = new CollectionStore();
  qualityOptions = [
    { name: "Default", value: "default" },
    { name: "Good", value: "good" },
    { name: "Great", value: "great" },
  ];
  collectForm;

  constructor(props) {
    super(props);
    this.collectForm = FormBuilder.group({
      ccCode: [getUser().ccCode, Validators.required],
      membershipId: ["", Validators.required],
      quantity: ["", Validators.required],
      date: [getToday(), Validators.required],
      timestamp: [new Date(), Validators.required],
      quality: [this.qualityOptions[0].value],
      note: [,],
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.collectionStore.collect(this.collectForm.value);
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
              name="membershipId"
              render={textInput}
              meta={{ label: "Membership Id" }}
            />
          </div>
        </div>
        <div className="bx--row">
          <div className="bx--col-lg-4 bx--col-sm-12">
            <FieldControl
              name="quantity"
              render={numberInput}
              meta={{ label: "Quantity" }}
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
        <div className="bx--row">
          <div className="bx--col-lg-4 bx--col-sm-12">
            <FieldControl
              name="note"
              render={textInput}
              meta={{ label: "Note" }}
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
        <Button type="submit" disabled={invalid}>
          Recoard Collection
        </Button>
      </form>
    );
  };

  render() {
    return (
      <Layout roles={[ROLES.COLLECTION_CENTER]}>
        <SEO title="Collect Collection" />
        <h1 className="eco--title">Collect</h1>
        <FieldGroup control={this.collectForm} render={this.renderFieldGroup} />
      </Layout>
    );
  }
}
