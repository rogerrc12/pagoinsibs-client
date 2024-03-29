import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect, withRouter } from "react-router-dom";
import { Formik, Form } from "formik";
import GoogleLogin from "react-google-login";
import { RegisterValues } from "../../../helpers/formValues";
// HELPERS
import { userSignupValidation } from "../../../helpers/validations";
// REDUX
import { connect } from "react-redux";
import { startUserRegistration, completeUserRegistration, setGoogleLogin } from "../../../store/actions";

import RegisterDetails from "./RegisterDetails";
import AccountDetails from "./AccountDetails";
import Button from "../../../components/UI/Button";
import Alert from "../../../components/UI/Alert";

const pages = (props) => [<RegisterDetails {...props} />, <AccountDetails {...props} />];

const Register = ({ auth: { isAuthenticated, isLoading, user, error }, startUserRegistration, completeUserRegistration, setGoogleLogin, history }) => {
  // steps of form
  const [step, setStep] = useState(0);
  const nextPage = () => setStep((prevState) => prevState + 1);
  const prevPage = () => setStep((prevState) => (prevState !== 0 ? prevState - 1 : 0));

  if (isAuthenticated) return <Redirect to="/dashboard" />;

  const onContinue = (values) => startUserRegistration(values, nextPage),
    onSubmit = (values) => completeUserRegistration(values);

  return (
    <main className="form-content main-content">
      <div className="container">
        <section className="form-section">
          <h1>Crea tu cuenta</h1>
          <p>
            ¡Poder realizar tus pagos, <br /> jamás había sido tan fácil!
          </p>

          <Formik initialValues={RegisterValues(user)} validationSchema={userSignupValidation} enableReinitialize onSubmit={onSubmit}>
            {({ values, errors, isValid, touched }) => (
              <Form className="signup-form">
                <header className="steps-form">
                  <p className={`step__form step-1 ${step === 0 && "step-active"}`}>
                    <span className="step-number">1</span>
                    <span className="step-string">Registro</span>
                  </p>
                  <p className={`step__form step-2 ${step === 1 && "step-active"}`}>
                    <span className="step-number">2</span>
                    <span className="step-string">Datos de usuario</span>
                  </p>
                </header>
                <div className="signup-form__container">
                  {pages({ values, errors, touched })[step]}
                  <Alert error={error} />
                  {step === pages().length - 1 ? (
                    <div className="continue-form">
                      <Button className={isLoading ? "running" : ""} disabled={!isValid || isLoading} type="submit">
                        Registrarse
                      </Button>
                      <button type="button" className="button previous-btn" onClick={prevPage}>
                        ir atrás
                      </button>
                    </div>
                  ) : (
                    <>
                      <Button
                        className={isLoading ? "running" : ""}
                        onClick={() => onContinue(values)}
                        disabled={!values.first_name || !values.last_name || !values.email || errors.email || !values.terms || isLoading}
                      >
                        Continuar
                      </Button>
                      <GoogleLogin
                        clientId="861692233053-phk2vconc2pau8fpgc1a255aje20kslk.apps.googleusercontent.com"
                        buttonText="Conéctate con google"
                        onSuccess={(res) => setGoogleLogin(res, history)}
                        onFailure={(res) => setGoogleLogin(res, history)}
                        render={(props) => (
                          <button onClick={props.onClick} className="button google-button" disabled={props.disabled}>
                            <i className="fab fa-google mr-2"></i> Acceder con google
                          </button>
                        )}
                        cookiePolicy={"single_host_origin"}
                      />
                      <div className="register-login__toggle">
                        ¿Ya posees una cuenta? <Link to="/login">Inicia Sesión aquí</Link>
                      </div>
                    </>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </section>
      </div>
    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.Auth,
  };
};

Register.propTypes = {
  auth: PropTypes.object,
};

export default connect(mapStateToProps, { startUserRegistration, completeUserRegistration, setGoogleLogin })(withRouter(Register));
