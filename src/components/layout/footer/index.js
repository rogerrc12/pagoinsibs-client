import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="main-footer">

      <div className="main-footer__logo">
        <img src={process.env.PUBLIC_URL + '/img/logo-blanco.png'} alt="Pago Insibs logo" />
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-4 md-my-0 my-3">
            <h5>Empresa</h5>
            <ul className="main-footer__nav__list">
              <li><Link to="/acerca">Acerca de INSIBS</Link></li>
              <li><Link to="/servicios">Servicios</Link></li>
            </ul>
          </div>
          <div className="col-md-4 md-my-0 my-3">
            <h5>Ayuda y soporte</h5>
            <ul className="main-footer__nav__list">
              <li><Link to="/ayuda">Preguntas frecuentes</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </div>
          <div className="col-md-4 md-my-0 my-3">
            <h5>Recursos</h5>
            <ul className="main-footer__nav__list">
              <li><Link to="/privacy-policy">Política de privacidad</Link></li>
              <li><Link to="/terms-conditions">Términos y condiciones</Link></li>
            </ul>
          </div>
        </div>
        <div className="main-footer__copy">
          <p className="main-footer__text">&copy; INSIBS C.A. todos los derechos reservados</p>
        </div>
      </div>

    </footer>
  )
}

export default Footer;
