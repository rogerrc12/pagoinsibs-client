import React from "react";
import { Field } from "formik";

const Radio = (props) => {
  const { id, name, error, touched, label, value, ...rest } = props;

  return (
    <div className='form-check'>
      <Field type='radio' id={id} name={name} className={`form-check-input ${error && touched ? "error" : ""}`} value={value} {...rest} />
      <label className='form-check-label' htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default Radio;
