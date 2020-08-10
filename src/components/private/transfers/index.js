import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const formSchema = Yup.object().shape({ transfer_type: Yup.string().required() })

const Transfers = () => {
  // transfer type
  const [transferType, setTransferType] = useState('');

  return transferType === 'cuenta' 
  ? 
    <Redirect to="/transfers/transfer-to" />
  
  : 
  transferType === 'tarjeta'
  ? 
    <Redirect to="/transfers/request-transfer" />
  : 
  transferType === 'automatico'
  ? 
    <Redirect to="/transfers/direct-debit" />
  :
  (
    <main className="main-pago main-user__dash">
      <section className="main-pago__section">
        <img src={`${process.env.PUBLIC_URL}/img/main-logo.png`} className="main-user__dash__logo" alt="logo Pago Insibs" />
        <h1 className="main-pago__section__title">¿Que quieres hacer?</h1>
        <Formik initialValues={{ transfer_type: '' }} validationSchema={formSchema} 
          onSubmit={values => setTransferType(values.transfer_type)}
        >
          {({ setFieldValue, isValid }) =>
          <Form className="pagos-form">
            <div className="pagos-form__container">
              <div className="form-group">
                <div className="transaction-option">
                  <input id="transfer_type1" name="transfer_type" type="radio" 
                    onChange={() => setFieldValue('transfer_type', 'cuenta')}
                  />
                  <label htmlFor="transfer_type1"> <span className="fas fa-comments-dollar"></span> Transferir a un usuario</label>
                </div>
              </div>

              <div className="form-group">
                <div className="transaction-option">
                  <input id="transfer_type2" name="transfer_type" type="radio" 
                    onChange={() => setFieldValue('transfer_type', 'tarjeta')}
                  />
                  <label htmlFor="transfer_type2"> <span className="fas fa-receipt"></span> Hacer un cobro</label>
                </div>
              </div>

              <button type="submit" className="button" disabled={!isValid}>Continuar al pago</button>
            </div>
          </Form>
          }
        </Formik>
      </section>
    </main>
  )
}

export default React.memo(Transfers);