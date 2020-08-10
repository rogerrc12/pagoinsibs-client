import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RequestForm from './form/RequestForm';
import Loading from '../../../layout/Loading';
// REDUX
import { connect } from 'react-redux';

const RequestTransfer = ({ loading }) => {
  return (
    <main className="main-pago main-user__dash">
      { loading && <Loading /> }
      <section className="main-pago__section">
        <img src="img/main-logo.png" className="main-user__dash__logo" alt="logo Pago Insibs" />
        <h1 className="main-pago__section__title">
          <Link to="/transfers" className="back-title"><span className="fas fa-arrow-left mr-3"></span></Link>Cobra dinero a terceros
        </h1>
        <p className="main-pago__section__subtitle">Ingresa el correo de la persona a quien deseas enviarle la solicitud.</p>
      </section>
      <RequestForm />
    </main>
  )
}

const mapStateToProps = state => {
  return {
    loading: state.transactions.loading
  }
}

RequestTransfer.propTypes = {
  loading: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(RequestTransfer);