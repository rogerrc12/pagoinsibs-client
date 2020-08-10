import React from 'react';
import CreditCardForm from './form';
import { Link } from 'react-router-dom'
import Loading from '../../../layout/Loading';
// Redux
import { connect } from 'react-redux';

const CreditCard = ({ loading }) => {

  return (
    <main className="main-pago main-user__dash">
      <section className="main-pago__section">

        <img src={`${process.env.PUBLIC_URL}/img/main-logo.png`} className="main-user__dash__logo" alt="logo Pago Insibs" />
        <h1 className="main-pago__section__title">
          <Link to="/payments" className="back-title"><span className="fas fa-arrow-left mr-3"></span></Link>  Paga tus Productos y Servicios
        </h1>
        <p className="main-pago__section__subtitle">Paga los servicios  o productos que desees con tu tarjeta de credito.</p>
        <CreditCardForm />
      </section>

      {loading && <Loading />}
    </main>
  )
}

const mapStateToProps = state => {
  return {
    loading: state.transactions.loading
  }
}

export default connect(mapStateToProps)(CreditCard);
