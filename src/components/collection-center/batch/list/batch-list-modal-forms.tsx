import { Field, Formik } from "formik";
import React, { Component } from "react";
import * as Yup from "yup";

import { textInput } from "/@components/@core/formik";
import { formattedDate, formattedTime } from "/@utils/basic";

interface IProps {
  modalData;
  handleSubmit;
}

interface IState {
  dateForm;
}

export class BatchListModalFormDate extends Component<IProps, IState> {
  dateForm = {
    validationSchema: Yup.object().shape({
      time: Yup.string()
        .matches(new RegExp("^([0-1][0-9]|[2][0-3]):([0-5][0-9])$"))
        .required(),
      date: Yup.date().required(),
    }),
    initialValues: {
      date: formattedDate(this.props.modalData.value),
      time: formattedTime(this.props.modalData.value),
    },
  };

  handleSubmit = (values, actions) => {
    actions.setSubmitting(false);
    this.props.handleSubmit(this.props.modalData.modalType, {
      id: this.props.modalData.id,
      ...values,
    });
  };

  render() {
    return (
      <Formik
        {...this.dateForm}
        onSubmit={this.handleSubmit}
        isInitialValid={true}
        render={props => {
          return (
            <form className="bx--form" onSubmit={props.handleSubmit}>
              <div className="eco--modal-container">
                <div className="bx--row">
                  <div className="bx--col-lg-6 bx--col-sm-12">
                    <Field
                      label="Date"
                      name="date"
                      component={textInput}
                      type="date"
                    />
                  </div>
                  <div className="bx--col-lg-6 bx--col-sm-12">
                    <Field label="Time" name="time" component={textInput} />
                  </div>
                </div>
              </div>
              <div className="bx--modal-footer">
                <button
                  className="bx--btn bx--btn--primary"
                  disabled={!props.isValid}
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          );
        }}
      />
    );
  }
}

export class BatchListModalFormNumber extends Component<IProps, IState> {
  dateForm;

  componentDidUpdate() {
    this.dateForm = {
      validationSchema: Yup.object().shape({
        qty: Yup.number().required(),
      }),
      initialValues: {
        qty: this.props.modalData.value,
      },
    };
  }

  handleSubmit = (values, actions) => {
    actions.setSubmitting(false);
    this.props.handleSubmit(this.props.modalData.modalType, {
      id: this.props.modalData.id,
      ...values,
    });
  };

  render() {
    return this.dateForm ? (
      <Formik
        {...this.dateForm}
        onSubmit={this.handleSubmit}
        isInitialValid={this.props.modalData.value}
        render={props => {
          return (
            <form className="bx--form" onSubmit={props.handleSubmit}>
              <div className="eco--modal-container">
                <div className="bx--row">
                  <div className="bx--col-lg-6 bx--col-sm-12">
                    <Field
                      label="Qty"
                      name="qty"
                      component={textInput}
                      type="number"
                    />
                  </div>
                </div>
              </div>
              <div className="bx--modal-footer">
                <button
                  className="bx--btn bx--btn--primary"
                  disabled={!props.isValid}
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          );
        }}
      />
    ) : (
      <>Loading...</>
    );
  }
}
