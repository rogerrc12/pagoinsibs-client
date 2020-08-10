import React, { useState } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
// REDUX
import { connect } from 'react-redux';
import { setPasswordReset } from '../../actions/auth';

const formSchema = Yup.object().shape({
  email: Yup.string().required('Debes colocar un correo.').email('El correo ingresado es inválido.')
});

const Reset = ({ setPasswordReset }) => {
  const [sent, setSent] = useState(false);

  return (
    <main className="form-content main-content">
      <div className="container">
        <section className="form-section">
          <h1>Recupera <br/> tu contraseña</h1>
          <p>Te enviaremos un correo con la información para recuperarla.</p>
          <Formik initialValues={{ email: '' }} validationSchema={formSchema}
            onSubmit={async values => {
              const result = await setPasswordReset(values);
              if (result) setSent(result);
            }}
          >
            {({ isValid, errors, touched }) => 
              <Form className="reset-form">
                <div className="form-group">
                  <label htmlFor="email">Correo electrónico</label>
                  <Field type="email" id="email" name="email" autoComplete="username" className={`form-control ${touched.email && errors.email ? 'error' : ''}`} />
                  <ErrorMessage name="email">
                    {message => <span className="form-error"><i className="fas fa-warning"/> {message}</span>}
                  </ErrorMessage>
                </div>

                <button type="submit" className="button" disabled={!isValid || sent}>
                  {
                    !sent ? 'Recuperar contraseña' : '¡Enviado!'
                  }
                </button>
              </Form>
            }
          </Formik>
        </section>
      </div>
    </main>
  )
}

export default connect(null, { setPasswordReset })(Reset);
