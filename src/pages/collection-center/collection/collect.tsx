import { Button } from "carbon-components-react";
import React, { Component } from "react";
import {
  FieldControl,
  FieldGroup,
  FormBuilder,
  Validators,
} from "react-reactive-form";

import { dateInput, numberInput, textInput } from "/@components/@core/form";
import Layout from "/@components/@core/layout.component";
import SEO from "/@components/@core/seo.component";
import { CollectionStore } from "/@stores/collections.store";
import { ROLES } from "/@utils/constants";
import { getUser } from "/@utils/auth";

export default class CollectionCollectPage extends Component {
  collectionStore = new CollectionStore();
  statusOptions = [
    { name: "Collected", value: "COLLECTED" },
    { name: "Not Collected", value: "NOT_COLLECTED" },
  ];
  collectForm;

  constructor(props) {
    super(props);
    this.collectForm = FormBuilder.group({
      ccCode: [getUser().ccCode, Validators.required],
      membershipId: ["", Validators.required],
      quantity: ["", Validators.required],
      date: [this.getToday(), Validators.required],
      timestamp: [new Date(), Validators.required],
    });
  }

  getToday = () => {
    const local = new Date();
    local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  };

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
        </div>
        <div className="bx--row">
          <div className="bx--col-lg-4 bx--col-sm-12">
            <FieldControl
              name="membershipId"
              render={textInput}
              meta={{ label: "Membership Id" }}
            />
          </div>
          <div className="bx--col-lg-4 bx--col-sm-12">
            <FieldControl
              name="quantity"
              render={numberInput}
              meta={{ label: "Quantity" }}
            />
          </div>
        </div>
        <div className="bx--row">
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
