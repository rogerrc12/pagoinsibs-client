import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { setCurrency } from "../../../../helpers/helpers";
// CONNECT
import { connect, useSelector } from "react-redux";

import Checkbox from "../../../UI/FormItems/Checkbox";

const Confirm = ({ values, profile, currencies, accountInfo, productInfo, prevPage, isValid }) => {
  const currencyDetails = currencies.find((currency) => currency.id === values.currencyId);
  const { isProcessing } = useSelector((state) => state.Payments);

  return (
    <div className='form-confirmation'>
      <h2>Detalles de la domiciliación</h2>
      <p>Verifica todos los detalles antes de confirmar</p>
      <div className='form-details'>
        <span className='form-detail-left'>Empresa a domiciliar:</span>
        <span className='form-detail-right'>{profile.name}</span>
      </div>
      <div className='form-details'>
        <span className='form-detail-left'>RIF:</span>
        <span className='form-detail-right'>{profile.rif}</span>
      </div>
      <div className='form-details'>
        <span className='form-detail-left'>Producto a domiciliar:</span>
        <span className='form-detail-right'>{productInfo.name}</span>
      </div>
      <div className='form-details'>
        <span className='form-detail-left'>Descripción:</span>
        <span className='form-detail-right'>{values.description}</span>
      </div>
      <div className='form-details'>
        <span className='form-detail-left'>{values.debitType === "recurrente" ? "Monto por cuota:" : "Monto a domiciliar:"}</span>
        <span className='form-detail-right'>{setCurrency(values.amount) + " " + currencyDetails.symbol}</span>
      </div>
      <div className='form-details'>
        <span className='form-detail-left'>¿Como pagarás?:</span>
        <span className='form-detail-right'>{"pagos " + values.debitType + "s"}</span>
      </div>
      <div className='form-details'>
        <span className='form-detail-left'>Frecuencia de pago:</span>
        <span className='form-detail-right' style={{ textTransform: "capitalize" }}>
          {values.paymentPeriod}
        </span>
      </div>
      <div className='form-details'>
        <span className='form-detail-left'>Fecha del primer cobro:</span>
        <span className='form-detail-right'>{moment(values.startPaymentDate).format("dddd, D [de] MMMM")}</span>
      </div>
      {values.debitType !== "recurrente" && (
        <>
          <div className='form-details'>
            <span className='form-detail-left'>Número de cuotas:</span>
            <span className='form-detail-right'>{values.paymentFrequency === 1 ? `${values.paymentFrequency} cuota` : `${values.paymentFrequency} cuotas`}</span>
          </div>
          <div className='form-details'>
            <span className='form-detail-left'>Monto por cuota:</span>
            <span className='form-detail-right'>{setCurrency(values.feeAmount) + " " + currencyDetails.symbol}</span>
          </div>
        </>
      )}

      {values.accountId && (
        <div className='form-details'>
          <span className='form-detail-left'>Cuenta a debitar:</span>
          <span className='form-detail-right'>{accountInfo.bank.bankName.substring(0, 15) + " - Termina en " + accountInfo.accNumber.substring(15, 20)}</span>
        </div>
      )}

      <Checkbox name='terms' label='Confirmo que todos los datos mostrados son los correctos.' />

      <div className='continue-form col-12 mx-auto mt-2'>
        <button type='submit' className={`continue-btn button ld-ext-right ${isProcessing ? "running" : ""}`} disabled={!isValid || isProcessing}>
          <div className='ld ld-spin ld-ring' />
          Completar pago
        </button>
        <button type='button' className='previous-btn button' onClick={prevPage}>
          ir atrás
        </button>
      </div>
    </div>
  );
};

Confirm.propTypes = {
  profile: PropTypes.object.isRequired,
  accountInfo: PropTypes.object.isRequired,
  productInfo: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    profile: state.Suppliers.profile,
    accountInfo: state.Accounts.accountInfo,
    productInfo: state.Suppliers.productInfo,
  };
};

export default connect(mapStateToProps)(Confirm);
