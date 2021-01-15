import React from "react";
import { Field, ErrorMessage } from "formik";
import Select from "react-select";
import { isMobile } from "react-device-detect";

const styles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: isMobile ? "12.5px" : "14px",
  }),
  menu: (provided, state) => ({
    ...provided,
    fontSize: isMobile ? "12.5px" : "14px",
  }),
  control: (provided, state) => ({
    ...provided,
    border: "none",
    borderBottom: "1px solid #ccc",
    borderRadius: 0,
    boxShadow: "none",
    fontSize: isMobile ? "12.5px" : "14px",
  }),
};

const CustomSelect = (props) => {
  return (
    <div className='form-group'>
      <label>{props.label}</label>
      <Field
        name={props.name}
        component={({ field, form }) => (
          <Select
            className={props.selectClassName}
            placeholder={props.placeholder}
            isClearable={true}
            formatOptionLabel={props.formatLabel}
            options={props.options}
            value={props.options.find((type) => type.value === field.value) || ""}
            onChange={(option) => props.onChange(option, field, form)}
            styles={styles}
          />
        )}
      />
      <ErrorMessage name={props.name}>
        {(message) => (
          <span className='form-error'>
            <i className='fas fa-warning' /> {message}
          </span>
        )}
      </ErrorMessage>
    </div>
  );
};

export default CustomSelect;
