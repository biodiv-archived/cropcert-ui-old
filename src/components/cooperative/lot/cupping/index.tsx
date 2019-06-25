import { Button } from "carbon-components-react";
import { observer } from "mobx-react";
import React, { Component } from "react";
import {
  FieldGroup,
  FormBuilder,
  Validators,
  FieldControl,
} from "react-reactive-form";

import { QualityStore } from "/@stores/qr.store";
import { getToday } from "/@utils/basic";
import { textInput, dateInput, numberInput } from "/@components/@core/form";

interface IProps {
  lotId;
  lotInfo;
}

@observer
export default class CuppingComponent extends Component<IProps> {
  qualityStore = new QualityStore();

  state = {
    form: FormBuilder.group({
      lotName: [this.props.lotId, Validators.required],
      date: [getToday(), Validators.required],
      cfa: [this.props.lotInfo.cfa, Validators.required],
      ccCode: [this.props.lotInfo.cc_code, Validators.required],

      cupper: [this.props.lotInfo.cupper, Validators.required],
      sampleType: [this.props.lotInfo.coffee_type, Validators.required],

      // Params
      fragranceAroma: [0, Validators.required],
      flavour: [0, Validators.required],
      acidity: [0, Validators.required],
      body: [0, Validators.required],
      afterTaste: [0, Validators.required],
      balance: [0, Validators.required],
      sweetness: [0, Validators.required],
      uniformity: [0, Validators.required],
      cleanCup: [0, Validators.required],
      overAll: [0, Validators.required],

      // Problems
      taint: [0, Validators.required],
      fault: [0, Validators.required],

      notes: ["", Validators.required],
    }),
  };

  gradeTotal = () => {
    const _v = this.state.form.value;
    return (
      parseInt(_v.fragranceAroma.toString()) +
      parseInt(_v.flavour.toString()) +
      parseInt(_v.acidity.toString()) +
      parseInt(_v.body.toString()) +
      parseInt(_v.afterTaste.toString()) +
      parseInt(_v.balance.toString()) +
      parseInt(_v.sweetness.toString()) +
      parseInt(_v.uniformity.toString()) +
      parseInt(_v.cleanCup.toString()) +
      parseInt(_v.overAll.toString()) -
      (parseInt(_v.taint.toString()) + parseInt(_v.fault.toString()))
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    this.qualityStore.createCuppingReport({
      ...this.state.form.value,
      timestamp: new Date().getTime(),
    });
  };

  renderFieldGroup = ({ get, invalid }) => {
    return (
      <form className="bx--form" onSubmit={this.handleSubmit}>
        <h3 className="eco--form-title">Lot Information</h3>
        <div className="bx--row">
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="lotName"
              render={textInput}
              meta={{ label: "Lot Name", readOnly: true }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="date"
              render={dateInput}
              meta={{ label: "Cupping Date", readOnly: true }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="cfa"
              render={textInput}
              meta={{ label: "CFA", readOnly: true }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="ccCode"
              render={textInput}
              meta={{ label: "CC Code", readOnly: true }}
            />
          </div>

          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="sampleType"
              render={textInput}
              meta={{ label: "Sample Type" }}
            />
          </div>
        </div>

        <h3 className="eco--form-title">Qualities</h3>
        <div className="bx--row">
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="fragranceAroma"
              render={numberInput}
              meta={{ label: "Fragrance Aroma" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="flavour"
              render={numberInput}
              meta={{ label: "Flavour" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="acidity"
              render={numberInput}
              meta={{ label: "Acidity" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="body"
              render={numberInput}
              meta={{ label: "Body" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="afterTaste"
              render={numberInput}
              meta={{ label: "After Taste" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="balance"
              render={numberInput}
              meta={{ label: "Balance" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="sweetness"
              render={numberInput}
              meta={{ label: "Sweetness" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="uniformity"
              render={numberInput}
              meta={{ label: "Uniformity" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="cleanCup"
              render={numberInput}
              meta={{ label: "Clean Cup" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="overAll"
              render={numberInput}
              meta={{ label: "Overall" }}
            />
          </div>
        </div>

        <div className="bx--row">
          <div className="bx--col-lg-6 bx--col-sm-12">
            <h3 className="eco--form-title">Problems</h3>
            <div className="bx--row">
              <div className="bx--col-lg-6 bx--col-sm-12">
                <FieldControl
                  name="taint"
                  render={numberInput}
                  meta={{ label: "Taint" }}
                />
              </div>
              <div className="bx--col-lg-6 bx--col-sm-12">
                <FieldControl
                  name="fault"
                  render={numberInput}
                  meta={{ label: "Fault" }}
                />
              </div>
            </div>
          </div>
          <div className="bx--col-lg-6 bx--col-sm-12">
            <h3 className="eco--form-title">Additional Information</h3>
            <FieldControl
              name="notes"
              render={textInput}
              meta={{ label: "Notes (comma seprated)" }}
            />
          </div>
        </div>

        <h3 className="eco--form-title">TT - {this.gradeTotal()}</h3>

        <Button type="submit" disabled={invalid}>
          Submit
        </Button>
      </form>
    );
  };

  render() {
    return (
      <FieldGroup control={this.state.form} render={this.renderFieldGroup} />
    );
  }
}
