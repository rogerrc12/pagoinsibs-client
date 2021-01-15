import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { updateProfileInit } from "../../../store/actions";

import Input from "../../UI/FormItems/Input";
import DatePicker from "../../UI/FormItems/DatePicker";
import Radio from "../../UI/FormItems/Radio";

// +18
const year = new Date().getFullYear() - 17;

const profileSchema = Yup.object().shape({
  address: Yup.string().required("Debes agregar una dirección corta."),
  city: Yup.string().required("Debes agregar una ciudad."),
  birthday: Yup.date()
    .required("Debes agregar tu fecha de nacimiento.")
    .max(`${year}-01-01`, "Debes ser mayor de edad."),
  phone: Yup.string()
    .required("Debes agregar tu número de teléfono")
    .matches(/^((\+[0-9]{1,2})?[-\s]?([0-9]){3,4})[-\s]?([0-9]){3}[-\s]?([0-9]{3,4})$/, "Ingresa un formato de teléfono válido."),
});

const ProfileInfo = ({ updateProfileInit, user }) => {
  const initialValues = {
    address: user.address || "",
    city: user.city || "",
    birthday: user.birthday || null,
    phone: user.phone || "",
    gender: user.gender || "",
  };

  return (
    <Formik initialValues={initialValues} validationSchema={profileSchema} onSubmit={updateProfileInit}>
      {({ values, errors, touched }) => (
        <Form className='profile-form'>
          <legend>Completa tu perfil</legend>

          <Input label='Dirección corta' type='text' name='address' touched={touched.address} error={errors.address} />
          <Input label='Ciudad' type='text' name='city' touched={touched.city} error={errors.city} />

          <DatePicker
            name='birthday'
            emptyLabel='Selecciona una fecha'
            disableToolbar
            openTo='year'
            format='DD/MM/YYYY'
            label='Fecha de nacimiento'
            views={["year", "month", "date"]}
            maxDate={new Date(`${year}-01-01`)}
            value={values.birthday}
          />

          <div className='form-group-radio'>
            <label style={{ display: "block" }}>Género</label>
            <Radio name='gender' id='male' value='M' label='Hombre' error={errors.gender} touched={touched.gender} checked={values.gender === "M"} />
            <Radio name='gender' id='female' value='F' label='Mujer' error={errors.gender} touched={touched.gender} checked={values.gender === "F"} />
          </div>

          <Input type='text' name='phone' label='Teléfono' placeholder='ej.: 0424 123 4567' error={errors.phone} touched={touched.phone} />

          {/* <div className='form-group'>
            <label htmlFor='phone'>Teléfono</label>
            <Field type='text' name='phone' id='phone' placeholder='ej.: 0424 123 4567' />
            <ErrorMessage name='phone'>
              {(message) => (
                <span className='form-error'>
                  <i className='fas fa-warning' /> {message}
                </span>
              )}
            </ErrorMessage>
          </div> */}

          <button type='submit' className='button'>
            Agregar
          </button>
        </Form>
      )}
    </Formik>
  );
};

ProfileInfo.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.Auth.user,
  };
};

export default connect(mapStateToProps, { updateProfileInit })(ProfileInfo);
