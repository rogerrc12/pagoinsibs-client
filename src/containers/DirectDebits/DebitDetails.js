import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { Skeleton } from "@material-ui/lab";
import { setCurrency } from "../../helpers/helpers";
// REDUX
import { connect } from "react-redux";
import { getDebitDetailsInit } from "../../store/actions";
import { sendDebitDetails } from "../../store/actions/detail";

import DebitTabs from "../../components/private/activity/debitTabs";

const DebitDetail = ({ getDebitDetailsInit, details, match, sendDebitDetails, isLoading }) => {
  const { id } = match.params;

  useEffect(() => {
    getDebitDetailsInit(id);
  }, [getDebitDetailsInit, id]);

  // detail sent status
  const [sent, setSent] = useState(false);

  return (
    <main className='dash-main main-user__dash'>
      <section className='detail-section'>
        <DetailHeader details={details.details} skeleton={isLoading} />
        <article className='details-transaction'>
          <DebitTabs detail={details} />
        </article>
        <footer className='detail-footer'>
          <button
            type='button'
            className='button'
            disabled={sent}
            onClick={async () => {
              const detailSent = await sendDebitDetails(id);
              if (detailSent) setSent(detailSent);
            }}
          >
            {sent ? "¡Enviado!" : "Enviar detalle a mi correo"}
          </button>
        </footer>
      </section>
    </main>
  );
};

const DetailHeader = ({ details, skeleton }) => (
  <header className='detail-header'>
    {skeleton ? (
      <div style={{ textAlign: "center" }}>
        <Skeleton animation='wave' width={200} height={30} style={{ marginBottom: "1.5rem", textAlign: "left" }} />
        <Skeleton animation='wave' width={250} height={50} style={{ margin: "0 auto" }} />
        <Skeleton animation='wave' width={100} height={30} style={{ margin: "0 auto" }} />
        <Skeleton animation='wave' width={130} height={30} style={{ margin: "0 auto 1.5rem" }} />
      </div>
    ) : details ? (
      <>
        <span className='detail-header__date'>
          <Moment format='DD MMM YYYY, h:mm a'>{details.createdAt}</Moment>
        </span>
        <h2>Domiciliación #{details.id}</h2>
        <span className='detail-header__price'>{setCurrency(details.feeTotalAmount) + " " + details.currency.symbol}</span>
        <p>{details.description}</p>
        <h3>{details.supplier.name}</h3>
        <p>{details.supplier.rif}</p>
      </>
    ) : null}
  </header>
);

const mapStateToProps = (state) => {
  return {
    details: state.Payments.debitDetails,
    isLoading: state.Payments.isLoading,
  };
};

DebitDetail.propTypes = {
  details: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getDebitDetailsInit, sendDebitDetails })(DebitDetail);
