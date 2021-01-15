import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import { getAccountsInit, getSuppliersInit, createDebitInit } from "../../store/actions";

import DebitForm from "../../components/private/payments/DebitForm";

const AccountPayment = (props) => {
  const { getAccountsInit, getSuppliersInit, createDebitInit, currencies } = props;

  useEffect(() => {
    getAccountsInit();
    getSuppliersInit();
  }, [getAccountsInit, getSuppliersInit]);

  return (
    <main className='main-pago main-user__dash'>
      <section className='main-pago__section'>
        <img src={`${process.env.PUBLIC_URL}/img/main-logo.png`} className='main-user__dash__logo' alt='logo Pago Insibs' />
        <h1 className='main-pago__section__title'>
          <Link to='/dashboard' className='back-title'>
            <span className='fas fa-arrow-left mr-3' />
          </Link>
          Domicilia tus productos y servicios.
        </h1>
        <p className='main-pago__section__subtitle'>Facilita los pagos de tus productos y servicios con nuestro servicio de domiciliación bancaria.</p>

        <DebitForm currencies={currencies} createDebit={createDebitInit} />
      </section>
    </main>
  );
};

const mapStateToProps = (state) => ({
  currencies: state.Banks.currencies,
});

export default connect(mapStateToProps, { getAccountsInit, getSuppliersInit, createDebitInit })(AccountPayment);
