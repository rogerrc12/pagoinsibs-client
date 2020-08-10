import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Formik, Form } from 'formik';
import GoogleLogin from 'react-google-login';
import RegisterDetails from './RegisterDetails';
import AccountDetails from './AccountDetails';
import * as Yup from 'yup';
// REDUX
import { connect } from 'react-redux';
import { registerUser, setGoogleLogin } from '../../../actions/auth';

const formSchema = Yup.object().shape({
  first_name: Yup.string().required('Introduce tu primer nombre.'),
  last_name: Yup.string().required('Introduce tu primer apellido.'),
  ci_type: Yup.string().required('Selecciona un tipo de cédula.'),
  ci_number: Yup.string().required('Introduce tu cédula de identidad.').matches(/^[0-9]{5,8}$/i, 'Cédula incorrecta.' +
    ' Verifica el largo.').test('unique-cedula', 'Ya existe una cuenta con esta cédula. Si ya estás' +
    ' registrado inicia sesión.', 
    async cedula => {
      if (typeof cedula === 'undefined') return null;
      const res = await axios.post('/api/validation/cedula', { cedula }, {headers: {'Content-Type':'application/json'}});
      return !res.data
    }
  ),
  email: Yup.string().required('Introduce un correo electrónico.').email('Formato de correo inválido.').test('unique-email', 'Ya existe una cuenta con este correo. Si ya estás registrado inicia sesión.', 
    async email => {
      if (typeof email === 'undefined') return null;
      const res = await axios.post('/api/validation/email', { email }, {headers: {'Content-Type':'application/json'}});
      return !res.data
    }
  ),
  username: Yup.string().required('Introduce un nombre de usuario.').matches(/^(?=.*\d)(?=.*[a-zA-Z])[A-Za-z\d]{4,12}$/i, 'Debe contener al menos 1 letra y 1 número. Máximo 12 caracteres.').test('unique-payId', 'Este nombre de usuario se ya existe, por favor utilice otro.',
    async pay_id => {
      if (typeof pay_id === 'undefined') return null;
      const res = await axios.post('/api/validation/username', { pay_id }, {headers: {'Content-Type':'application/json'}});
      return !res.data
    }
  ),
  password: Yup.string().required('Introduce una contraseña.').matches(/^(?=.*\d)(?=.*[a-zA-Z])[A-Za-z\d!@#$%^&*()_\-+=]{6,}$/, 'Debe contener al menos 1 letras y 1 número.'),
  confirm_password: Yup.string().required('Debes confirmar la contraseña.')
    .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden.'),
  terms: Yup.bool().required('Debes aceptar los términos y condiciones.')
});

const pages = (values, errors, touched) => [<RegisterDetails values={values} errors={errors} touched={touched} />, <AccountDetails errors={errors} touched={touched} />];

const Register = ({ auth: { isAuthenticated, user }, registerUser, setGoogleLogin, history }) => {
  
  // steps of form
  const [step, setStep] = useState(0);
  const nextPage = () => setStep(prevState => prevState + 1);
  const prevPage = () => setStep(prevState => {
    if (prevState !== 0) {
      return prevState - 1;
    } else {
      return 0;
    }
  });

  // initialValues
  const initialValues = {
    first_name: user.given_name || '', last_name: user.family_name || '', ci_type: 'V', ci_number: '', 
    email: user.email || '', username: '', password: '', confirm_password: '', terms: user.email_verified ? true : false
  }

  if (isAuthenticated) return <Redirect to="/dashboard" />

  return (
    <main className="form-content main-content">
      <div className="container">
        <section className="form-section">
          <h1>Crea tu cuenta</h1>
          <p>¡Poder realizar tus pagos, <br /> jamás había sido tan fácil!</p>

          <Formik initialValues={initialValues} validationSchema={formSchema} enableReinitialize={true}
            onSubmit={values => registerUser(values)}
          >
            {({ values, errors, touched }) =>
              <Form className="signup-form">
                <header className="steps-form">
                  <p className={`step__form step-1 ${step === 0 && 'step-active'}`}>
                  <span className="step-number">1</span> 
                    <span className="step-string">Registro</span>
                  </p>
                  <p className={`step__form step-2 ${step === 1 && 'step-active'}`}>
                    <span className="step-number">2</span> 
                    <span className="step-string">Datos de usuario</span>
                  </p>
                </header>
                <div className="signup-form__container">
                  {pages(values, errors, touched)[step]}
                  {
                    step === pages().length - 1
                    ?
                    <div className="continue-form">
                      <button className="button submit-btn" type="submit">Registrarse</button>
                      <button type="button" className="previous-btn button" onClick={prevPage}>ir atrás</button>
                    </div>
                    :
                    <>
                      <button className="button" type="button" onClick={nextPage}
                        disabled={
                          !values.first_name || !values.last_name || !values.email || errors.email || !values.terms ? true : false
                        }
                      >
                        Continuar
                      </button>
                      <GoogleLogin
                        clientId="861692233053-phk2vconc2pau8fpgc1a255aje20kslk.apps.googleusercontent.com"
                        buttonText="Conéctate con google"
                        onSuccess={res => setGoogleLogin(res, history)}
                        onFailure={res => setGoogleLogin(res, history)}
                        render={props => (
                          <button onClick={props.onClick} className="button google-button" disabled={props.disabled}><i className="fab fa-google mr-2"></i> Acceder con google</button>
                        )}
                        cookiePolicy={'single_host_origin'}
                      />
                      <div className="register-login__toggle">
                        ¿Ya posees una cuenta? <Link to="/login">Inicia Sesión aquí</Link>
                      </div>
                    </>
                  }
                </div>
              </Form>
            }
          </Formik>
        </section>
      </div>
    </main>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object
}

export default withRouter(connect(mapStateToProps, { registerUser, setGoogleLogin })(Register));
