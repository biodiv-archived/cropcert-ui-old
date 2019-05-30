import { ModalFooter } from "carbon-components-react";
import React, { Component } from "react";
import {
  FieldControl,
  FieldGroup,
  FormBuilder,
  Validators,
} from "react-reactive-form";

import { dateInput, numberInput, textInput } from "/@components/@core/form";
import { formattedDate, formattedTime } from "/@utils/basic";

interface IProps {
  modalData;
  updateBatchInfo;
}

interface IState {
  dateForm;
}

export class BatchListModalFormDate extends Component<IProps, IState> {
  dateForm = FormBuilder.group({
    id: [this.props.modalData.id, Validators.required],
    date: [formattedDate(this.props.modalData.value), Validators.required],
    time: [
      formattedTime(this.props.modalData.value),
      [
        Validators.required,
        Validators.pattern("([01]?[0-9]|2[0-3]):[0-5][0-9]"),
      ],
    ],
  });

  componentDidUpdate() {
    this.dateForm.setValue({
      id: this.props.modalData.id,
      date: formattedDate(this.props.modalData.value),
      time: formattedTime(this.props.modalData.value),
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.updateBatchInfo(
      this.props.modalData.modalType,
      this.dateForm.value
    );
  };

  render() {
    return (
      <FieldGroup
        control={this.dateForm}
        render={() => (
          <>
            <div className="eco--modal-container">
              <form className="bx--form" onSubmit={this.handleSubmit}>
                <div className="bx--row">
                  <div className="bx--col-lg-6 bx--col-sm-12">
                    <FieldControl
                      name="date"
                      render={dateInput}
                      meta={{ label: "Date" }}
                    />
                  </div>
                  <div className="bx--col-lg-6 bx--col-sm-12">
                    <FieldControl
                      name="time"
                      render={textInput}
                      meta={{ label: "Time" }}
                    />
                  </div>
                </div>
              </form>
            </div>
            <ModalFooter
              primaryButtonText="Save"
              onRequestSubmit={this.handleSubmit}
              primaryButtonDisabled={this.dateForm.invalid}
            />
          </>
        )}
      />
    );
  }
}

export class BatchListModalFormNumber extends Component<IProps> {
  numberForm = FormBuilder.group({
    id: [this.props.modalData.id, Validators.required],
    qty: [this.props.modalData.value, Validators.required],
  });

  componentDidUpdate() {
    console.log(this.props.modalData);
    this.numberForm.setValue({
      id: this.props.modalData.id,
      qty: this.props.modalData.value,
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.updateBatchInfo(
      this.props.modalData.modalType,
      this.numberForm.value
    );
  };

  render() {
    return (
      <FieldGroup
        control={this.numberForm}
        render={() => (
          <>
            <div className="eco--modal-container">
              <form className="bx--form" onSubmit={this.handleSubmit}>
                <div className="bx--row">
                  <div className="bx--col-lg-6 bx--col-sm-12">
                    <FieldControl
                      name="qty"
                      render={numberInput}
                      meta={{ label: "Perchment Quantity" }}
                    />
                  </div>
                </div>
              </form>
            </div>
            <ModalFooter
              primaryButtonText="Save"
              onRequestSubmit={this.handleSubmit}
              primaryButtonDisabled={this.numberForm.invalid}
            />
          </>
        )}
      />
    );
  }
}
