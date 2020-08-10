import React, { useState } from "react";
import { Formik, Form } from "formik";
import SupplierDetails from "./SupplierDetails";
import PaymentDetails from "./PaymentDetails";
import UserDetails from "./UserDetails";
import Confirm from "./Confirm";
// REDUX
import { connect } from "react-redux";
import { sendDirectDebit } from "../../../../../actions/transactions";
// HELPERS
import { domiciliacionValues } from "../../../../../helpers/formValues";
import { domiciliacionValidation } from "../../../../../helpers/validations";

// pages
const pages = (props, setValue, setMin, submitted, errors, touched) => [
  <SupplierDetails />,
  <PaymentDetails values={props} setValue={setValue} setMin={setMin} errors={errors} touched={touched} />,
  <UserDetails values={props} setValue={setValue} />,
  <Confirm values={props} submitted={submitted} />,
];

const DiretDebitForm = ({ sendDirectDebit }) => {
  // check page
  const [page, setPage] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const nextPage = () => setPage((page) => page + 1);
  const prevPage = () => setPage((page) => (page !== 0 ? page - 1 : 0));

  // min amount
  const [min, setMin] = useState(0);

  return (
    <Formik
      initialValues={domiciliacionValues}
      validationSchema={domiciliacionValidation(min)}
      onSubmit={async (values, { resetForm, setSubmitting }) => {
        setSubmitting(true);

        if (await sendDirectDebit(values)) {
          resetForm(domiciliacionValues);
          setSubmitted(true);
        }
        setSubmitting(false);
      }}
    >
      {({ isValid, values, setFieldValue, errors, touched, isSubmitting }) => (
        <Form className="pagos-form">
          {page !== pages().length - 1 && (
            <header className="steps-form">
              <p className={`step__form step-1 ${page === 0 && "step-active"}`}>
                <span className="step-number">1</span>
                <span className="step-string">Comercio</span>
              </p>
              <p className={`step__form step-2 ${page === 1 && "step-active"}`}>
                <span className="step-number">2</span>
                <span className="step-string">Monto y pago</span>
              </p>
              <p className={`step__form step-3 ${page === 2 && "step-active"}`}>
                <span className="step-number">3</span>
                <span className="step-string">Cuenta</span>
              </p>
            </header>
          )}
          <div className="pagos-form__container">
            {pages(values, setFieldValue, setMin, submitted, errors, touched)[page]}
            <div className="continue-form">
              {!submitted ? (
                page === pages().length - 1 ? (
                  <>
                    <button
                      type="submit"
                      className={`continue-btn button ld-ext-right ${isSubmitting ? "running" : ""}`}
                      disabled={!isValid || isSubmitting}
                    >
                      Confirmar pago
                      <div class="ld ld-ring ld-spin"></div>
                    </button>
                    <button type="button" className="previous-btn button" onClick={prevPage}>
                      ir atrás
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="continue-btn button"
                      onClick={nextPage}
                      disabled={
                        page === 0
                          ? !values.supplier_id || !values.supplier_type || !values.product_id
                          : page === 1
                          ? !values.description || values.total_amount < 100 || !values.debit_type
                            ? true
                            : values.debit_type === "fraccionado"
                            ? !values.payment_period || values.payment_frequency === 0
                            : false
                          : page === 2
                          ? !values.start_payment_date || !values.account_id
                          : false
                      }
                    >
                      continuar
                    </button>
                    {page === 1 || page === 2 || page === 3 ? (
                      <button type="button" className="previous-btn button" onClick={prevPage}>
                        ir atrás
                      </button>
                    ) : null}
                  </>
                )
              ) : null}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default connect(null, { sendDirectDebit })(DiretDebitForm);
