import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Features from './features';
import Banks from './banks';
import { Fade } from 'react-reveal';

// REDUX
import { connect } from 'react-redux';

const Landing = ({ authenticated }) => {

  if (authenticated) return <Redirect to="/dashboard" />

  return (
    <main className="main-section">
      <article className="main-content o-hidden">
        <div className="container">
          <div className="row">
            
            <div className="col-md-6 main-content__section main-content__info">
              <Fade left delay={500} distance="50px">
                <h1>Todos tus pagos en un solo lugar.</h1>
              </Fade>
              <p>Ahora podrás realizar todos tus pagos de una forma rápida y sencilla.</p>
              <Link to="/registro" className="button">Registrarse</Link>
            </div>

            <Fade up delay={1000} distance="100px">
              <div className="col-md-6 main-content__section">
                <img src="img/phones/main-phone.png" alt="Pago Insibs App"/>
              </div>
            </Fade>

          </div>
        </div>

        <div className="w-50 h-50 position-absolute blob-container">
          <div className="blob"></div>
        </div>
      </article>

      <article className="reviews">
        <div className="container">
          <div className="row">

            <Fade big>
              <div className="col-md-4">
                <span className="fas fa-hands"></span>
                <p>+ de 25 años en sistema de cobranza y domiciliación bancaria.</p>
              </div>
            </Fade>

            <Fade big delay={400}>
              <div className="col-md-4">
                <span className="fas fa-hands"></span>
                <p>Convenios con los mejores bancos de pais</p>
              </div>
            </Fade>

            <Fade big delay={800}>
              <div className="col-md-4">
                <span className="fas fa-hands"></span>
                <p>Reconocimientos honoríficos en el campo de las finanzas.</p>
              </div>
            </Fade>

          </div>
        </div>
      </article>

      <Features />
      <Banks />
    </main>
  )
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(Landing);
