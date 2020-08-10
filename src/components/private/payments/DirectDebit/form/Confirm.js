import React from "react";
import PropTypes from "prop-types";
import { Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import Moment from "react-moment";
// CONNECT
import { connect } from "react-redux";

const Confirm = ({ submitted, values, profile, accountInfo, productInfo }) => {
  
  return (
    <div className='form-confirmation'>
      {!submitted ? (
        <>
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
            <span className='form-detail-right'>
              {productInfo.name}
            </span>
          </div>
          <div className='form-details'>
            <span className='form-detail-left'>Descripción:</span>
            <span className='form-detail-right'>{values.description}</span>
          </div>
          <div className='form-details'>
            <span className='form-detail-left'>Monto total a domiciliar:</span>
            <span className='form-detail-right'>
              {Number(
                values.fee_total_amount > 0 ? values.fee_total_amount : values.total_amount
              ).toLocaleString("es-ES", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })} Bs.
            </span>
          </div>
          <div className='form-details'>
            <span className='form-detail-left'>¿Como pagarás?:</span>
            <span className='form-detail-right'>
              {"pagos " + values.debit_type + "s"}
            </span>
          </div>
          <div className='form-details'>
            <span className='form-detail-left'>Frecuencia de pago:</span>
            <span className='form-detail-right'>
              {values.debit_type === "recurrente" ? "mensual" : values.payment_period}
            </span>
          </div>
          <div className='form-details'>
            <span className='form-detail-left'>Fecha del primer cobro:</span>
            <span className='form-detail-right'>
              <Moment format='dddd, D [de] MMMM'>{values.start_payment_date}</Moment>
            </span>
          </div>
          {values.debit_type !== "recurrente" && (
            <>
              <div className='form-details'>
                <span className='form-detail-left'>Número de cuotas:</span>
                <span className='form-detail-right'>
                  {values.payment_frequency === 1
                    ? `${values.payment_frequency} cuota`
                    : `${values.payment_frequency} cuotas`}
                </span>
              </div>
              <div className='form-details'>
                <span className='form-detail-left'>Monto por cuota:</span>
                <span className='form-detail-right'>
                  {Number(values.fee_amount).toLocaleString("es-ES", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }) + " Bs."}
                </span>
              </div>
            </>
          )}
          <div className='form-details'>
            <span className='form-detail-left'>Cuenta a debitar:</span>
            <span className='form-detail-right'>
              {accountInfo.bank.bankName.substring(0, 15) +
                " - Termina en " +
                accountInfo.accNumber.substring(15, 20)}
            </span>
          </div>
          <div className='form-terms'>
            <Field
              name='terms'
              component={({ field, form }) => (
                <input
                  type='checkbox'
                  id='terms'
                  checked={values.terms}
                  onChange={e =>
                    form.setFieldValue(field.name, e.target.checked)
                  }
                />
              )}
            />
            <label htmlFor='terms'>
              Confirmo que todos los datos mostrados son los correctos.
            </label>
          </div>
          <ErrorMessage name='terms'>
            {message => (
              <span className='form-error'>
                <i className='fas fa-warning'/> {message}
              </span>
            )}
          </ErrorMessage>
        </>
      ) : (
        <>
          <h2>Datos recibidos!</h2>
          <span className='far fa-check-circle'/>
          <p>
            Hemos recibido toda la información para tu domiciliación. Puedes
            revisar todo el detalle de este y otros pagos en tu{" "}
            <Link to='/dashboard'>actividad</Link>.
          </p>
        </>
      )}
    </div>
  );
};

Confirm.propTypes = {
  profile: PropTypes.object.isRequired,
  accountInfo: PropTypes.object.isRequired,
  productInfo: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.suppliers.profile,
    accountInfo: state.accounts.accountInfo,
    productInfo: state.suppliers.productInfo
  };
};

export default connect(mapStateToProps)(Confirm);
