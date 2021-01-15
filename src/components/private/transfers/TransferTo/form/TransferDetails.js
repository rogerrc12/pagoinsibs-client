import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Overlay, Tooltip } from "react-bootstrap";
import { Field, ErrorMessage } from "formik";
import Select from "react-select";
// REDUX
import { connect } from "react-redux";
import { showModal } from "../../../../../store/actions/modal";
import { getAccountInfo } from "../../../../../store/actions/accounts";

const SendForm = ({ accounts, showModal, getAccountInfo }) => {
  // Tooltp state
  const [show, setShow] = useState(false);
  const tooltip = useRef(null);

  const accountOptions = accounts.map((account) => {
    return { label: `${account.bank_name.substring(0, 15)} - termina en ${account.acc_number.substring(15, 20)}`, value: Number(account.id) };
  });

  return (
    <>
      <div className="form-group">
        <label htmlFor="pay_id">
          Usuario de pago a enviar:
          <small ref={tooltip} onClick={() => setShow(!show)}>
            ¿que es esto? <i className="fas fa-info-circle"></i>
          </small>
          <Overlay target={tooltip.current} show={show} placement="bottom">
            {(props) => <Tooltip {...props}>Coloca el nombre de usuario de la persona que recibira la transferencia.</Tooltip>}
          </Overlay>
        </label>
        <Field type="text" name="pay_id" id="pay_id" />
        <ErrorMessage name="pay_id">
          {(message) => (
            <span className="form-error">
              <i className="fas fa-warning"></i> {message}
            </span>
          )}
        </ErrorMessage>
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción:</label>
        <Field type="text" placeholder="Cuota, Cena, etc." id="description" name="description" />
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
          <Field id="amount" name="amount" inputMode="numeric" type="text" />
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

      <div className="form-group">
        <label htmlFor="account_id">Cuenta a debitar:</label>
        {accounts.length > 0 ? (
          <>
            <Field
              name="account_id"
              component={({ field, form }) => (
                <Select
                  className="suppliers-select"
                  placeholder="Selecciona una cuenta"
                  isClearable={true}
                  options={accountOptions}
                  value={accountOptions.find((account) => account.value === field.value) || ""}
                  onChange={(option) => {
                    option ? form.setFieldValue(field.name, option.value) : form.setFieldValue(field.name, "");
                    getAccountInfo(option ? option.value : null);
                  }}
                />
              )}
            ></Field>
            <ErrorMessage name="account_id">
              {(message) => (
                <span className="form-error">
                  <i className="fas fa-warning"></i> {message}
                </span>
              )}
            </ErrorMessage>
          </>
        ) : (
          <p className="no-account">
            No tienes cuenta para enviar agregada{" "}
            <button type="button" onClick={() => showModal()}>
              Agregar cuenta <span className="fas fa-plus"></span>
            </button>
          </p>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    accounts: state.activity.accounts.toSend,
  };
};

SendForm.propTypes = {
  accounts: PropTypes.array.isRequired,
  showModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { showModal, getAccountInfo })(SendForm);
