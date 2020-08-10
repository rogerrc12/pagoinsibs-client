import React from 'react';
import { Link } from 'react-router-dom';

const Steps = () => {
  return (
    <article className="about-steps main-content">
      <div className="container">
        <h2 className="text-center">¿Cómo funciona Pago INSIBS?</h2>
        <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6">
            <span className="step">paso 1</span>
            <h4>Registra tu perfil</h4>
            <p>Rellena todos los datos solicitados que aparecen en los campos del formulario. Verifica tu información y solo continua cuando estés seguro de que están correctos.</p>
            <Link to="/login">Comenzar ahora</Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <span className="step">paso 2</span>
            <h4>Agrega una cuenta</h4>
            <p>Agrega, guarda o modifica tus cuentas bancarias desde tu perfil para poder realizar pagos de forma automática y sencilla.</p>
          </div>
          <div className="col-md-6">
          </div>
        </div>
        <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6">
            <span className="step">paso 3</span>
            <h4>Realiza la operación que necesites</h4>
            <p>Una vez registrado tu perfil y tu cuenta bancaria podrás realizar pagos con tu cuenta, con tu tarjeta, transferencias e incluso domiciliaciones de forma sencilla.</p>
            <Link to="/login">Comenzar ahora</Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Steps;
