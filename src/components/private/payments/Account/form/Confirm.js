import React from 'react';
import PropTypes from 'prop-types';
import { Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
// CONNECT
import { connect } from 'react-redux';

const Confirm = ({ profile, accountInfo, values, submitted }) => {
  
  return (
    <div className="form-confirmation">
    {
      !submitted ?
      <>
        <h2>Detalles del pago</h2>
        <p>Verifica todos los detalles antes de confirmar</p>
        <div className="form-details">
          <span className="form-detail-left">Empresa a Pagar:</span>
          <span className="form-detail-right">{profile.name}</span>
        </div>
        <div className="form-details">
          <span className="form-detail-left">RIF:</span>
          <span className="form-detail-right">{profile.rif}</span>
        </div>
        <div className="form-details">
          <span className="form-detail-left">Descripción:</span>
          <span className="form-detail-right">{values.description}</span>
        </div>
        <div className="form-details">
          <span className="form-detail-left">Monto a pagar:</span>
          <span className="form-detail-right">{Number(values.amount).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' Bs.'}</span>
        </div>
        <div className="form-details">
          <span className="form-detail-left">Cuenta a debitar:</span>
          <span className="form-detail-right">{(accountInfo.bank.bankName).substring(0, 15) + ' - Termina en ' + (accountInfo.accNumber).substring(15, 20)}</span>
        </div>
        <div className="form-terms">
          <Field name="terms" component={({ field, form }) => 
            <input type="checkbox" id="terms" checked={values.terms} 
              onChange={e => form.setFieldValue(field.name, e.target.checked)}
            />
          }/>
          <label htmlFor="terms">Confirmo que todos los datos mostrados son los correctos.</label>
        </div>
        <ErrorMessage name="terms">
          {message => <span className="form-error"><i className="fas fa-warning"/> {message}</span>}
        </ErrorMessage>
      </>
      :
      <>
        <h2>¡Pago recibido!</h2>
        <span className="far fa-check-circle"/>
        <p>Hemos recibido toda la información de tu pago. Puedes revisar todo el detalle de este y otros pagos en tu <Link to="/dashboard">actividad</Link>.</p>
      </>
    }
    </div>
  )
}

Confirm.propTypes = {
  profile: PropTypes.object.isRequired,
  accountInfo: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    profile: state.suppliers.profile,
    accountInfo: state.accounts.accountInfo
  }
}

export default connect(mapStateToProps)(Confirm);
