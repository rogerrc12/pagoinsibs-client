import React from "react";
import { Field, ErrorMessage } from "formik";
import Cleave from "cleave.js/react";

const NumberInput = (props) => {
  return (
    <div className='form-group'>
      <label>{props.label}</label>
      <Field name={props.name} value={props.value}>
        {({ field, form }) => (
          <div className='input-group'>
            <Cleave
              {...props}
              value={props.value}
              autoComplete='off'
              options={props.options}
              onChange={(e) => props.onChange(e.target.rawValue, field, form)}
            />
            <div className='input-group-append'>
              <span className='input-group-text'>{props.currency}</span>
            </div>
          </div>
        )}
      </Field>
      <ErrorMessage name='amount'>
        {(message) => (
          <span className='form-error'>
            <i className='fas fa-warning' /> {message}
          </span>
        )}
      </ErrorMessage>
    </div>
  );
};

export default NumberInput;
