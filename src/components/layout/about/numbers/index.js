import React from 'react'

const Numbers = () => {
  return (
    <article className="about-numbers main-content">
      <div className="container">
        <h2>Siempre hemos tenido el respaldo</h2>
        <p>Años de experiencia en cobranza y sistemas de domiciliación bancaria.</p>
        <div className="row">
          <div className="col-md-4 my-mb-0 my-3">
            <div className="card-number card card-body">
              <span className="number">20+</span>
              <p>Años ganándonos el respeto de nuestros clientes y aliados.</p>
            </div>
          </div>
          <div className="col-md-4 my-mb-0 my-3">
            <div className="card-number card card-body">
              <span className="number">24/7</span>
              <p>Contamos con un equipo disponible las 24 horas del dia todos los días.</p>
            </div>
          </div>
          <div className="col-md-4 my-mb-0 my-3">
            <div className="card-number card card-body">
              <span className="number">50k+</span>
              <p>Clientes que cuentan con nuestra seguridad y respaldo.</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Numbers;
