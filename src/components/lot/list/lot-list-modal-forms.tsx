import { Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

import { textInput } from "/@components/@core/formik";
import { formattedDate, formattedTime, utc2local } from "/@utils/basic";

interface IProps {
  modalData;
  handleSubmit;
  modalDataType?;
}

export const LotListModalFormDate = (props: IProps) => {
  const [form, setForm] = useState(null as any);

  useEffect(() => {
    const dl = utc2local(props.modalData.value);
    setForm({
      validationSchema: Yup.object().shape({
        date: Yup.date().required(),
        time: Yup.string()
          .matches(
            new RegExp("^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$"),
            "HH:MM"
          )
          .required(),
      }),
      initialValues: {
        id: props.modalData.id,
        date: formattedDate(dl),
        time: formattedTime(dl),
      },
    });
  }, [props.modalData]);

  const submitForm = (values, actions) => {
    actions.setSubmitting(false);
    props.handleSubmit(props.modalData.modalType, values);
  };

  return form ? (
    <Formik
      {...form}
      enableReinitialize
      onSubmit={submitForm}
      isInitialValid={!props.modalData.value}
      render={({ handleSubmit, isValid }) => {
        return (
          <form className="bx--form" onSubmit={handleSubmit}>
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
                disabled={!isValid}
                type="submit"
              >
                Save {props.modalData.title}
              </button>
            </div>
          </form>
        );
      }}
    />
  ) : (
    <>Loading...</>
  );
};

export const LotListModalForm = (props: IProps) => {
  const [form, setForm] = useState(null as any);

  useEffect(() => {
    setForm({
      validationSchema: Yup.object().shape({
        value:
          props.modalDataType === "number"
            ? Yup.number()
                .max(props.modalData.max)
                .required()
            : Yup.string().required(),
      }),
      initialValues: {
        id: props.modalData.id,
        value: props.modalData.value,
      },
    });
  }, [props.modalData, props.modalDataType]);

  const submitForm = (values, actions) => {
    actions.setSubmitting(false);
    props.handleSubmit(props.modalData.modalType, values);
  };

  return form ? (
    <Formik
      {...form}
      enableReinitialize
      onSubmit={submitForm}
      isInitialValid={props.modalData.value}
      render={({ handleSubmit, isValid }) => {
        return (
          <form className="bx--form" onSubmit={handleSubmit}>
            <div className="eco--modal-container">
              <div className="bx--row">
                <div className="bx--col-lg-6 bx--col-sm-12">
                  <Field
                    label={props.modalData.title}
                    name="value"
                    component={textInput}
                    type={props.modalDataType}
                  />
                </div>
              </div>
            </div>
            <div className="bx--modal-footer">
              <button
                className="bx--btn bx--btn--primary"
                disabled={!isValid}
                type="submit"
              >
                Save {props.modalData.title}
              </button>
            </div>
          </form>
        );
      }}
    />
  ) : (
    <>Loading...</>
  );
};
