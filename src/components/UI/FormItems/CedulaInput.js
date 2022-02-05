import React from "react";
import { Field, ErrorMessage } from "formik";

const CedulaInput = (props) => {
  return (
    <div className="form-group">
      <label htmlFor="ci_number">Cédula</label>
      <div className="input-group" style={{ width: "100%" }}>
        <div className="input-group-prepend">
          <Field as="select" name="ci_type">
            <option value="V">V</option>
            <option value="E">E</option>
          </Field>
        </div>

        <Field type="text" id="ci_number" name="ci_number" className={`ml-2 form-control ${props.touched && props.error ? "error" : ""}`} />
      </div>
      <ErrorMessage name="ci_type">
        {(message) => (
          <span className="form-error">
            <i className="fas fa-warning" /> {message}
          </span>
        )}
      </ErrorMessage>
      <ErrorMessage name="ci_number">
        {(message) => (
          <span className="form-error">
            <i className="fas fa-warning" /> {message}
          </span>
        )}
      </ErrorMessage>
    </div>
  );
};

export default CedulaInput;
