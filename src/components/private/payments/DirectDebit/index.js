import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DiretDebitForm from './form';
// REDUX
import { connect } from 'react-redux';
import { getAccounts } from '../../../../actions/accounts';

const DirectDebit = ({ getAccounts }) => {
  useEffect(() => {
    getAccounts();
  }, [getAccounts])
  
  return (
    <main className="main-pago main-user__dash">
      <section className="main-pago__section">
        <img src={`${process.env.PUBLIC_URL}/img/main-logo.png`} className="main-user__dash__logo" alt="logo Pago Insibs" />
        <h1 className="main-pago__section__title">
          <Link to="/payments" className="back-title"><span className="fas fa-arrow-left mr-3"></span></Link> Haz tus pagos de forma automática
        </h1>
        <p className="main-pago__section__subtitle">Selecciona el comercio, escribe el monto junto con tu forma de pago y escoge tu cuenta bancaria.</p>
        <DiretDebitForm />
      </section>
    </main>
  )
}

DirectDebit.propTypes = {
  getAccounts: PropTypes.func.isRequired
}

export default connect(null, { getAccounts })(DirectDebit);