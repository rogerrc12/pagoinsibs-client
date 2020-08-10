import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';

const RegisterDetails = ({ values, errors, touched }) => {
  return (
    <>
      <div className="full-name-group">

        <div className="form-group">
          <label htmlFor="first_name">Primer Nombre</label>
          <Field  type="text" placeholder="John" name="first_name" id="first_name"  className={`form-control ${touched.first_name && errors.first_name ? 'error' : ''}`} />
          <ErrorMessage name="first_name">
            {message => <span className="form-error"><i className="fas fa-warning"/> {message}</span>}
          </ErrorMessage>
        </div>

        <div className="form-group">
          <label htmlFor="last_name">Primer Apellido</label>
          <Field type="text" placeholder="Doe" name="last_name" id="last_name" className={`form-control ${touched.last_name && errors.last_name ? 'error' : ''}`} />
          <ErrorMessage name="last_name">
            {message => <span className="form-error"><i className="fas fa-warning"/> {message}</span>}
          </ErrorMessage>
        </div>

      </div>

      <div className="form-group">
        <label htmlFor="email">Correo electrónico</label>
        <Field type="email" id="email" name="email" placeholder="johndoe@mail.com" className={`form-control ${touched.email && errors.email ? 'error' : ''}`} />
        <ErrorMessage name="email">
          {message => <span className="form-error"><i className="fas fa-warning"/> {message}</span>}
        </ErrorMessage>
      </div>

      <div className="form-terms">
        <Field name="terms" component={({ field, form }) => 
          <input type="checkbox" id="terms" defaultChecked={values.terms} 
            onChange={e => form.setFieldValue(field.name, e.target.checked)}
          />
        }/>
        <label htmlFor="terms">He leído, y acepto los <Link to="/">términos y condiciones</Link> y <Link to="/">políticas de privacidad</Link> de INSIBS C.A. para el uso correcto de la plataforma.</label>
      </div>
    </>
  )
}

export default RegisterDetails;
