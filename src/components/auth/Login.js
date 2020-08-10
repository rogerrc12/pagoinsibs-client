import React from "react";
import PropTypes from "prop-types";
import { Link, Redirect, withRouter } from "react-router-dom";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import GoogleLogin from "react-google-login";
// Redux
import { connect } from "react-redux";
import { loginUser, setGoogleLogin } from "../../actions/auth";
// helpers
import { togglePassword } from "../../helpers/helpers";

const formSchema = Yup.object().shape({
  email: Yup.string().required("Debes colocar un email.").email("El email ingresado es inválido."),
  password: Yup.string().required("Debes colocar una contraseña."),
});

const Login = withRouter(({ loginUser, isAuthenticated, setGoogleLogin, history, location }) => {
  let from;

  if (location.state) {
    from = location.state.from;
  } else {
    from = { pathname: "/dashboard" };
  }

  // Redirect if
  if (isAuthenticated) {
    return <Redirect to={from} />;
  } else {
    return (
      <main className="form-content main-content">
        <div className="container">
          <section className="form-section">
            <h1>
              Inicia sesión <br /> a Pago Insibs
            </h1>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={formSchema}
              onSubmit={(values) => loginUser(values)}
            >
              {({ isValid, errors, touched }) => (
                <Form className="signin-form">
                  <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="username"
                      placeholder="johndoe@mail.com"
                      className={`form-control ${touched.email && errors.email ? "error" : ""}`}
                    />
                    <ErrorMessage name="email">
                      {(message) => (
                        <span className="form-error">
                          <i className="fas fa-warning" /> {message}
                        </span>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="form-group icon-group">
                    <label htmlFor="password">contraseña</label>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      autoComplete="current-password"
                      className={`form-control ${touched.password && errors.password ? "error" : ""}`}
                    />
                    <span className="fas fa-eye input-icon pointer" id="password-icon" onClick={togglePassword} />
                    <ErrorMessage name="password">
                      {(message) => (
                        <span className="form-error">
                          <i className="fas fa-warning" /> {message}
                        </span>
                      )}
                    </ErrorMessage>
                  </div>
                  <Link to="/reset" className="pull-right">
                    ¿Olvidó su Contraseña?
                  </Link>

                  <div className="sign-in__submit clearfix">
                    <button className="button" disabled={!isValid} type="submit">
                      Iniciar Sesión
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
                  </div>

                  <div className="register-login__toggle">
                    No posees una cuenta? <Link to="/registro">Regístrate aquí</Link>
                  </div>
                </Form>
              )}
            </Formik>
          </section>
        </div>
      </main>
    );
  }
});

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { loginUser, setGoogleLogin })(Login);
