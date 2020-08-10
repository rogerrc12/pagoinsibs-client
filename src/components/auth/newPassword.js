import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { togglePassword } from '../../helpers/helpers';
// Redux
import { connect } from 'react-redux';
import { resetPassword, getResetPassword } from '../../actions/auth';

const formSchema = Yup.object().shape({
  password: Yup.string().required('Debes colocar una contraseña.').matches(/^(?=.*\d)(?=.*[a-zA-Z])[A-Za-z\d!@#$%^&*()_\-+=]{6,}$/, 'Debe contener al menos 1 latre y 1 número.'),
  confirm_password: Yup.string().required('Debes confirmar la contraseña.')
    .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden.')
});

const Password = ({ resetPassword, getResetPassword, history, location }) => {

  const emailRef = useRef(null);

  useEffect(() => {
    const fetched = async () => {
      const querySearch = new URLSearchParams(location.search);
      const reset = querySearch.get('reset');
      const reset_token = querySearch.get('reset_token');
      const res = await getResetPassword(history, reset, reset_token);
      
      !res ? emailRef.current = null : emailRef.current = res.email;
    };

    fetched();
  }, [getResetPassword, history, location]);

  return (
    <main className="form-content main-content">
      <div className="container">
        <section className="form-section">
          <h1>Coloca tu nueva contraseña</h1>
          <Formik initialValues={{ password: '', confirm_password: '', email: '' }} 
            validationSchema={formSchema}
            onSubmit={values => resetPassword(values, history)}
          >
            {({ isValid, setFieldValue, errors, touched }) =>
              <Form className="reset-form">
                <div className="form-group icon-group">
                  <label htmlFor="password">Contraseña</label>
                  <Field type="password" id="password" name="password" autoComplete="new-password" className={`form-control ${touched.password && errors.password ? 'error' : ''}`} />
                  <span className="fas fa-eye input-icon pointer" id="password-icon" onClick={() => togglePassword()}/>
                  <span className="form-msg"><i className="fas fa-info-circle"/> Al menos 6 caracteres.</span>
                  <ErrorMessage name="password">
                    {message => <span className="form-error"><i className="fas fa-warning"/> {message}</span>}
                  </ErrorMessage>
                </div>
                <div className="form-group icon-group">
                  <label htmlFor="confirm_password">Confirmar contraseña</label>
                  <Field type="password" id="confirm_password" name="confirm_password" autoComplete="new-password" className={`form-control ${touched.confirm_password && errors.confirm_password ? 'error' : ''}`} />
                  <span className="fas fa-eye input-icon pointer" id="confirm_password_icon" onClick={() => togglePassword()}/>
                  <ErrorMessage name="confirm_password">
                    {message => <span className="form-error"><i className="fas fa-warning"/> {message}</span>}
                  </ErrorMessage>
                </div>

                <Field type="hidden" name="email" autoComplete="email" />
                <button type="submit" className="button" disabled={!isValid} 
                  onClick={() => setFieldValue('email', emailRef.current)}
                >Cambiar contraseña</button>
              </Form>
            }
          </Formik>
        </section>
      </div>
    </main>
  )
}

Password.propTypes = {
  resetPassword: PropTypes.func.isRequired
}

export default connect(null, { resetPassword, getResetPassword })(Password);
