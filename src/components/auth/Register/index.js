import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect, withRouter } from "react-router-dom";
import { Formik, Form } from "formik";
import GoogleLogin from "react-google-login";
import RegisterDetails from "./RegisterDetails";
import AccountDetails from "./AccountDetails";
// HELPERS
import { userSignupValidation } from "../../../helpers/validations";
// REDUX
import { connect } from "react-redux";
import { registerUser, setGoogleLogin } from "../../../actions/auth";

const pages = (values, errors, touched) => [
  <RegisterDetails values={values} errors={errors} touched={touched} />,
  <AccountDetails errors={errors} touched={touched} />,
];

const Register = ({ auth: { isAuthenticated, user }, registerUser, setGoogleLogin, history }) => {
  // steps of form
  const [step, setStep] = useState(0);
  const nextPage = () => setStep((prevState) => prevState + 1);
  const prevPage = () =>
    setStep((prevState) => {
      if (prevState !== 0) {
        return prevState - 1;
      } else {
        return 0;
      }
    });

  // initialValues
  const initialValues = {
    first_name: user.given_name || "",
    last_name: user.family_name || "",
    ci_type: "V",
    ci_number: "",
    email: user.email || "",
    username: "",
    password: "",
    confirm_password: "",
    terms: user.email_verified ? true : false,
  };

  if (isAuthenticated) return <Redirect to="/dashboard" />;

  return (
    <main className="form-content main-content">
      <div className="container">
        <section className="form-section">
          <h1>Crea tu cuenta</h1>
          <p>
            ¡Poder realizar tus pagos, <br /> jamás había sido tan fácil!
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={userSignupValidation()}
            enableReinitialize={true}
            onSubmit={(values) => registerUser(values)}
          >
            {({ values, errors, touched }) => (
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
                  {pages(values, errors, touched)[step]}
                  {step === pages().length - 1 ? (
                    <div className="continue-form">
                      <button className="button submit-btn" type="submit">
                        Registrarse
                      </button>
                      <button type="button" className="previous-btn button" onClick={prevPage}>
                        ir atrás
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        className="button"
                        type="button"
                        onClick={nextPage}
                        disabled={
                          !values.first_name || !values.last_name || !values.email || errors.email || !values.terms
                            ? true
                            : false
                        }
                      >
                        Continuar
                      </button>
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
    auth: state.auth,
  };
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object,
};

export default withRouter(connect(mapStateToProps, { registerUser, setGoogleLogin })(Register));
