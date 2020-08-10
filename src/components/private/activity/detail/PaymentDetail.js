import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import { Skeleton } from '@material-ui/lab';
// REDUX
import { connect } from 'react-redux';
import { getPayment } from '../../../../actions/payments';
import { sendPaymentDetails } from '../../../../actions/detail';
import {setCurrency} from "../../../../helpers/helpers";

const PaymentDetail = withRouter(({ getPayment, detail, match, sendPaymentDetails, skeleton }) => {
  
  const { type, id } = match.params;

  useEffect(() => {
    getPayment(type, id);
  }, [getPayment, id, type]);

  // detail sent status
  const [sent, setSent] = useState(false);
  
  const detailList = () => (
    detail.accNumber ?
      <>
        <li className="detail-item detail-status">
          <span className={`detail-right status ${detail.status.name}`}>
            {detail.status.name}
          </span>
        </li>
        <li className="detail-item">
          <span className="detail-left">Banco debitado:</span>
          <span className="detail-right">{detail.bankName}</span>
        </li>
        <li className="detail-item">
          <span className="detail-left">Número de cuenta:</span>
          <span className="detail-right">termina en {detail.accNumber.substring(16,20)}</span>
        </li>
        <li className="detail-item">
          <span className="detail-left">Tipo de cuenta:</span>
          <span className="detail-right">{detail.accType}</span>
        </li>
      </>
      : detail.cardBrand ?
        <>
          <li className="detail-item detail-status">
          <span className={`detail-right status ${detail.status.name}`}>
            {detail.status.name}
          </span>
          </li>
          <li className="detail-item">
            <span className="detail-left">Tarjeta</span>
            <span className="detail-right">{detail.cardBrand + ' ' + detail.cardLastNumbers}</span>
          </li>
        </> : null
  );

  return (
    <main className="dash-main main-user__dash">
      <section className="detail-section">
        <DetailHeader details={detail} skeleton={skeleton} />
        <article className="details-transaction">
          <ul className="detail-list">
            {detailList()}
          </ul>
        </article>
        <footer className="detail-footer">
          <button type="submit" className="button" disabled={sent}
            onClick={async () => {
              const detailSent = await sendPaymentDetails(type, id);
              if (detailSent) setSent(detailSent);
            }}
          >
            {sent ? '¡Enviado!' : 'Enviar detalle a mi correo'}
          </button>
        </footer>
      </section>
    </main>
  )
});

const DetailHeader = ({details, skeleton}) => (
  <header className="detail-header">
    {
      skeleton ?
        <div style={{ textAlign: 'center' }}>
          <Skeleton animation="wave" width={200} height={30} style={{ marginBottom: '1.5rem', textAlign: 'left' }} />
          <Skeleton animation="wave" width={250} height={50} style={{ margin: '0 auto' }} />
          <Skeleton animation="wave" width={100} height={30} style={{ margin: '0 auto' }} />
          <Skeleton animation="wave" width={130} height={30} style={{ margin: '0 auto 1.5rem' }} />
        </div> :
        <>
          <span className="detail-header__date">
            <Moment format="DD MMM YYYY, h:mm a">{details.createdAt}</Moment>
          </span>
          <h2>Pago #{details.id}</h2>
          <span className="detail-header__price">
          {setCurrency(details.amount)} <span>Bs.</span>
          </span>
          <p>{details.description}</p>
          <h3>{details.supplier.name}</h3>
          <p>{details.supplier.rif}</p>
        </>
    }
  </header>
)

const mapStateToProps = state => {
  return {
    detail: state.payments.paymentDetails,
    skeleton: state.loading.skeleton
  }
}

PaymentDetail.propTypes = {
  getPayment: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { getPayment, sendPaymentDetails })(PaymentDetail);
