import React, { useState } from "react";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { Field, ErrorMessage } from "formik";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import "moment/locale/es";

moment.locale("es");

const DateSelector = (props) => {
  const [locale] = useState("es");

  const { name, label, value, helperText, ...rest } = props;

  return (
    <div className='form-group payment-date-group'>
      <label>{label}</label>
      <Field
        name={name}
        component={({ field, form }) => (
          <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={locale}>
            <DatePicker
              invalidDateMessage='Formato de fecha inválido'
              helperText={helperText}
              value={value}
              {...rest}
              onChange={(date) => form.setFieldValue(field.name, new Date(date))}
            />
          </MuiPickersUtilsProvider>
        )}
      />
      <ErrorMessage name={name}>
        {(message) => (
          <span className='form-error'>
            <i className='fas fa-warning' /> {message}
          </span>
        )}
      </ErrorMessage>
    </div>
  );
};

export default DateSelector;
