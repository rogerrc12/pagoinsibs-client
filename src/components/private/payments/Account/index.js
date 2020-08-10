import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import AccountForm from './form';
import { Link } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import { getAccounts } from '../../../../actions/accounts'

const PayTo = ({ getAccounts }) => {
  useEffect(() => {
    getAccounts();
  }, [getAccounts])

  return (
    <main className="main-pago main-user__dash">
      <section className="main-pago__section">

        <img src={`${process.env.PUBLIC_URL}/img/main-logo.png`} className="main-user__dash__logo" alt="logo Pago Insibs" />
        <h1 className="main-pago__section__title">
          <Link to="/payments" className="back-title"><span className="fas fa-arrow-left mr-3"></span></Link> Paga tus Productos y Servicios
        </h1>
        <p className="main-pago__section__subtitle">Paga los servicios o productos que desees solo usando tu cuenta bancaria.</p>
        <AccountForm />
      </section>

    </main>
  )
}

PayTo.propTypes = {
  getAccounts: PropTypes.func.isRequired
}

export default connect(null, { getAccounts })(PayTo);
