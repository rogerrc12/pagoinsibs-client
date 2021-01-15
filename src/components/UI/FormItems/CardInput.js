import React from "react";
import { ErrorMessage } from "formik";
import Cleave from "cleave.js/react";

const CardInput = (props) => {
  const { touched, error } = props;

  return (
    <div className='form-group'>
      <label>Número en la tarjeta</label>
      <Cleave
        placeholder='**** **** **** ****'
        options={{ creditCard: true }}
        onChange={props.onChange}
        onFocus={props.onFocus}
        className={`form-control ${touched && error ? "error" : ""}`}
        value={props.value}
        name='cardNumber'
      />
      <ErrorMessage name='cardNumber'>
        {(message) => (
          <span className='form-error'>
            <i className='fas fa-warning' /> {message}
          </span>
        )}
      </ErrorMessage>
    </div>
  );
};

export default CardInput;
