import React from "react";
import PropTypes from "prop-types";
import { Link, Redirect, withRouter } from "react-router-dom";
import { Formik, Form } from "formik";
import GoogleLogin from "react-google-login";
import { loginValidation } from "../../helpers/validations";
// Redux
import { connect } from "react-redux";
import { loginUser, setGoogleLogin } from "../../store/actions";

import Input from "../../components/UI/FormItems/Input";
import Button from "../../components/UI/Button";
import Alert from "../../components/UI/Alert";

const Login = ({ loginUser, auth, setGoogleLogin, history, location }) => {
  let from;

  const { isAuthenticated, isLoading, error } = auth;

  location.state ? (from = location.state.from) : (from = { pathname: "/dashboard" });

  // Redirect if
  if (isAuthenticated) return <Redirect to={from} />;

  const onSubmit = (values) => loginUser(values);

  return (
    <main className='form-content main-content'>
      <div className='container'>
        <section className='form-section'>
          <h1>
            Inicia sesión <br /> a Pago Insibs
          </h1>
          <Formik initialValues={{ email: "", password: "" }} validationSchema={loginValidation} onSubmit={onSubmit}>
            {({ isValid, errors, touched }) => (
              <Form className='signin-form'>
                <Input label='Correo electrónico' type='email' name='email' autoComplete='username' placeholder='johndoe@mail.com' error={errors.email} touched={touched.email} />

                <Input
                  type='password'
                  name='password'
                  id='password'
                  label='Contraseña'
                  autoComplete='password'
                  groupClass='icon-group'
                  error={errors.password}
                  touched={touched.password}
                />

                <Link to='/reset' className='pull-right'>
                  ¿Olvidó su Contraseña?
                </Link>

                <Alert error={error} />

                <div className='sign-in__submit clearfix'>
                  <Button className={isLoading ? "running" : ""} disabled={!isValid || isLoading} type='submit'>
                    Iniciar Sesión
                  </Button>
                  <GoogleLogin
                    clientId='861692233053-phk2vconc2pau8fpgc1a255aje20kslk.apps.googleusercontent.com'
                    buttonText='Conéctate con google'
                    onSuccess={(res) => setGoogleLogin(res, history)}
                    onFailure={(res) => setGoogleLogin(res, history)}
                    render={(props) => (
                      <button onClick={props.onClick} className='button google-button' disabled={props.disabled}>
                        <i className='fab fa-google mr-2'></i> Acceder con google
                      </button>
                    )}
                    cookiePolicy={"single_host_origin"}
                  />
                </div>

                <div className='register-login__toggle'>
                  No posees una cuenta? <Link to='/registro'>Regístrate aquí</Link>
                </div>
              </Form>
            )}
          </Formik>
        </section>
      </div>
    </main>
  );
};

Login.propTypes = {
  auth: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    auth: state.Auth,
  };
};

export default connect(mapStateToProps, { loginUser, setGoogleLogin })(withRouter(Login));
