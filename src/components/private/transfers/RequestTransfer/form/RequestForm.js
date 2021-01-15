import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// REDUX
import { connect } from "react-redux";
import { requestTransfer } from "../../../../../store/actions/transactions";

const initialValues = { email: "", description: "", amount: 0 };
const formSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required("Debes colocar un email"),
  description: Yup.string().notRequired(),
  amount: Yup.number().notRequired(),
});

const RequestForm = ({ requestTransfer }) => {
  // check email exists or not
  const [state, setState] = useState("normal");

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={async (values, { resetForm, setSubmitting }) => {
        const { email } = values;
        if (state === "normal") {
          console.log(state, email);
          const config = { headers: { "Content-Type": "application/json" } };
          const body = JSON.stringify({ email });
          try {
            const res = await axios.post("/api/validation/email", body, config);
            return res.data.length > 0 ? setState("encontrado") : setState("no encontrado");
          } catch (error) {
            console.error(error);
            return false;
          }
        } else {
          if (await requestTransfer(values)) {
            resetForm(initialValues);
            setSubmitting(false);
          }
        }
      }}
    >
      {({ isValid }) => (
        <Form className="pagos-form">
          <div className="pagos-form__container">
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <Field
                type="email"
                name="email"
                id="email"
                onBlur={async (e) => {
                  if (e.target.value === "") return null;
                  const config = { headers: { "Content-Type": "application/json" } };
                  const res = await axios.post("/api/validation/email", JSON.stringify({ email: e.target.value }), config);
                  return res.data.length > 0 ? setState("encontrado") : setState("no encontrado");
                }}
              />
              <ErrorMessage name="email">
                {(message) => (
                  <span className="form-error">
                    <i className="fas fa-warning"></i> {message}
                  </span>
                )}
              </ErrorMessage>
            </div>

            {state === "no encontrado" && (
              <p className="form-msg">Lo sentimos pero este usuario no está registrado. Puedes enviarle una invitación de registro.</p>
            )}

            {state === "no encontrado" ? null : (
              <>
                <div className="form-group">
                  <label htmlFor="description">Descripción:</label>
                  <Field type="text" name="description" id="description" />
                  <ErrorMessage name="description">
                    {(message) => (
                      <span className="form-error">
                        <i className="fas fa-warning"></i> {message}
                      </span>
                    )}
                  </ErrorMessage>
                </div>

                <div className="form-group amount-group">
                  <label htmlFor="amount">Monto:</label>
                  <div className="input-group">
                    <Field id="amount" name="amount" type="tel" inputMode="numeric" pattern="[0-9]*" />
                    <div className="input-group-append">
                      <span className="input-group-text">Bs.</span>
                    </div>
                  </div>
                  <ErrorMessage name="amount">
                    {(message) => (
                      <span className="form-error">
                        <i className="fas fa-warning"></i> {message}
                      </span>
                    )}
                  </ErrorMessage>
                </div>
              </>
            )}

            <button type="submit" className="button" disabled={!isValid}>
              {state === "no encontrado" ? "Enviar invitación" : "Enviar solicitud"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default connect(null, { requestTransfer })(RequestForm);
