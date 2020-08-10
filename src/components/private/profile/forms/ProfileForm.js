import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import 'moment/locale/es';
// Redux
import { connect } from 'react-redux';
import { updateUser } from '../../../../actions/auth';
moment.locale('es');

// mayor de edad
const year = new Date().getFullYear() - 17;

const profileSchema = Yup.object().shape({
  address: Yup.string().required('Debes agregar una dirección corta.'),
  city: Yup.string().required('Debes agregar una ciudad.'),
  birthday: Yup.date().required('Debes agregar tu fecha de nacimiento.').max(`${year}-01-01`, 'Debes ser mayor de edad.'),
  phone: Yup.string().required('Debes agregar tu número de teléfono').matches(/^((\+[0-9]{1,2})?[-\s]?([0-9]){3,4})[-\s]?([0-9]){3}[-\s]?([0-9]{3,4})$/, 'Ingresa un formato de teléfono válido.')
})

const ProfileInfo = ({ updateUser, user }) => {
  const initialValues = {
    address: user.address || '', city: user.city || '', 
    birthday: user.birthday || null, phone: user.phone || '', 
    gender: user.gender || ''
  }

  const [locale] = useState('es');

  return (
    <Formik initialValues={initialValues} validationSchema={profileSchema}
      onSubmit={values => updateUser(values)}
    >
      {({ setFieldValue, values }) =>
      <Form className="profile-form">
        <legend>Completa tu perfil</legend>
        <div className="form-group">
          <label htmlFor="address">Dirección corta</label>
          <Field type="text" id="address" name="address" />
          <ErrorMessage name="address">
            {message => <span className="form-error"><i className="fas fa-warning"/> {message}</span>}
          </ErrorMessage>

          <label htmlFor="city">Ciudad</label>
          <Field type="text" id="city" name="city" />
          <ErrorMessage name="city">
            {message => <span className="form-error"><i className="fas fa-warning"/> {message}</span>}
          </ErrorMessage>
        </div>

        <div className="form-group birthday-group">
          <Field name="birthday" component={({ field }) => 
            <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={locale}>
              <DatePicker emptyLabel="Selecciona una fecha" variant="inline"
                format="DD/MM/YYYY" label="Fecha de Nacimiento"
                invalidDateMessage="Formato de fecha inválido"
                openTo="year"
                maxDate={new Date(`${year}-01-01`)}
                value={values.birthday}
                onChange={date => setFieldValue(field.name, new Date(date))}
              />
            </MuiPickersUtilsProvider>
          }/>
          <ErrorMessage name="birthday">
            {message => <span className="form-error"><i className="fas fa-warning"/> {message}</span>}
          </ErrorMessage>
        </div>

        <div className="form-group">
          <label>Género</label>
          <div className="form-check-inline">
            <Field className="form-check-input" checked={values.gender === 'M'} type="radio" name="gender" id="male" value="M" />
            <label className="form-check-label" htmlFor="male">Hombre</label>
          </div>
          <div className="form-check-inline">
            <Field className="form-check-input" checked={values.gender === 'F'} type="radio" name="gender" id="female" value="F" />
            <label className="form-check-label" htmlFor="female">Mujer</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="phone">Teléfono</label>
          <Field type="text" name="phone" id="phone" placeholder="ej.: 0424 123 4567" />
          <ErrorMessage name="phone">
            {message => <span className="form-error"><i className="fas fa-warning"/> {message}</span>}
          </ErrorMessage>
        </div>

        <button type="submit" className="button" >Agregar</button>
      </Form>
      }
    </Formik>
  )
}

ProfileInfo.propTypes = {
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps, { updateUser })(ProfileInfo);
