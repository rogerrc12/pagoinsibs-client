import React from "react";
import PropTypes from "prop-types";
import creditCardType, { types as CardType } from "credit-card-type";
import { formatAmount } from "../../../../helpers/helpers";

import VisaIcon from "../../../../assets/icons/visa.svg";
import MasterIcon from "../../../../assets/icons/mastercard.svg";

import Checkbox from "../../../UI/FormItems/Checkbox";
import WrapperButtons from "../../../UI/FormItems/WrapperButtons";
// CONNECT
import { connect } from "react-redux";

const Confirm = ({ profile, accountInfo, values, isValid, prevPage, currencies }) => {
  const currencyDetails = currencies.find((currency) => currency.id === values.currencyId);

  return (
    <div className='form-confirmation'>
      <h2>Detalles del pago</h2>
      <p>Verifica todos los detalles antes de confirmar</p>
      <div className='form-details'>
        <span className='form-detail-left'>Empresa a Pagar:</span>
        <span className='form-detail-right'>{profile.name}</span>
      </div>
      <div className='form-details'>
        <span className='form-detail-left'>RIF:</span>
        <span className='form-detail-right'>{profile.rif}</span>
      </div>
      <div className='form-details'>
        <span className='form-detail-left'>Descripción:</span>
        <span className='form-detail-right'>{values.description}</span>
      </div>
      <div className='form-details'>
        <span className='form-detail-left'>Monto a pagar:</span>
        <span className='form-detail-right'>{formatAmount(values.amount) + " " + currencyDetails.symbol}</span>
      </div>
      <div className='form-details'>
        <span className='form-detail-left'>Tipo de pago:</span>
        <span className='form-detail-right'>
          {values.paymentType === "account" ? "Debito en cuenta" : values.paymentType === "card" ? "Tarjeta de crédito" : values.paymentType}
        </span>
      </div>
      <PaymentInfo values={values} accountInfo={accountInfo} />
      <Checkbox name='terms' label='Confirmo y acepto que los datos mostrados son correcto.' />
      <WrapperButtons type='button' disabled={!isValid} prevPage={prevPage} submitButton />
    </div>
  );
};

export const PaymentInfo = (props) => {
  const { values, accountInfo } = props;

  const visaCard = creditCardType(values.cardNumber.substring(0, 4)).find((card) => card.type === CardType.VISA);
  const masterCard = creditCardType(values.cardNumber.substring(0, 4)).find((card) => card.type === CardType.MASTERCARD);

  return values.paymentType === "account" ? (
    <div className='form-details'>
      <span className='form-detail-left'>Cuenta a debitar:</span>
      <span className='form-detail-right'>{accountInfo.bank.bankName.substring(0, 15) + " - Termina en " + accountInfo.accNumber.substring(15, 20)}</span>
    </div>
  ) : values.paymentType === "card" ? (
    <div className='form-details'>
      <span className='form-detail-left'>Detalles de la tarjeta:</span>
      <span className='form-detail-right'>
        {(visaCard || masterCard) && <img src={visaCard ? VisaIcon : masterCard ? MasterIcon : ""} alt='icono tarjeta' style={{ maxWidth: "3rem", marginRight: "8px" }} />}
        termina en {values.cardNumber.substring(values.cardNumber.length - 4, values.cardNumber.length)}
      </span>
    </div>
  ) : (
    <div className='form-details'>
      <span className='form-detail-left'>Correo del destinatario:</span>
      <span className='form-detail-right'>{values.zelleEmail || values.paypalEmail}</span>
    </div>
  );
};

Confirm.propTypes = {
  profile: PropTypes.object.isRequired,
  accountInfo: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    profile: state.Suppliers.profile,
    accountInfo: state.Accounts.accountInfo,
  };
};

export default connect(mapStateToProps)(Confirm);
