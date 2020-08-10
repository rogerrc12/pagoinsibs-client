import React from 'react';
import Select from 'react-select';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// REDUX
import { connect } from 'react-redux';
import { addAccount } from '../../../../actions/accounts';

// Validation schema with yup
const formSchema = Yup.object().shape({
  acc_number: Yup.string().required('Debes colocar un número de cuenta').matches(/^[0-9]{20}$/, 'El número de cuenta debe ser de 20 caracteres'),
  bank_id: Yup.string().required('Debes seleccionar un banco'),
  acc_type: Yup.string().required('Debes seleccionar el tipo de cuenta')
});

const ToSend = ({ banks, addAccount, accData }) => {

  // intial values for Formik (values if edit state, if not empty)
  const initialValues = { 
    acc_number: accData && accData.current ? accData.current.accNumber : '', 
    bank_id: accData && accData.current ? accData.current.bank.id : '', 
    acc_type: accData && accData.current ? accData.current.accType : '',
    to_receive: false, 
    acc_id: accData && accData.current ? accData.current.id : null
  };

  // Set select parameters for bank id (react select)
  const insibsBanks = banks.filter(bank => bank.isInsibs);
  const bankName = insibsBanks.map(bank => {return { label: bank.bankName, value: bank.id }});
  
  const bankLabels = ({ value, label }) => {
    const bank = insibsBanks.find(bank => bank.id === value);
    
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={`${process.env.PUBLIC_URL}/img/bancos/${bank.bankImg}`} alt={label} width="30px" />
        <span style={{ marginLeft: '10px', fontSize: '.95rem', color: '#888' }}>{label}</span>
      </div>
    )
  };

  // set select parameters for acc type (react select)
  const accountType = [ {label: 'Corriente', value: 'corriente'}, {label: 'Ahorros', value: 'ahorros'} ];

  return (
    <Formik initialValues={initialValues} validationSchema={formSchema}
      onSubmit={values => addAccount(values)}
    >
      {({ values }) =>
        <Form className="account-form">
          <legend>Agregar cuenta para pagar</legend>

          <div className="form-group">
            <label>Banco</label>
            <Field name="bank_id" component={({ field, form }) => 
              <Select placeholder="selecciona un banco" options={bankName} isClearable={true}
                formatOptionLabel={bankLabels}
                value={bankName.find(type => type.value === field.value) || ''}
                onChange={option => {
                  option ? form.setFieldValue(field.name, option.value) : form.setFieldValue(field.name, '')
                  option ? form.setFieldValue('acc_number', option.value) : form.setFieldValue('acc_number', '')
                }}
              />
            }/>
            <ErrorMessage name="bank_id">
              {message => <span className="form-error"><i className="fas fa-warning"/> {message}</span>}
            </ErrorMessage>
          </div>

          <div className="form-group">
            <label>Tipo de cuenta</label>
            <Field name="acc_type" component={({ field, form }) => 
              <Select placeholder="selecciona un tipo" options={accountType} isClearable={true}
                value={accountType.find(type => type.value === field.value) || ''}
                onChange={option =>
                  option ? form.setFieldValue(field.name, option.value) : form.setFieldValue(field.name, '')
                }
              />
            }/>
            <ErrorMessage name="acc_type">
              {message => <span className="form-error"><i className="fas fa-warning"></i> {message}</span>}
            </ErrorMessage>
          </div>

          <div className="form-group">
            <label htmlFor="acc_number">Número de cuenta</label>
            <Field type="text" className="form-control" name="acc_number" id="acc_number" maxLength="20" />
            <ErrorMessage name="acc_number">
              {message => <span className="form-error"><i className="fas fa-warning"></i> {message}</span>}
            </ErrorMessage>
          </div>

          <button type="submit" className="button">Agregar</button>
        </Form>
      }
    </Formik>
  )
}

const mapStateToProps = state => {
  return {
    banks: state.banks.banks
  }
}

export default connect(mapStateToProps, { addAccount })(ToSend);
