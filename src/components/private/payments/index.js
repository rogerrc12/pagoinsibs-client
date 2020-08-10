import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Fade from 'react-reveal/Fade'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import ErrorBoundary from '../../errorBoundary/ErrorBoundary';

const formSchema = Yup.object().shape({ payment_type: Yup.string().required() });

const Payments = () => {
  // payment type
  const [paymentType, setPaymentType] = useState(null);

  return (
    <ErrorBoundary>
      { paymentType ? 
        <Redirect to={`/payments/${paymentType === 'cuenta' ? 'account' : paymentType === 'tarjeta' ? 'credit-card' : 'direct-debit' }`} /> : 
        (
        <main className="main-pago main-user__dash">
          <Fade bottom distance="50px" delay={200}>
          <section className="main-pago__section">
            <img src="../img/main-logo.png" className="main-user__dash__logo" alt="logo Pago Insibs" />
            <h1 className="main-pago__section__title">¿Como pagarás?</h1>
            <Formik
              initialValues={{ payment_type: '' }}
              validationSchema={formSchema}
              onSubmit={(values) => setPaymentType(values.payment_type)}
            >
            {({ setFieldValue, isValid }) => (
            <Form className="pagos-form">
              <div className="pagos-form__container">

                <div className="form-group">
                  <div className="transaction-option">
                    <input
                      id="payment_type1"
                      name="payment_type"
                      type="radio"
                      onChange={() => setFieldValue('payment_type', 'cuenta')}
                    />
                    <label htmlFor="payment_type1">
                      {' '}
                      <span className="fas fa-university" />
                      {' '}
                      Pago único <span className="option-small">(desde mi cuenta)</span>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <div className="transaction-option">
                    <input
                      id="payment_type2"
                      name="payment_type"
                      type="radio"
                      onChange={() => setFieldValue('payment_type', 'tarjeta')}
                    />
                    <label htmlFor="payment_type2">
                      {' '}
                      <span className="far fa-credit-card" />
                      {' '}
                      Tarjeta de crédito
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <div className="transaction-option">
                    <input
                      id="payment_type3"
                      name="payment_type"
                      type="radio"
                      onChange={() => setFieldValue('payment_type', 'automatico')}
                    />
                    <label htmlFor="payment_type3">
                      {' '}
                      <span className="fas fa-coins" />
                      {' '}
                      Pago domiciliado
                    </label>
                  </div>
                </div>

                  <button type="submit" className="button" disabled={!isValid}>Continuar al pago</button>
                </div>
              </Form>
            )}
            </Formik>
          </section>
          </Fade>
        </main>
      )}
    </ErrorBoundary>
  );
};

export default React.memo(Payments);
