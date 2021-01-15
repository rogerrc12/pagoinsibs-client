import React from "react";
import { Field, ErrorMessage } from "formik";

import { togglePassword } from "../../../helpers/helpers";

const Input = (props) => {
  const { groupClass, touched, error, ...rest } = props;

  let InputElement = (
    // eslint-disable-next-line
    <Field {...rest} name={props.name} type={props.type} className={`${props.className || ""} form-control ${touched && error ? "error" : ""}`} />
  );

  if (props.type === "select") {
    InputElement = (
      // eslint-disable-next-line
      <Field {...rest} as='select' name={props.name} className={`form-control ${touched && error ? "error" : ""}`}>
        {props.children}
      </Field>
    );
  }

  return (
    <div className={`form-group ${groupClass || ""}`}>
      {props.label ? <label>{props.label}</label> : null}
      {InputElement}
      {props.type === "password" ? (
        <span
          className='fas fa-eye input-icon pointer'
          id={`${props.id === "confirm_password" ? "confirm_password_icon" : "password_icon"}`}
          onClick={togglePassword}
        />
      ) : null}
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

export default Input;
