import { Checkbox } from "carbon-components-react";
import { For } from "control-statements";
import React from "react";

export const textInput = ({ handler, touched, hasError, meta }) => (
  <fieldset className="bx--fieldset">
    <div className="bx--form-item">
      <label className="bx--label">{meta.label}</label>
      <input
        type="text"
        className="bx--text-input"
        placeholder={`Enter ${meta.label}`}
        {...meta}
        {...handler()}
        {...(touched && hasError("required") ? { "data-invalid": true } : {})}
      />
      {touched && hasError("required") && (
        <div className="bx--form-requirement">{meta.label} is required</div>
      )}
    </div>
  </fieldset>
);

export const passwordInput = ({ handler, touched, hasError, meta }) => (
  <fieldset className="bx--fieldset">
    <div className="bx--form-item">
      <label className="bx--label">{meta.label}</label>
      <input
        type="password"
        className="bx--text-input"
        placeholder={`Enter ${meta.label}`}
        {...handler()}
        {...(touched && hasError("required") ? { "data-invalid": true } : {})}
      />
      {touched && hasError("required") && (
        <div className="bx--form-requirement">{meta.label} is required</div>
      )}
    </div>
  </fieldset>
);

export const dateInput = ({ handler, touched, hasError, meta }) => (
  <fieldset className="bx--fieldset">
    <div className="bx--form-item">
      <label className="bx--label">{meta.label}</label>
      <input
        type="date"
        className="bx--text-input"
        placeholder={`Enter ${meta.label}`}
        {...handler()}
        {...meta}
        {...(touched && hasError("required") ? { "data-invalid": true } : {})}
      />
      {touched && hasError("required") && (
        <div className="bx--form-requirement">{meta.label} is required</div>
      )}
    </div>
  </fieldset>
);

export const numberInput = ({ handler, touched, hasError, meta }) => (
  <fieldset className="bx--fieldset">
    <div className="bx--form-item">
      <label className="bx--label">{meta.label}</label>
      <input
        type="number"
        className="bx--text-input"
        placeholder={`Enter ${meta.label}`}
        {...handler()}
        {...meta}
        {...((touched && hasError("required")) ||
        hasError("max") ||
        hasError("min")
          ? { "data-invalid": true }
          : {})}
      />
      {touched && hasError("required") && (
        <div className="bx--form-requirement">{meta.label} is required</div>
      )}
    </div>
  </fieldset>
);

export const tableNumberInput = ({ handler, touched, hasError, meta }) => (
  <input
    type="number"
    className="bx--text-input eco--form-table-number"
    placeholder={`Enter ${meta.label}`}
    {...handler()}
    {...meta}
    {...((touched && hasError("required")) || hasError("max") || hasError("min")
      ? { "data-invalid": true }
      : {})}
  />
);

export const selectInput = ({ handler, touched, hasError, meta }) => {
  const { options, ...properties } = meta;
  return (
    <fieldset className="bx--fieldset">
      <div className="bx--form-item">
        <div className="bx--select eco--w100">
          <label className="bx--label">{meta.label}</label>
          <div className="bx--select-input__wrapper">
            <select
              className="bx--select-input eco--w100"
              {...properties}
              {...handler()}
            >
              <For each="$item" of={options}>
                <option key="$item.value" value="$item.value">
                  $item.name
                </option>
              </For>
            </select>
            <svg
              focusable="false"
              preserveAspectRatio="xMidYMid meet"
              style={{ willChange: "transform" }}
              xmlns="http://www.w3.org/2000/svg"
              className="bx--select__arrow"
              width="10"
              height="6"
              viewBox="0 0 10 6"
              aria-hidden="true"
            >
              <path d="M5 6L0 1 .7.3 5 4.6 9.3.3l.7.7z" />
            </svg>
          </div>
          {touched && hasError("required") && (
            <div className="bx--form-requirement">{meta.label} is required</div>
          )}
        </div>
      </div>
    </fieldset>
  );
};

export const checkBoxInput = ({ handler, touched, hasError, meta }) => (
  <Checkbox
    {...handler()}
    labelText={meta.label}
    defaultChecked={meta.checked}
    id={meta.label}
  />
);
