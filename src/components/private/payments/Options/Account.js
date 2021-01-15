import React from "react";
import { Field, ErrorMessage } from "formik";
import Select from "react-select";

import classes from "./Options.module.scss";

const AccountSelect = (props) => {
  return (
    <div className='form-group'>
      <label>¿Desde que cuenta pagarás?</label>
      {props.accounts.length > 0 ? (
        <div className={classes.AccountInfo}>
          <Field name='accountId'>
            {({ field, form }) => (
              <Select
                className={`suppliers-select  ${props.touched && props.error ? "error" : ""}`}
                placeholder='Selecciona una cuenta'
                isClearable={true}
                options={props.options}
                value={props.options.find((account) => account.value === field.value) || ""}
                onChange={(option) => props.onChange(option, field, form)}
              />
            )}
          </Field>
          {!props.accountId && props.accounts.length < 4 ? (
            <button type='button' onClick={props.addAccount} className={`button ${classes.AddAccount}`}>
              Agregar cuenta <span className='fas fa-plus' />
            </button>
          ) : null}
          <ErrorMessage name='accountId'>
            {(message) => (
              <span className='form-error'>
                <i className='fas fa-warning' /> {message}
              </span>
            )}
          </ErrorMessage>
        </div>
      ) : (
        <p className='no-account'>
          No tienes cuenta para enviar agregada{" "}
          <button type='button' onClick={props.addAccount}>
            Agregar cuenta <span className='fas fa-plus' />
          </button>
        </p>
      )}
    </div>
  );
};

export default AccountSelect;
