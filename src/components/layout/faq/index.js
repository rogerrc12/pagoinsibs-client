import React from 'react';
import Tabs from './tabs';
import { Link } from 'react-router-dom';

const Faq = () => {

  return (
    <main className="main-section">
      <article className="main-content main-faq o-hidden">
        <div className="container">
          <h1>Centro de ayuda</h1>
          <p>Encuentra respuestas en nuestras preguntas frecuentes.</p>
        </div>

        <div className="w-50 h-50 position-absolute blob-container">
          <div className="blob3"></div>
        </div>
      </article>
      <article className="faq-section">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h3 className="mb-4 text-center text-md-left">Preguntas frecuentes</h3>
              <Tabs />
            </div>
            <div className="col-md-4">
              <h3 className="mb-4 text-center text-md-left">Aún sin respuestas?</h3>
              <div className="card contact-card">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <h5>Escríbenos</h5>
                    <a href="mailto:contacto@pagos.insibs.com">contacto@pagos.insibs.com</a>
                  </li>
                  <li className="list-group-item">
                    <h5>Llámanos</h5>
                    <a href="tel:+5805004674270">+58 0500 467 4270</a>
                  </li>
                  <li className="list-group-item">
                    <h5>Visítanos</h5>
                    <Link to="/contacto">ver el mapa</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}

export default Faq;
