import { Button } from "carbon-components-react";
import { Field, Formik } from "formik";
import { observer } from "mobx-react";
import React, { Component } from "react";
import * as Yup from "yup";

import { textInput } from "/@components/@core/formik";
import { QualityStore } from "/@stores/qr.store";
import { getToday, local2utc } from "/@utils/basic";

interface IProps {
  lotId;
  lotInfo;
  lotName;
  type;
  outTurn;
  quantity;
  grnNumber;
  coOperativeName;
  ccNames;
}

@observer
export default class CuppingComponent extends Component<IProps> {
  qualityStore = new QualityStore();

  cuppingForm = {
    validationSchema: Yup.object().shape({
      lotName: Yup.string().required(),
      lotId: Yup.string().required(),
      date: Yup.date().required(),
      cfa: Yup.string().required(),
      ccName: Yup.string().required(),

      cupper: Yup.string().required(),
      sampleType: Yup.string().required(),
      grnNumber: Yup.string().required(),

      // Params
      fragranceAroma: Yup.number().required(),
      flavour: Yup.number().required(),
      acidity: Yup.number().required(),
      body: Yup.number().required(),
      afterTaste: Yup.number().required(),
      balance: Yup.number().required(),
      sweetness: Yup.number().required(),
      uniformity: Yup.number().required(),
      cleanCup: Yup.number().required(),
      overAll: Yup.number().required(),

      // Problems
      taint: Yup.number().required(),
      fault: Yup.number().required(),

      notes: Yup.string().required(),
    }),
    initialValues: {
      lotName: this.props.lotName,
      lotId: this.props.lotId,
      date: getToday(),
      cfa: this.props.coOperativeName,
      ccName: this.props.ccNames.toString(),

      cupper: this.props.lotInfo.cupper,
      sampleType: this.props.type,
      grnNumber: this.props.grnNumber,

      // Params
      fragranceAroma: "",
      flavour: "",
      acidity: "",
      body: "",
      afterTaste: "",
      balance: "",
      sweetness: "",
      uniformity: "",
      cleanCup: "",
      overAll: "",

      // Problems
      taint: "",
      fault: "",

      notes: "",
    },
  };

  gradeTotal = v => {
    const _t =
      v.fragranceAroma +
      v.flavour +
      v.acidity +
      v.body +
      v.afterTaste +
      v.balance +
      v.sweetness +
      v.uniformity +
      v.cleanCup +
      v.overAll -
      (v.taint + v.fault);
    return typeof _t === "number" ? _t.toFixed(2) : "0";
  };

  handleSubmit = (values, actions) => {
    const { grnNumber, ...v } = values;
    actions.setSubmitting(false);
    this.qualityStore.createCuppingReport({
      ...v,
      timestamp: local2utc(),
    });
  };

  renderGreenForm = ({ handleSubmit, isValid, values }) => (
    <form className="bx--form" onSubmit={handleSubmit}>
      <h3 className="eco--form-title">Lot Information</h3>
      <div className="bx--row">
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="GRN Number"
            name="grnNumber"
            component={textInput}
            readOnly={true}
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Lot Name"
            name="lotName"
            component={textInput}
            readOnly={true}
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Cupping Date"
            name="date"
            component={textInput}
            type="date"
            readOnly={true}
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Cooperative Name"
            name="cfa"
            component={textInput}
            readOnly={true}
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Collection Center Name(s)"
            name="ccName"
            component={textInput}
            readOnly={true}
          />
        </div>

        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Sample Type"
            name="sampleType"
            component={textInput}
            readOnly={true}
          />
        </div>
      </div>

      <h3 className="eco--form-title">Qualities</h3>
      <div className="bx--row">
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Fragrance Aroma"
            name="fragranceAroma"
            component={textInput}
            type="number"
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Flavour"
            name="flavour"
            component={textInput}
            type="number"
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Acidity"
            name="acidity"
            component={textInput}
            type="number"
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field label="Body" name="body" component={textInput} type="number" />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="After Taste"
            name="afterTaste"
            component={textInput}
            type="number"
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Balance"
            name="balance"
            component={textInput}
            type="number"
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Sweetness"
            name="sweetness"
            component={textInput}
            type="number"
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Uniformity"
            name="uniformity"
            component={textInput}
            type="number"
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Clean Cup"
            name="cleanCup"
            component={textInput}
            type="number"
          />
        </div>
        <div className="bx--col-lg-3 bx--col-sm-12">
          <Field
            label="Overall"
            name="overAll"
            component={textInput}
            type="number"
          />
        </div>
      </div>

      <div className="bx--row">
        <div className="bx--col-lg-6 bx--col-sm-12">
          <h3 className="eco--form-title">Problems</h3>
          <div className="bx--row">
            <div className="bx--col-lg-6 bx--col-sm-12">
              <Field
                label="Taint"
                name="taint"
                component={textInput}
                type="number"
              />
            </div>
            <div className="bx--col-lg-6 bx--col-sm-12">
              <Field
                label="Fault"
                name="fault"
                component={textInput}
                type="number"
              />
            </div>
          </div>
        </div>
        <div className="bx--col-lg-6 bx--col-sm-12">
          <h3 className="eco--form-title">Additional Information</h3>
          <Field
            label="Notes (comma seprated)"
            name="notes"
            component={textInput}
          />
        </div>
      </div>

      <h3 className="eco--form-title">TT - {this.gradeTotal(values)}</h3>

      <Button type="submit" disabled={!isValid}>
        Submit
      </Button>
    </form>
  );

  render() {
    return (
      <Formik
        {...this.cuppingForm}
        onSubmit={this.handleSubmit}
        render={this.renderGreenForm}
      />
    );
  }
}
