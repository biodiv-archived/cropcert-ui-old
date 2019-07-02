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
  handleSubmit;
}

interface IState {
  dateForm;
}

export class LotListModalFormDate extends Component<IProps, IState> {
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

  hs = e => {
    e.preventDefault();
    this.props.handleSubmit(
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
              <form className="bx--form" onSubmit={this.hs}>
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
              onRequestSubmit={this.hs}
              primaryButtonDisabled={this.dateForm.invalid}
            />
          </>
        )}
      />
    );
  }
}

export class LotListModalFormString extends Component<IProps> {
  stringForm = FormBuilder.group({
    id: [this.props.modalData.id, Validators.required],
    value: [this.props.modalData.value, Validators.required],
  });

  componentDidUpdate() {
    this.stringForm.setValue({
      id: this.props.modalData.id,
      value: this.props.modalData.value,
    });
  }

  hs = e => {
    e.preventDefault();
    this.props.handleSubmit(
      this.props.modalData.modalType,
      this.stringForm.value
    );
  };

  render() {
    return (
      <FieldGroup
        control={this.stringForm}
        render={() => (
          <>
            <div className="eco--modal-container">
              <form className="bx--form" onSubmit={this.hs}>
                <div className="bx--row">
                  <div className="bx--col-lg-6 bx--col-sm-12">
                    <FieldControl
                      name="value"
                      render={textInput}
                      meta={{ label: "GNR" }}
                    />
                  </div>
                </div>
              </form>
            </div>
            <ModalFooter
              primaryButtonText="Save"
              onRequestSubmit={this.hs}
              primaryButtonDisabled={this.stringForm.invalid}
            />
          </>
        )}
      />
    );
  }
}

export class LotListModalFormNumber extends Component<IProps> {
  numberForm = FormBuilder.group({
    id: [this.props.modalData.id, Validators.required],
    value: [this.props.modalData.value, Validators.required],
  });

  componentDidUpdate() {
    this.numberForm.setValue({
      id: this.props.modalData.id,
      value: this.props.modalData.value,
    });
  }

  hs = e => {
    e.preventDefault();
    this.props.handleSubmit(
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
              <form className="bx--form" onSubmit={this.hs}>
                <div className="bx--row">
                  <div className="bx--col-lg-6 bx--col-sm-12">
                    <FieldControl
                      name="value"
                      render={numberInput}
                      meta={{ label: "Perchment Quantity" }}
                    />
                  </div>
                </div>
              </form>
            </div>
            <ModalFooter
              primaryButtonText="Save"
              onRequestSubmit={this.hs}
              primaryButtonDisabled={this.numberForm.invalid}
            />
          </>
        )}
      />
    );
  }
}
