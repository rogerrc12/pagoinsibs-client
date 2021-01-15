import React, { useEffect, useRef } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { togglePassword } from "../../helpers/helpers";
// Redux
import { connect, useSelector } from "react-redux";
import { resetPassInit, checkPassResetToken } from "../../store/auth/actions";

const formSchema = Yup.object().shape({
  password: Yup.string()
    .required("Debes colocar una contraseña.")
    .matches(/^(?=.*\d)(?=.*[a-zA-Z])[A-Za-z\d!@#$%^&*()_\-+=]{6,}$/, "Debe contener al menos 1 latre y 1 número."),
  confirm_password: Yup.string()
    .required("Debes confirmar la contraseña.")
    .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden."),
});

const Password = ({ resetPassInit, checkPassResetToken, history, location }) => {
  const emailRef = useRef(null);

  const { resetEmail } = useSelector((state) => state.Auth);

  useEffect(() => {
    const querySearch = new URLSearchParams(location.search);
    const reset = querySearch.get("reset");
    const reset_token = querySearch.get("reset_token");
    checkPassResetToken(reset, reset_token);
  }, [checkPassResetToken, location]);

  useEffect(() => {
    if (resetEmail) emailRef.current = resetEmail;
  }, [resetEmail]);

  return (
    <main className='form-content main-content'>
      <div className='container'>
        <section className='form-section'>
          <h1>Coloca tu nueva contraseña</h1>
          <Formik initialValues={{ password: "", confirm_password: "", email: emailRef.current || "" }} validationSchema={formSchema} onSubmit={resetPassInit} enableReinitialize>
            {({ isValid, errors, touched }) => (
              <Form className='reset-form'>
                <div className='form-group icon-group'>
                  <label htmlFor='password'>Contraseña</label>
                  <Field
                    type='password'
                    id='password'
                    name='password'
                    autoComplete='new-password'
                    className={`form-control ${touched.password && errors.password ? "error" : ""}`}
                  />
                  <span className='fas fa-eye input-icon pointer' id='password_icon' onClick={togglePassword} />
                  <span className='form-msg'>
                    <i className='fas fa-info-circle' /> Al menos 6 caracteres.
                  </span>
                  <ErrorMessage name='password'>
                    {(message) => (
                      <span className='form-error'>
                        <i className='fas fa-warning' /> {message}
                      </span>
                    )}
                  </ErrorMessage>
                </div>
                <div className='form-group icon-group'>
                  <label htmlFor='confirm_password'>Confirmar contraseña</label>
                  <Field
                    type='password'
                    id='confirm_password'
                    name='confirm_password'
                    autoComplete='new-password'
                    className={`form-control ${touched.confirm_password && errors.confirm_password ? "error" : ""}`}
                  />
                  <span className='fas fa-eye input-icon pointer' id='confirm_password_icon' onClick={togglePassword} />
                  <ErrorMessage name='confirm_password'>
                    {(message) => (
                      <span className='form-error'>
                        <i className='fas fa-warning' /> {message}
                      </span>
                    )}
                  </ErrorMessage>
                </div>

                <Field type='hidden' name='email' autoComplete='email' />
                <button type='submit' className='button' disabled={!isValid}>
                  Cambiar contraseña
                </button>
              </Form>
            )}
          </Formik>
        </section>
      </div>
    </main>
  );
};

export default connect(null, { resetPassInit, checkPassResetToken })(Password);
