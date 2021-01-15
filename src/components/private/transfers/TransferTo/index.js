import React, { useEffect } from "react";
import PropTypes from "prop-types";
import TransferForm from "./form";
import { Link } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import { getAccounts } from "../../../../store/actions/accounts";

const TransferTo = ({ getAccounts }) => {
  useEffect(() => {
    getAccounts();
  }, [getAccounts]);

  return (
    <main className="main-pago main-user__dash">
      <section className="main-pago__section">
        <img src={`${process.env.PUBLIC_URL}/img/main-logo.png`} className="main-user__dash__logo" alt="logo Pago Insibs" />
        <h1 className="main-pago__section__title">
          <Link to="/transfers" className="back-title">
            <span className="fas fa-arrow-left mr-3"></span>
          </Link>{" "}
          Envía dinero a terceros
        </h1>
        <p className="main-pago__section__subtitle">
          Colocar el nombre de usuario del destinatario y selecciona de que cuenta quieres enviar tu dinero.
        </p>
        <TransferForm />
      </section>
    </main>
  );
};

getAccounts.propTypes = {
  getAccounts: PropTypes.func.isRequired,
};

export default connect(null, { getAccounts })(TransferTo);
