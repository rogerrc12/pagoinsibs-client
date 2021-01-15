import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import { getAccountsInit, getSuppliersInit, createPaymentInit } from "../../store/actions";

import PaymentForm from "../../components/private/payments/PaymentForm";

const AccountPayment = (props) => {
  const { getAccountsInit, getSuppliersInit, createPaymentInit, match, currencies } = props;

  const { paymentForm } = match.params;

  useEffect(() => {
    getAccountsInit();
    if (paymentForm === "company") getSuppliersInit();
  }, [getAccountsInit, getSuppliersInit, paymentForm]);

  return (
    <section className='main-pago__section'>
      <img src={`${process.env.PUBLIC_URL}/img/main-logo.png`} className='main-user__dash__logo' alt='logo Pago Insibs' />
      <h1 className='main-pago__section__title'>
        <Link to='/payments' className='back-title'>
          <span className='fas fa-arrow-left mr-3'></span>
        </Link>{" "}
        {paymentForm === "company" ? "Pagos a empresas" : "Paga tus productos y servicios"}
      </h1>
      <p className='main-pago__section__subtitle'>
        {paymentForm === "company"
          ? "Envia pagos destinados a cualquiera de nuestras empresas asociadas."
          : "Paga los servicios o productos que desees solo usando tu cuenta bancaria."}
      </p>

      <PaymentForm currencies={currencies} paymentForm={paymentForm} createPayment={createPaymentInit} />
    </section>
  );
};

const mapStateToProps = (state) => ({
  currencies: state.Banks.currencies,
});

export default connect(mapStateToProps, { createPaymentInit, getAccountsInit, getSuppliersInit })(AccountPayment);
