import React from 'react';
import Features from './features';
import Faq from './faq';
import Zoom from 'react-reveal/Zoom';

const Services = () => {
  return (
    <main className="main-section">
      <article className="main-content main-services o-hidden">
        <div className="container">
          <Zoom delay={300} duration={1800}>
            <h1>En pago INSIBS puedes realizar las operaciones que quieras</h1>
          </Zoom>
          <p>Solo debes contar con internet y una cuenta bancaria.</p>
        </div>

        <div className="w-50 h-50 position-absolute blob-container">
          <div className="blob2"></div>
        </div>
      </article>
      <Features />
      <Faq />
    </main>
  )
}

export default Services;
