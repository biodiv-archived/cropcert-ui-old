import React from "react";

export const textInput = ({
  field,
  form: { touched, errors },
  label,
  ...props
}) => {
  const hasErrors = touched[field.name] && errors[field.name];
  return (
    <fieldset className="bx--fieldset">
      <div className="bx--form-item">
        <label className="bx--label">{label}</label>
        <input
          type="text"
          id={field.name}
          className="bx--text-input"
          placeholder={`Enter ${field.name}`}
          {...field}
          {...props}
          {...(hasErrors ? { "data-invalid": true } : {})}
        />
        {hasErrors && (
          <div className="bx--form-requirement">{errors[field.name]}</div>
        )}
      </div>
    </fieldset>
  );
};

export const selectInput = ({
  field,
  form: { touched, errors },
  label,
  options,
  ...props
}) => {
  const hasErrors = touched[field.name] && errors[field.name];
  return (
    <fieldset className="bx--fieldset">
      <div className="bx--form-item">
        <div className="bx--select eco--w100">
          <label className="bx--label">{label}</label>
          <div className="bx--select-input__wrapper">
            <select
              id={field.name}
              className="bx--select-input eco--w100"
              {...field}
              {...props}
              {...(hasErrors ? { "data-invalid": true } : {})}
            >
              {options.map(o => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
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
          {hasErrors && (
            <div className="bx--form-requirement">{errors[field.name]}</div>
          )}
        </div>
      </div>
    </fieldset>
  );
};
