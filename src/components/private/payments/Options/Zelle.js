import React from "react";
import Input from "../../../UI/FormItems/Input";

import classes from "./Options.module.scss";

const Zelle = () => {
  return (
    <div className='col-12'>
      <div className={classes.ContainerInfo}>
        <p>Información de pago por Zelle</p>
      </div>
      <div className='form-group'>
        <Input label='Correo de pago zelle' name='zelleEmail' type='text' />
      </div>
    </div>
  );
};

export default Zelle;
