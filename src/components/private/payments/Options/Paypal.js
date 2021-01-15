import React from "react";
import Input from "../../../UI/FormItems/Input";

import classes from "./Options.module.scss";

const Paypal = () => {
  return (
    <div className='col-12'>
      <div className={classes.ContainerInfo}>
        <p>Información de pago por Paypal</p>
      </div>
      <div className='form-group'>
        <Input label='Correo de pago Paypal' name='paypalEmail' type='text' />
      </div>
    </div>
  );
};

export default Paypal;
