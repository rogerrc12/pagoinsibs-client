import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { createDebitInit } from "../../../../store/payments/actions";
import Step2 from "./Step2";
import Step1 from "./Step1";
// import UserDetails from "./UserDetails";
import Confirm from "./Confirm";
// HELPERS
import { DebitValues } from "../../../../helpers/formValues";
import { DebitValidation } from "../../../../helpers/validations";

import CardContainer from "../../../UI/CardContainer";

import classes from "../Payments.module.scss";

// pages
const pages = (props) => [<Step1 {...props} />, <Step2 {...props} />, <Confirm {...props} />];

const DiretDebitForm = ({ currencies }) => {
  const dispatch = useDispatch();
  // check page
  const [page, setPage] = useState(0);
  const nextPage = () => setPage((page) => page + 1);
  const prevPage = () => setPage((page) => (page !== 0 ? page - 1 : 0));

  const onSubmit = (values) => dispatch(createDebitInit(values));

  return (
    <CardContainer className={classes.CardForm}>
      <Formik initialValues={DebitValues} validationSchema={DebitValidation} onSubmit={onSubmit} enableReinitialize>
        {({ isValid, values, setFieldValue, errors, touched }) => (
          <Form className={classes.Form}>
            {page !== pages().length - 1 && (
              <header className='steps-form'>
                <p className={`step__form step-1 ${page === 0 && "step-active"}`}>
                  <span className='step-number'>1</span>
                  <span className='step-string'>Comercio</span>
                </p>
                <p className={`step__form step-2 ${page === 1 && "step-active"}`}>
                  <span className='step-number'>2</span>
                  <span className='step-string'>Monto y pago</span>
                </p>
              </header>
            )}
            <div className={classes.FormInputs}>{pages({ values, currencies, isValid, setFieldValue, errors, touched, nextPage, prevPage })[page]}</div>
          </Form>
        )}
      </Formik>
    </CardContainer>
  );
};

export default DiretDebitForm;
