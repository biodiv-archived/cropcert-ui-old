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
      lot_id: [this.props.lotId, Validators.required],
      lot_reception_date: [getToday(), Validators.required],
      cfa: [this.props.lotInfo.cfa, Validators.required],
      cc_code: [this.props.lotInfo.cc_code, Validators.required],

      coffee_type: [this.props.lotInfo.coffee_type, Validators.required],
      over_turn_percentage: [100, Validators.required],
      mc: ["", Validators.required],

      // Grades
      grade_aa: [0, Validators.required],
      grade_a: [0, Validators.required],
      grade_b: [0, Validators.required],
      grade_ab: [0, Validators.required],
      c: [0, Validators.required],
      pb: [0, Validators.required],
      triage: [0, Validators.required],

      // Severe defects
      full_black: [0, Validators.required],
      full_sour: [0, Validators.required],
      pods: [0, Validators.required],
      fungas_damaged: [0, Validators.required],
      em: [0, Validators.required],
      severe_insect: [0, Validators.required],

      // Less Severe defects
      partial_black: [0, Validators.required],
      partial_sour: [0, Validators.required],
      patchment: [0, Validators.required],
      floaters_chalky: [0, Validators.required],
      immature: [0, Validators.required],
      withered: [0, Validators.required],
      shells: [0, Validators.required],
      broken_chipped: [0, Validators.required],
      husks: [0, Validators.required],
      pinHole: [0, Validators.required],
    }),
  };

  gradeTotal = () => {
    const _v = this.state.form.value;
    return (
      parseInt(_v.grade_aa.toString()) +
      parseInt(_v.grade_a.toString()) +
      parseInt(_v.grade_b.toString()) +
      parseInt(_v.grade_ab.toString()) +
      parseInt(_v.c.toString()) +
      parseInt(_v.pb.toString()) +
      parseInt(_v.triage.toString())
    );
  };

  severeDefectsTotal = () => {
    const _v = this.state.form.value;
    return (
      parseInt(_v.full_black.toString()) +
      parseInt(_v.full_sour.toString()) +
      parseInt(_v.pods.toString()) +
      parseInt(_v.fungas_damaged.toString()) +
      parseInt(_v.em.toString()) +
      parseInt(_v.severe_insect.toString())
    );
  };

  lessSevereDefectsTotal = () => {
    const _v = this.state.form.value;
    return (
      parseInt(_v.partial_black.toString()) +
      parseInt(_v.partial_sour.toString()) +
      parseInt(_v.patchment.toString()) +
      parseInt(_v.floaters_chalky.toString()) +
      parseInt(_v.immature.toString()) +
      parseInt(_v.withered.toString()) +
      parseInt(_v.shells.toString()) +
      parseInt(_v.broken_chipped.toString()) +
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
      percentage_out_turn: this.outturnTotal(),
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
              name="lot_id"
              render={textInput}
              meta={{ label: "Lot Id", readOnly: true }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="lot_reception_date"
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
              name="cc_code"
              render={textInput}
              meta={{ label: "CC Code", readOnly: true }}
            />
          </div>
        </div>

        <div className="bx--row">
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="coffee_type"
              render={textInput}
              meta={{ label: "coffee_type" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="over_turn_percentage"
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
              name="grade_aa"
              render={numberInput}
              meta={{ label: "AA" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="grade_a"
              render={numberInput}
              meta={{ label: "A" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="grade_b"
              render={numberInput}
              meta={{ label: "B" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="grade_ab"
              render={numberInput}
              meta={{ label: "AB" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl name="c" render={numberInput} meta={{ label: "C" }} />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="pb"
              render={numberInput}
              meta={{ label: "PB" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="triage"
              render={numberInput}
              meta={{ label: "Triage" }}
            />
          </div>
        </div>

        <h3 className="eco--form-title">
          Severe Defects - {this.severeDefectsTotal()}
        </h3>
        <div className="bx--row">
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="full_black"
              render={numberInput}
              meta={{ label: "Full Black" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="full_sour"
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
              name="fungas_damaged"
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
              name="severe_insect"
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
              name="partial_black"
              render={numberInput}
              meta={{ label: "Partial Black" }}
            />
          </div>
          <div className="bx--col-lg-3 bx--col-sm-12">
            <FieldControl
              name="partial_sour"
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
              name="floaters_chalky"
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
              name="broken_chipped"
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
