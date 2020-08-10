import React , { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import SupplierDetails from './SupplierDetails';
import UserDetails from './UserDetails';
import Confirm from './Confirm';
// REDUX
import { connect } from 'react-redux';
import { sendAccPayment } from '../../../../../actions/transactions';

const initialValues = {
  supplier_type: '', supplier_id: '', description: '', amount: '', account_id: '', terms: false
}

const formSchema = Yup.object().shape({
  supplier_type: Yup.number().required('Elige una opción.'),
  supplier_id: Yup.number().required('Elige un comercio.'),
  description: Yup.string().required('Agrega una descripción.'),
  amount: Yup.number().typeError('Solo se aceptan números').min(1000, 'El monto mínimo aceptado es de 1000 Bs.').required('Coloca un monto correcto.'),
  account_id: Yup.number().required('Eligan una de las cuentas.')
});

const pages = (props, setValue, submitted, errors, touched) => 
  [<SupplierDetails errors={errors} touched={touched} />, <UserDetails values={props} setValue={setValue} errors={errors} touched={touched} />, <Confirm values={props} submitted={submitted} />];

const AccountForm = ({ sendAccPayment }) => {
  // steps of form
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const nextPage = () => setStep(prevState => prevState + 1);
  const prevPage = () => setStep(prevState => {
    if (prevState !== 0) {
      return prevState - 1;
    } else {
      return 0;
    }
  });

  return (
    <Formik
      initialValues={initialValues} validationSchema={formSchema}
      onSubmit={async (values, { resetForm, setSubmitting }) => {
        setSubmitting(true);

        if (await sendAccPayment(values)) {
          resetForm(initialValues);
          setSubmitted(true);
        }

        setSubmitting(false);
      }}
    >
      {({ isValid, values, setFieldValue, isSubmitting, touched, errors }) => (
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
                <span className="step-string">Monto y cuenta</span>
              </p>
            </header>
          }
          <div className="pagos-form__container">
            { pages(values, setFieldValue, submitted, touched, errors)[step] }
            <div className="continue-form clearfix">
              {
                !submitted ?
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
                  step === 1
                  ?
                  <>
                    <button type="button" className="continue-btn button" 
                      onClick={nextPage}
                      disabled={!isValid}
                    >
                      continuar
                    </button>
                    <button type="button" className="previous-btn button" onClick={prevPage}>ir atrás</button>
                  </>
                  :
                  <>
                  <button type="button" className="continue-btn button" 
                    onClick={nextPage}
                    disabled={
                      step === 0
                      ? !values.supplier_id || !values.supplier_type ? true : false
                      : false
                    }
                  >
                    continuar
                  </button>
                  </>
                : null
              }
            </div>
          </div>
        </Form>  
      )}
    </Formik>
  )
}

export default connect(null, { sendAccPayment })(AccountForm);
