import React from 'react';
import { Field, ErrorMessage } from 'formik';
import ToSend from '../../../accounts/forms/ToSend';
import Modal from '../../../../layout/Modal';
import Select from 'react-select';
import Cleave from 'cleave.js/react';
// REDUX
import { connect } from 'react-redux';
import { showModal } from '../../../../../actions/modal';
import { getAccountInfo } from '../../../../../actions/accounts';

const UserDetails = ({ getAccountInfo, accounts, setValue, values, showModal, errors, touched }) => {
  
  accounts = accounts.filter(account => account.toSend);

  const accountOptions = accounts.map(account => { 
    return { label: `${(account.bank.bankName).substring(0, 18)} - termina en ${(account.accNumber).substring(15, 20)}`, value: Number(account.id)} 
  });

  const onAmountChange = e => setValue(e.target.name, e.target.rawValue);

  return (
    <>
      <div className="form-group">
        <label htmlFor="description">Concepto de pago:</label>
        <Field id="description" name="description" type="text" className={`form-control ${touched.description && errors.description ? 'error' : ''}`} />
        <ErrorMessage name="description">
          {message => <span className="form-error"><i className="fas fa-warning"/> {message}</span>}
        </ErrorMessage>
      </div>

      <div className="form-group">
        <label htmlFor="amount">Monto del {values.supplier_type === 1 ? 'servicio' : 'producto'}:</label>
        <div className="input-group">
          <Cleave name="amount" id="amount" autoComplete="off"
            options={{ 
              numeral: true, 
              numeralThousandsGroupStyle: 'thousand', 
              numeralDecimalMark: ',',
              delimiter: '',
              numeralPositiveOnly: true,
              stripLeadingZeroes: true
            }} 
            onChange={onAmountChange}
          />
          <div className="input-group-append">
            <span className="input-group-text">Bs.</span>
          </div>
        </div>
        <ErrorMessage name="amount">
          {message => <span className="form-error"><i className="fas fa-warning"/> {message}</span>}
        </ErrorMessage>
      </div>

      <div className="form-group">
        <label htmlFor="account_id">¿Desde que cuenta pagarás?</label>
        { accounts.length > 0 
          ?
          <>
            <Field name="account_id" component={({ field, form }) => 
              <Select 
                className={`suppliers-select  ${touched.account_id && errors.account_id ? 'error' : ''}`}
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
            {!values.account_id && accounts.length < 4 ?
              <button type="button" onClick={() => showModal()} className="button add-account">
                Agregar cuenta <span className="fas fa-plus"/>
              </button> : null
            }
            <ErrorMessage name="account_id">
              {message => <span className="form-error"><i className="fas fa-warning" /> {message}</span>}
            </ErrorMessage>
          </>
          :
          <p className="no-account">No tienes cuenta para enviar agregada <button type="button" onClick={() => showModal()}>Agregar cuenta <span className="fas fa-plus"/></button></p>
        }
      </div>

      <Modal>
        <ToSend />
      </Modal>
    </>
  )
}

const mapStateToProps = state => {
  return {
    accounts: state.accounts.accounts
  }
}

export default connect(mapStateToProps, { getAccountInfo, showModal })(UserDetails);