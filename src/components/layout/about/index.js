import React from 'react';
import Timeline from './timeline';
import Steps from './steps';
import Numbers from './numbers';
import Testimonials from './testimonials';

const About = () => {
  return (
    <main className="main-section">
      <article className="main-content main-about o-hidden">
        <div className="container">
          <h1>Pago INSIBS se encuentra en donde quieras y cuando quieras.</h1>
          <p>Solo debes contar con internet y una cuenta bancaria.</p>
        </div>

        <div className="w-50 h-50 position-absolute blob-container">
          <div className="blob"></div>
        </div>
      </article>
      <article className="about-story main-content">
        <div className="container text-center">
          <h2>Más de 20 años ayudandote en tus pagos</h2>
          <p>Seriedad, responsabilidad y compomiso son algunos de los valores que nos caracterizan.</p>
          <Timeline />
        </div>
      </article>
      <Numbers />
      <Steps />
      <Testimonials />
    </main>
  )
}

export default About;
