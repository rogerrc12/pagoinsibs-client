import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import ToSend from '../../../accounts/forms/ToSend';
import Modal from '../../../../layout/Modal';
import TransferDetails from './TransferDetails';
import Confirm from './Confirm';
// REDUX
import { connect } from 'react-redux';
import { sendTransaction } from '../../../../../actions/transactions';

const initialValues = { pay_id: '', description: '', amount: '', account_id: '', terms: false }
const pages = (props, submitted) => [<TransferDetails />, <Confirm {...props} submitted={submitted} />];

const SendForm = ({ sendTransaction, user }) => {

  const [submitted, setSubmitted] = useState(false);

  const formSchema = Yup.object().shape({
    pay_id: Yup.string().required('Coloca el nombre de usuario a recibir').test('pay_id', 'Este nombre de pago no se encuentra registrado', async value => {
      if (typeof value === 'undefined') return false;
      const config = {headers: {'Content-Type':'application/json'}}
      const body = JSON.stringify({ pay_id: value });
  
      try {
        const res = await axios.post('/api/validation/pay-id', body, config);
  
        return res.data.length > 0 ? true : false;
      } catch (error) { 
        return false; 
      }
    }).test('pay_id', 'No puedes usar tu nombre de usuario como usuario a enviar', value => user.pay_id === String(value).toLowerCase() ? false : true
    ),
    description: Yup.string().required('Agrega una descripción.'),
    amount: Yup.number().required('Debes colocar un monto').typeError('Solo se aceptan números').min(1000, 'El monto mínimo aceptado es de 1000 Bs.'),
    account_id: Yup.number().required('Eligan una de las cuentas.')
  });

  // steps
  const [step, setStep] = useState(0);
  const nextPage = () => setStep(page => page + 1);
  const prevPage = () => setStep(page => page !== 0 ? page - 1 : 0);

  return (
    <>
      <Formik
        initialValues={initialValues} validationSchema={formSchema}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          if (await sendTransaction(values)) {
            resetForm(initialValues);
            setSubmitted(true);
          }
          setSubmitting(false);
        }}
      >
      {({ values, isValid }) => (
        <Form className="pagos-form">
          <div className="pagos-form__container">
            {pages(values, submitted)[step]}
            <div className="continue-form">
            {
              !submitted
              ?
                step === pages().length - 1
                ?
                <>
                  <button type="submit" className="continue-btn button" 
                    disabled={!values.terms}>
                      Confirmar Transferencia
                  </button>
                  <button type="button" className="previous-btn button" onClick={prevPage}>ir atrás</button>
                </>              
                :
                  <button type="button" onClick={nextPage} className="button continue-btn" disabled={!isValid}
                  >Continuar</button>
              :
              null
            }
            </div>
          </div>
        </Form>
      )}
      </Formik>
      <Modal>
        <ToSend />
      </Modal>
    </>
  )
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

SendForm.propTypes = {
  user: PropTypes.object.isRequired,
  sendTransaction: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { sendTransaction })(SendForm);
