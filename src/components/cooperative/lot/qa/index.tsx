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
export default class QAComponent extends Component<IProps> {
  qualityStore = new QualityStore();

  state = {
    form: FormBuilder.group({
      lotName: [this.props.lotId, Validators.required],
      date: [getToday(), Validators.required],
      cfa: [this.props.lotInfo.cfa, Validators.required],
      ccCode: [this.props.lotInfo.cc_code, Validators.required],

      coffeeType: [this.props.lotInfo.coffee_type, Validators.required],
      overTurnPercentage: [100, Validators.required],
      mc: ["", Validators.required],

      // Grades
      gradeAA: [0, Validators.required],
      gradeA: [0, Validators.required],
      gradeB: [0, Validators.required],
      gradeAB: [0, Validators.required],
      gradeC: [0, Validators.required],
      gradePB: [0, Validators.required],
      gradeTriage: [0, Validators.required],

      // Severe defects
      fullBlack: [0, Validators.required],
      fullSour: [0, Validators.required],
      pods: [0, Validators.required],
      fungasDamaged: [0, Validators.required],
      em: [0, Validators.required],
      severeInsect: [0, Validators.required],

      // Less Severe defects
      partialBlack: [0, Validators.required],
      partialSour: [0, Validators.required],
      patchment: [0, Validators.required],
      floatersChalky: [0, Validators.required],
      immature: [0, Validators.required],
      withered: [0, Validators.required],
      shells: [0, Validators.required],
      brokenChipped: [0, Validators.required],
      husks: [0, Validators.required],
      pinHole: [0, Validators.required],
    }),
  };

  gradeTotal = () => {
    const _v = this.state.form.value;
    return (
      parseInt(_v.gradeAA.toString()) +
      parseInt(_v.gradeA.toString()) +
      parseInt(_v.gradeB.toString()) +
      parseInt(_v.gradeAB.toString()) +
      parseInt(_v.gradeC.toString()) +
      parseInt(_v.gradePB.toString()) +
      parseInt(_v.gradeTriage.toString())
    );
  };

  severeDefectsTotal = () => {
    const _v = this.state.form.value;
    return (
      parseInt(_v.fullBlack.toString()) +
      parseInt(_v.fullSour.toString()) +
      parseInt(_v.pods.toString()) +
      parseInt(_v.fungasDamaged.toString()) +
      parseInt(_v.em.toString()) +
      parseInt(_v.severeInsect.toString())
    );
  };

  lessSevereDefectsTotal = () => {
    const _v = this.state.form.value;
    return (
      parseInt(_v.partialBlack.toString()) +
      parseInt(_v.partialSour.toString()) +
      parseInt(_v.patchment.toString()) +
      parseInt(_v.floatersChalky.toString()) +
      parseInt(_v.immature.toString()) +
      parseInt(_v.withered.toString()) +
      parseInt(_v.shells.toString()) +
      parseInt(_v.brokenChipped.toString()) +
      parseInt(_v.husks.toString()) +
      parseInt(_v.pinHole.toString())
    );
  };

  outturnTotal = () => {
    return 100 - (this.severeDefectsTotal() + this.lessSevereDefectsTotal());
  };

  handleSubmit = e => {
    e.preventDefault();
    this.qualityStore.createQualityReport({
      ...this.state.form.value,
      percentageOutTurn: this.outturnTotal(),
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
              meta={{ label: "Lot Reception Date", readOnly: true }}
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
        </div>

        <div className="bx--row">
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="coffeeType"
              render={textInput}
              meta={{ label: "Coffee Type" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="overTurnPercentage"
              render={numberInput}
              meta={{ label: "Outturn Percentage" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="mc"
              render={numberInput}
              meta={{ label: "Moisture Content" }}
            />
          </div>
        </div>

        <h3 className="eco--form-title">
          Quality Grading - {this.gradeTotal()}
        </h3>
        <div className="bx--row">
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="gradeAA"
              render={numberInput}
              meta={{ label: "AA" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="gradeA"
              render={numberInput}
              meta={{ label: "A" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="gradeB"
              render={numberInput}
              meta={{ label: "B" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="gradeAB"
              render={numberInput}
              meta={{ label: "AB" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="gradeC"
              render={numberInput}
              meta={{ label: "C" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="gradePB"
              render={numberInput}
              meta={{ label: "PB" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="gradeTriage"
              render={numberInput}
              meta={{ label: "gradeTriage" }}
            />
          </div>
        </div>

        <h3 className="eco--form-title">
          Severe Defects - {this.severeDefectsTotal()}
        </h3>
        <div className="bx--row">
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="fullBlack"
              render={numberInput}
              meta={{ label: "Full Black" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="fullSour"
              render={numberInput}
              meta={{ label: "Full Sour" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="pods"
              render={numberInput}
              meta={{ label: "Pods" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="fungasDamaged"
              render={numberInput}
              meta={{ label: "Fungas Damaged" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="em"
              render={numberInput}
              meta={{ label: "E M" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="severeInsect"
              render={numberInput}
              meta={{ label: "Severe Insect" }}
            />
          </div>
        </div>

        <h3 className="eco--form-title">
          Less Severe Defects - {this.lessSevereDefectsTotal()}
        </h3>
        <div className="bx--row">
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="partialBlack"
              render={numberInput}
              meta={{ label: "Partial Black" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="partialSour"
              render={numberInput}
              meta={{ label: "Partial Sour" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="patchment"
              render={numberInput}
              meta={{ label: "Patchment" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="floatersChalky"
              render={numberInput}
              meta={{ label: "Floaters/Chalky" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="immature"
              render={numberInput}
              meta={{ label: "Immature" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="withered"
              render={numberInput}
              meta={{ label: "Withered" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="shells"
              render={numberInput}
              meta={{ label: "Shells" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="brokenChipped"
              render={numberInput}
              meta={{ label: "Broken/Chipped" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="husks"
              render={numberInput}
              meta={{ label: "Husks" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="pinHole"
              render={numberInput}
              meta={{ label: "Pin Hole" }}
            />
          </div>
        </div>

        <h3 className="eco--form-title">
          Out turn FAQ - {this.outturnTotal()}%
        </h3>

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
