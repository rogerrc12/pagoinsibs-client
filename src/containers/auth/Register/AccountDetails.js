import React from "react";

import Input from "../../../components/UI/FormItems/Input";
import CedulaInput from "../../../components/UI/FormItems/CedulaInput";

const AccountDetails = ({ errors, touched }) => {
  return (
    <>
      <CedulaInput error={errors.ci_number} touched={touched.ci_number} />

      <Input type='text' label='Nombre de usuario' name='username' autoComplete='username' touched={touched.username} error={errors.username} />

      <Input groupClass='icon-group' autoComplete='password' type='password' id='password' name='password' label='Contraseña' error={errors.password} touched={touched.password} />

      <Input
        groupClass='icon-group'
        autoComplete='password'
        type='password'
        id='confirm_password'
        name='confirm_password'
        label='Confirmar contraseña'
        error={errors.confirm_password}
        touched={touched.confirm_password}
      />
    </>
  );
};

export default AccountDetails;
