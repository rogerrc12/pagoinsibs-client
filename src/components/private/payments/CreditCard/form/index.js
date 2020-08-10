import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import SupplierDetails from './SupplierDetails';
import UserDetails from './UserDetails';
import CardDetails from './CardDetails';
import Confirm from './Confirm';
// REDUX
import { connect } from 'react-redux';
import { sendCcPayment } from '../../../../../actions/transactions';


// state of form
const initialValues = {
  supplier_type: '', supplier_id: '', description: '', amount: '',
  name: '', number: '', cedula: '', month: '', year: '', cvc: '', terms: false
}

const formSchema = Yup.object().shape({
  supplier_type: Yup.number().required('Elige una opción.'),
  supplier_id: Yup.number().required('Elige un comercio.'),
  description: Yup.string().required('Agrega una descripción.'),
  amount: Yup.number().typeError('Solo se aceptan números').min(10, 'El monto mínimo aceptado es de 1000 Bs.').required('Coloca un monto correcto.'),
  name: Yup.string().required('Coloca el nombre nombre del tarjetahabiente.'),
  number: Yup.string().required('Coloca el número de la tarjeta').min(16, 'Número de tarjeta incorrecto, verifica los datos').max(20, 'Número de tarjeta incorrecto, verifica los datos'),
  cedula: Yup.number().required('Coloca el número de cédula del tarjetahabiente.'),
  month: Yup.number().required('Selecciona el mes de expiración de la tarjeta.'),
  year: Yup.number().required('Selecciona el año de expiración de la tarjeta.'),
  cvc: Yup.number().required('Coloca el cvc de la tarjeta.')
})

const pages = (props, setValue, submitted, errors, touched) => [<SupplierDetails />, <UserDetails values={props} setValue={setValue} errors={errors} touched={touched} />, <CardDetails values={props} setValue={setValue} errors={errors} touched={touched} />, <Confirm {...props} submitted={submitted} />];

const CreditCardForm = ({ sendCcPayment }) => {

  // steps of form
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const nextPage = () => setStep(prevStep => prevStep + 1);
  const prevPage = () => setStep(prevState => {
    if (prevState !== 0) {
      return prevState - 1;
    } else {
      return 0;
    }
  })

  return (
    <Formik
      initialValues={initialValues} validationSchema={formSchema}
      onSubmit={async (values, { resetForm, setSubmitting }) => {
        setSubmitting(true);

        if (await sendCcPayment(values)) {
          resetForm(initialValues);
          setSubmitted(true);
        }
        
        setSubmitting(false);
      }}
    >
      {({ isValid, values, setFieldValue, isSubmitting, errors, touched }) => (
        <Form className="pagos-form">
          {
            step !== pages().length - 1
            &&
            <header className="steps-form">
              <p className={`step__form step-1 ${step === 0 && 'step-active'}`}>
              <span className="step-number">1</span> 
                <span className="step-string">Empresa</span>
              </p>
              <p className={`step__form step-2 ${step === 1 && 'step-active'}`}>
                <span className="step-number">2</span> 
                <span className="step-string">Monto</span>
              </p>
              <p className={`step__form step-3 ${step === 2 && 'step-active'}`}>
                <span className="step-number">3</span>
                <span className="step-string">Tarjeta</span>
              </p>
            </header>
          }
          <div className="pagos-form__container">
            {pages(values, setFieldValue, submitted, errors, touched)[step]}
            <div className="continue-form">
              {
                !submitted
                ?
                  step === pages().length - 1 
                  ?
                  <>
                    <button type="submit" className="continue-btn button" 
                      disabled={!values.terms || isSubmitting}>
                        Confirmar pago
                    </button>
                    <button type="button" className="previous-btn button" onClick={prevPage}>ir atrás</button>
                  </>
                  :
                  <button type="button" className="continue-btn button" 
                    onClick={nextPage}
                    disabled={
                      step === 0
                      ? !values.supplier_id || !values.supplier_type ? true : false
                      :
                      step === 1
                      ? !values.description || !values.amount ? true : false
                      :
                      step === 2
                      ? !isValid
                      : false
                    }
                  >
                    continuar
                  </button>
                : null
              }
              {
                !submitted 
                ?
                  step === 1 || step === 2 ?
                  <button type="button" className="previous-btn button" onClick={prevPage}>ir atrás</button>
                  : null
                : null
              }
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

CreditCardForm.propTypes = {
  sendCcPayment: PropTypes.func.isRequired
}

export default connect(null, { sendCcPayment })(CreditCardForm);
