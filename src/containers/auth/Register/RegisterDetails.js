import React from "react";
import { Field } from "formik";
import { Link } from "react-router-dom";

import Input from "../../../components/UI/FormItems/Input";

const RegisterDetails = ({ values, errors, touched }) => {
  return (
    <div className="mb-2">
      <div className="full-name-group">
        <Input type="text" label="Primer nombre" placeholder="John" name="first_name" error={errors.first_name} touched={touched.first_name} />
        <Input type="text" label="Primer apellido" placeholder="Doe" name="last_name" error={errors.last_name} touched={touched.last_name} />
      </div>

      <Input type="email" label="Correo de acceso" name="email" placeholder="johndoe@mail.com" error={errors.email} touched={touched.email} />
      <Input type="email" label="Correo de contacto (opcional)" name="secondaryEmail" placeholder="johndoe@mail.com" error={errors.email} touched={touched.email} />

      <div className="form-terms">
        <Field
          name="terms"
          component={({ field, form }) => <input type="checkbox" id="terms" defaultChecked={values.terms} onChange={(e) => form.setFieldValue(field.name, e.target.checked)} />}
        />
        <label htmlFor="terms">
          He leído, y acepto los <Link to="/">términos y condiciones</Link> y <Link to="/">políticas de privacidad</Link> de INSIBS C.A. para el uso correcto de la plataforma.
        </label>
      </div>
    </div>
  );
};

export default RegisterDetails;
