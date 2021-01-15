import React from "react";
import { Field, ErrorMessage } from "formik";

const Checkbox = (props) => {
  return (
    <div className='form-group'>
      <label>
        <Field type='checkbox' name={props.name} {...props} />
        <span style={{ marginLeft: "10px" }}>{props.label}</span>
      </label>
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

export default Checkbox;
