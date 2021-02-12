import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { Skeleton } from "@material-ui/lab";
// REDUX
import { connect } from "react-redux";
import { getPaymentDetailsInit } from "../../store/actions";
import { sendPaymentDetails } from "../../store/actions/detail";
import { setCurrency } from "../../helpers/helpers";

const PaymentDetail = ({ getPaymentDetailsInit, details, match, sendPaymentDetails, isLoading }) => {
  const { id } = match.params;

  useEffect(() => {
    getPaymentDetailsInit(id);
  }, [getPaymentDetailsInit, id]);

  // detail sent status
  const [sent, setSent] = useState(false);

  const detailsList = (
    <>
      <li className='detail-item detail-status'>
        <span className={`detail-right status ${details.status && details.status.name}`}>{details.status && details.status.name}</span>
      </li>
      <li className='detail-item'>
        <span className='detail-left'>Forma de pago:</span>
        <span className='detail-right'>{details.paymentType}</span>
      </li>
      {details.productId && (
        <li className='detail-item'>
          <span className='detail-left'>Producto a pagar:</span>
          <span className='detail-right'>{details.product.name}</span>
        </li>
      )}
      {details.paymentType === "account" && (
        <>
          <li className='detail-item'>
            <span className='detail-left'>Banco debitado:</span>
            <span className='detail-right'>{details.bankName}</span>
          </li>
          <li className='detail-item'>
            <span className='detail-left'>Número de cuenta:</span>
            <span className='detail-right'>termina en {details.accNumber.substring(16, 20)}</span>
          </li>
          <li className='detail-item'>
            <span className='detail-left'>Tipo de cuenta:</span>
            <span className='detail-right'>{details.accType}</span>
          </li>
        </>
      )}
      {details.paymentType === "card" && (
        <li className='detail-item'>
          <span className='detail-left'>Tarjeta</span>
          <span className='detail-right'>{details.cardBrand + " " + details.cardLastNumbers}</span>
        </li>
      )}

      {details.paymentType === "paypal" && (
        <li className='detail-item'>
          <span className='detail-left'>Correo de pago:</span>
          <span className='detail-right'>{details.paypalEmail}</span>
        </li>
      )}
      {details.paypalPaymentId && (
        <li className='detail-item'>
          <span className='detail-left'>ID de pago de:</span>
          <span className='detail-right'>{details.paypalPaymentId}</span>
        </li>
      )}

      {details.zelleFileUrl && (
        <li className='detail-item'>
          <span className='detail-left'>Captura de pago:</span>
          <div className='detail-right'>
            <a href={details.zelleFileUrl} target='_blank' rel='noopener noreferrer'>
              <img src={details.zelleFileUrl} alt='Captura de pago zelle' />
            </a>
          </div>
        </li>
      )}
    </>
  );

  return (
    <main className='dash-main main-user__dash'>
      <section className='detail-section'>
        <DetailHeader details={details} skeleton={isLoading} />
        <article className='details-transaction'>
          <ul className='detail-list'>{details.paymentType && detailsList}</ul>
        </article>
        <footer className='detail-footer'>
          <button
            type='submit'
            className='button'
            disabled={sent}
            onClick={async () => {
              const detailSent = await sendPaymentDetails(id);
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
    ) : (
      <>
        <span className='detail-header__date'>
          <Moment format='DD MMM YYYY, h:mm a'>{details.createdAt}</Moment>
        </span>
        <h2>Pago #{details.id}</h2>
        <span className='detail-header__price'>
          {setCurrency(details.amount)} {details.currency && details.currency.symbol}
        </span>
        <p>{details.description}</p>
        <h3>{details.supplier && details.supplier.name}</h3>
        <p>{details.supplier && details.supplier.rif}</p>
      </>
    )}
  </header>
);

const mapStateToProps = (state) => {
  return {
    details: state.Payments.paymentDetails,
    isLoading: state.Payments.isLoading,
  };
};

PropTypes.PaymentDetail = {
  details: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { getPaymentDetailsInit, sendPaymentDetails })(PaymentDetail);
