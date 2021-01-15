import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
// CONNECT
import { connect } from "react-redux";
import { getUserInfoByPayId } from "../../../../../store/actions/auth";

const Confirm = ({ description, accountInfo, amount, pay_id, terms, getUserInfoByPayId, receiver, submitted }) => {
  useEffect(() => {
    getUserInfoByPayId(pay_id);
  }, [getUserInfoByPayId, pay_id]);

  return (
    <div className="form-confirmation">
      {!submitted ? (
        <>
          <h2>Detalles de la transferencia</h2>
          <p>Verifica todos los detalles antes de confirmar</p>
          <div className="form-details">
            <span className="form-detail-left">Persona a enviar:</span>
            <span className="form-detail-right">{receiver.first_name + " " + receiver.last_name}</span>
          </div>
          <div className="form-details">
            <span className="form-detail-left">Cédula:</span>
            <span className="form-detail-right">{receiver.cedula}</span>
          </div>
          <div className="form-details">
            <span className="form-detail-left">Monto:</span>
            <span className="form-detail-right">
              {Number(amount).toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " Bs."}
            </span>
          </div>
          <div className="form-details">
            <span className="form-detail-left">Descripción:</span>
            <span className="form-detail-right">{description}</span>
          </div>
          <div className="form-details">
            <span className="form-detail-left">Cuenta a debitar:</span>
            <span className="form-detail-right">
              {accountInfo.bank_name.substring(0, 15) + " - Termina en " + accountInfo.acc_number.substring(15, 20)}
            </span>
          </div>
          <div className="form-terms">
            <Field
              name="terms"
              component={({ field, form }) => (
                <input type="checkbox" id="terms" checked={terms} onChange={(e) => form.setFieldValue(field.name, e.target.checked)} />
              )}
            />
            <label htmlFor="terms">Confirmo que todos los datos mostrados son los correctos.</label>
          </div>
          <ErrorMessage name="terms">
            {(message) => (
              <span className="form-error">
                <i className="fas fa-warning"></i> {message}
              </span>
            )}
          </ErrorMessage>
        </>
      ) : (
        <>
          <h2>¡Solicitud recibida!</h2>
          <span className="far fa-check-circle"></span>
          <p>
            Hemos recibido toda la información de esta solicitud. Se te ha enviado un correo con todos los datos. Puedes tambien revisar todo el
            detalle de este y otros pagos en tu <Link to="/dashboard">actividad</Link>.
          </p>
        </>
      )}
    </div>
  );
};

Confirm.propTypes = {
  accountInfo: PropTypes.object.isRequired,
  receiver: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    accountInfo: state.activity.accountInfo,
    receiver: state.auth.receiver,
  };
};

export default connect(mapStateToProps, { getUserInfoByPayId })(Confirm);
