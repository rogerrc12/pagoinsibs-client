import React from 'react'
import Fade from 'react-reveal/Fade';

const Features = () => {
  const root = process.env.PUBLIC_URL;

  return (
    <article className="services-features">
      <div className="container">
        <div className="row">
          <Fade bottom distance="50px">
            <div className="col-md-4">
              <img src={root + '/img/icons/transfers.svg'} className="service-icon" alt="Transferencias" />
              <h4>Transferencias</h4>
              <p>Realiza transferencias a otros usuarios directamente desde tu cuenta bancaria. Solo agrega una cuenta para enviar, escribe el nombre de usuario que recibirá y realiza la transferencia!</p>
            </div>
          </Fade>

          <Fade top distance="50px" delay={400}>
            <div className="col-md-4 mt-md-0 mt-3">
              <img src={root + '/img/icons/payments.svg'} className="service-icon" alt="Pagos" />
              <h4>Pagos a comercios</h4>
              <p>Paga cualquier producto y/o servicio que quieras a tus comercios favoritos. Busca el nombre del comercio a pagar, selecciona desde la lista y completa tu pago!</p>
            </div>
          </Fade>

          <Fade bottom distance="50px" delay={800}>
            <div className="col-md-4 mt-md-0 mt-3">
              <img src={root + '/img/icons/debits.svg'} className="service-icon" alt="Domiciliaciones" />
              <h4>Domiciliaciones</h4>
              <p>Domiciliar pagos nunca fue tan sencillo. Solo escoge la empresa y el producto a domiciliar, elige entre pagos fraccionados o indefinidos, selecciona la cuenta a debitar las cuotas y listo! </p>
            </div>
          </Fade>

        </div>
      </div>
    </article>
  )
}

export default Features;
