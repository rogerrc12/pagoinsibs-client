import React from 'react';
import { Field, ErrorMessage } from 'formik';
import Cleave from 'cleave.js/react';

const UserDetails = ({ values, setValue, errors, touched }) => {

  const onAmountChange = e => setValue(e.target.name, e.target.rawValue);

  return (
    <>
      <div className="form-group">
        <label htmlFor="description">Concepto de pago:</label>
        <Field id="description" name="description" type="text" className={`form-control ${touched.description && errors.description ? 'error' : ''}`} />
        <ErrorMessage name="description">
          {message => <span className="form-error"><i className="fas fa-warning"/> {message}</span>}
        </ErrorMessage>
      </div>

      <div className="form-group">
        <label htmlFor="amount">Escribe el monto del {values.supplier_type === 1 ? 'servicio' : 'producto'}:</label>
        <div className="input-group">
          <Cleave name="amount" id="amount" autoComplete="off"
            options={{ 
              numeral: true, 
              numeralThousandsGroupStyle: 'thousand', 
              numeralDecimalMark: ',',
              delimiter: '',
              numeralPositiveOnly: true,
              stripLeadingZeroes: true
            }}
            onChange={onAmountChange}
          />
          <div className="input-group-append">
            <span className="input-group-text">Bs.</span>
          </div>
        </div>
        <ErrorMessage name="amount">
          {message => <span className="form-error"><i className="fas fa-warning"></i> {message}</span>}
        </ErrorMessage>
      </div>
    </>
  )
}

export default UserDetails;