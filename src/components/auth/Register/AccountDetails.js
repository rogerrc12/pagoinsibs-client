import React, { useState, useRef } from 'react';
import { Field, ErrorMessage } from 'formik';
import { Overlay, Tooltip } from 'react-bootstrap';
// helpers
import { togglePassword } from '../../../helpers/helpers';

const AccountDetails = ({ errors, touched }) => {
  // Tooltp state
  const [show, setShow] = useState(false);
  const tooltip = useRef(null);

  return (
    <>
      <div className="form-group">
        <label htmlFor="ci_number">Cédula</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <Field as="select" name="ci_type">
              <option value="V">V</option>
              <option value="E">E</option>
            </Field>
          </div>
            
          <Field type="text" id="ci_number" name="ci_number" 
                 className={`ml-5 form-control ${touched.ci_number && errors.ci_number ? 'error' : ''}`} 
          />
        </div>
        <ErrorMessage name="ci_type">
          {message => <span className="form-error"><i className="fas fa-warning"/> {message}</span>}
        </ErrorMessage>
        <ErrorMessage name="ci_number">
          {message => <span className="form-error"><i className="fas fa-warning"/> {message}</span>}
        </ErrorMessage>
      </div>

      <div className="form-group">
        <label htmlFor="username">
          Nombre de usuario
          <small ref={tooltip} onClick={() => setShow(!show)} ><i className="fas fa-info-circle"/></small>
          <Overlay target={tooltip.current} show={show} placement="bottom">
            {props => (
              <Tooltip {...props}>
                El nombre de usuario es necesario para recibir transacciones de terceros. <b>Recomendamos usar un usuario de pago facil de recordar.</b>
              </Tooltip>
            )}
          </Overlay>
        </label>
        <Field id="username" name="username" autoComplete="username" className={`form-control ${touched.username && errors.username ? 'error' : ''}`} />
        {touched.username && errors.username ?
          <ErrorMessage name="username">
            {message => <span className="form-error"><i className="fas fa-warning"/> {message}</span>}
          </ErrorMessage> :
          <span className="form-msg">Entre 4 y 12 caracteres.</span>
        }
      </div>

      <div className="form-group icon-group">
        <label htmlFor="password">contraseña</label>
        <Field type="password" id="password" name="password" autoComplete="new-password" className={`form-control ${touched.password && errors.password ? 'error' : ''}`} />
        <span className="fas fa-eye input-icon pointer" id="password-icon" onClick={() => togglePassword()}/>
        {touched.password && errors.password ?
          <ErrorMessage name="password">
            {message => <span className="form-error"><i className="fas fa-warning"/> {message}</span>}
          </ErrorMessage> :
          <span className="form-msg">Al menos 6 caracteres.</span>
        }
      </div>

      <div className="form-group icon-group">
        <label htmlFor="confirm_password">confirmar contraseña</label>
        <Field type="password" id="confirm_password" name="confirm_password" autoComplete="new-password" className={`form-control ${touched.confirm_password && errors.confirm_password ? 'error' : ''}`} />
        <span className="fas fa-eye input-icon pointer" id="confirm_password_icon" onClick={() => togglePassword()}/>
        <ErrorMessage name="confirm_password">
          {message => <span className="form-error"><i className="fas fa-warning"/> {message}</span>}
        </ErrorMessage>
      </div>
    </>
  )
}

export default AccountDetails;

