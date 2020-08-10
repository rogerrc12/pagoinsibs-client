import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field, ErrorMessage } from 'formik';
import ToSend from '../../../accounts/forms/ToSend';
import Modal from '../../../../layout/Modal';
import Select from 'react-select';
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import 'moment/locale/es';
// REDUX
import { connect } from 'react-redux';
import { showModal } from '../../../../../actions/modal';
import { getAccountInfo } from '../../../../../actions/accounts';
moment.locale('es');

const UserDetails = ({ accounts, showModal, getAccountInfo, values }) => {
  const [locale] = useState('es');
  const date = new Date();

  accounts = accounts.filter(account => account.toSend);
  
  const accountOptions = accounts.map(account => { 
    return { label: `${(account.bank.bankName).substring(0, 18)} - termina en ${(account.accNumber).substring(15, 20)}`, value: Number(account.id)} 
  });
  
  const accountSelect = () => {
    return accounts.length > 0 ? 
    <>
      <Field name="account_id" component={({ field, form }) =>
        <Select
          className="suppliers-select"
          placeholder="Selecciona una cuenta"
          isClearable={true}
          options={accountOptions}
          value={accountOptions.find(account => account.value === field.value) || ''}
          onChange={option => {
            option ? form.setFieldValue(field.name, option.value) : form.setFieldValue(field.name, '')
            getAccountInfo(option ? option.value : null)
          }}
        />
      }>
      </Field>
      <ErrorMessage name="account_id">
        {message => <span className="form-error"><i className="fas fa-warning"/> {message}</span>}
      </ErrorMessage>
    </>
  :
    <p className="no-account">No tienes cuenta para enviar agregada <button type="button" onClick={() => showModal()}>Agregar cuenta <span className="fas fa-plus"></span></button></p>
  };

  return (
    <>
      <div className="form-group payment-date-group">
        <label htmlFor="start_payment_date">Fecha de inicio de cobro:</label>
        <Field name="start_payment_date" id="start_payment_date" component={({ field, form }) => 
          <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={locale}>
            <DatePicker disableToolbar
              variant="inline"
              format="dddd, D [de] MMMM"
              invalidDateMessage="Formato de fecha inválido"
              helperText="Elige una fecha de incio para tus pagos (máximo a 1 mes)"
              value={values.start_payment_date}
              minDate={new Date()}
              maxDate={new Date(date.setMonth(date.getMonth() + 1))}
              onChange={date => form.setFieldValue(field.name, new Date(date))}
            />  
          </MuiPickersUtilsProvider>
        }/>
        <ErrorMessage name="payment-date">
          {message => <span className="form-error"><i className="fas fa-warning"/> {message}</span>}
        </ErrorMessage>
      </div>

      <div className="form-group">
        <label htmlFor="account_id">Cuenta a debitar:</label>
        {accountSelect()}
      </div>

      <Modal>
        <ToSend />
      </Modal>
    </>
  )
}

UserDetails.propTypes = {
  getAccountInfo: PropTypes.func.isRequired,
  accounts: PropTypes.array.isRequired
}

const mapStateToProps = state => {
  return {
    accounts: state.accounts.accounts
  }
}

export default connect(mapStateToProps, { showModal, getAccountInfo })(React.memo(UserDetails));
