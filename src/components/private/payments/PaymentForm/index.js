import React, { useState } from "react";
import { Formik, Form } from "formik";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Confirm from "./Confirm";
import { PaymentValues } from "../../../../helpers/formValues";
import { PaymentValidation } from "../../../../helpers/validations";

import classes from "./PaymentForm.module.scss";
import CardContainer from "../../../UI/CardContainer";

const pages = (props) => [<Step1 {...props} />, <Step2 {...props} />, <Confirm {...props} />];

const AccountForm = ({ createPayment, currencies, paymentForm }) => {
  // steps of form
  const [step, setStep] = useState(0);
  const nextPage = () => setStep((prevState) => prevState + 1);
  const prevPage = () =>
    setStep((prevState) => {
      if (prevState !== 0) {
        return prevState - 1;
      } else {
        return 0;
      }
    });

  const onSubmit = (values) => createPayment(values);

  return (
    <CardContainer className={classes.CardForm}>
      <Formik initialValues={PaymentValues} validationSchema={PaymentValidation(paymentForm)} onSubmit={onSubmit} enableReinitialize>
        {({ isValid, values, setFieldValue, touched, errors }) => (
          <Form className={classes.Form}>
            {step !== pages().length - 1 && (
              <header className='steps-form'>
                <p className={`step__form step-1 ${step === 0 && "step-active"}`}>
                  <span className='step-number'>1</span>
                  <span className='step-string'>{paymentForm === "company" ? "Empresa" : "Producto"}</span>
                </p>
                <p className={`step__form step-2 ${step === 1 && "step-active"}`}>
                  <span className='step-number'>2</span>
                  <span className='step-string'>Monto y cuenta</span>
                </p>
              </header>
            )}
            <div className={classes.FormInputs}>{pages({ values, setFieldValue, nextPage, prevPage, touched, errors, isValid, currencies, paymentForm })[step]}</div>
          </Form>
        )}
      </Formik>
    </CardContainer>
  );
};

export default AccountForm;
