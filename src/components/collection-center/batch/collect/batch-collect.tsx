import { Button } from "carbon-components-react";
import { Field, Formik } from "formik";
import React, { Component } from "react";
import * as Yup from "yup";

import { selectInput, textInput } from "/@components/@core/formik";
import { BatchingStore } from "/@stores/batching.store";
import { getToday } from "/@utils/basic";
import { TYPE_OPTIONS } from "/@utils/constants";

interface IProps {
  accessibleCCs;
}

interface IState {
  typeOptions;
}

export default class BatchCollect extends Component<IProps, IState> {
  batchingStore = new BatchingStore();

  getCCById = ccId => {
    return this.props.accessibleCCs.find(
      c => c.value.toString() === ccId.toString()
    );
  };

  getTypeOptions = (ccId?) => {
    if (!ccId) {
      ccId = this.props.accessibleCCs[0].id;
    }
    const ccType = this.getCCById(ccId);
    switch (ccType.type) {
      case "D":
        return [TYPE_OPTIONS.DRY];

      case "P":
        return [TYPE_OPTIONS.WET];

      default:
        return [TYPE_OPTIONS.DRY, TYPE_OPTIONS.WET];
    }
  };

  collectForm = {
    validationSchema: Yup.object().shape({
      ccCode: Yup.string().required(),
      quantity: Yup.number()
        .min(1)
        .required(),
      date: Yup.date().required(),
    }),
    initialValues: {
      ccCode: this.props.accessibleCCs[0].value,
      type: this.getTypeOptions()[0],
      quantity: 0,
      date: getToday(),
      note: "",
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      typeOptions: this.getTypeOptions(),
    };
  }

  handleSubmit = (values, actions) => {
    actions.setSubmitting(false);
    this.batchingStore.collect({
      ...values,
      createdOn: new Date(),
      batchName: `${this.getCCById(values.ccCode).ccName}_${getToday()}`,
    });
  };

  render() {
    return (
      <Formik
        {...this.collectForm}
        onSubmit={this.handleSubmit}
        render={props => (
          <form className="bx--form" onSubmit={props.handleSubmit}>
            <div className="bx--row">
              <div className="bx--col-lg-4 bx--col-sm-12">
                <Field
                  label="CC Code"
                  name="ccCode"
                  component={selectInput}
                  options={this.props.accessibleCCs}
                  onChange={e => {
                    props.setFieldValue("ccCode", e.target.value);
                    this.setState({
                      typeOptions: this.getTypeOptions(e.target.value),
                    });
                  }}
                />
              </div>
              <div className="bx--col-lg-4 bx--col-sm-12">
                <Field
                  label="Date"
                  name="date"
                  component={textInput}
                  type="date"
                />
              </div>
            </div>
            <div className="bx--row">
              <div className="bx--col-lg-4 bx--col-sm-12">
                <Field
                  label="Quantity"
                  name="quantity"
                  component={textInput}
                  type="number"
                />
              </div>
              <div className="bx--col-lg-4 bx--col-sm-12">
                <Field
                  label="Batch Type"
                  name="type"
                  component={selectInput}
                  options={this.state.typeOptions}
                />
              </div>
            </div>
            <div className="bx--row">
              <div className="bx--col-lg-8 bx--col-sm-12">
                <Field
                  label="Note"
                  name="note"
                  component={textInput}
                  type="text"
                />
              </div>
            </div>

            <Button type="submit" disabled={!props.isValid}>
              Create Batch
            </Button>
          </form>
        )}
      />
    );
  }
}
