import React from "react";
import Dropzone from "../../../UI/FormItems/Dropzone";

import classes from "./Options.module.scss";

const Zelle = (props) => {
  return (
    <div className='col-12'>
      <div className={classes.ContainerInfo}>
        <p>Información de pago por Zelle</p>
        <ol className='payment-steps'>
          <li>Ingresa a la plataforma de pago zelle desde la app.</li>
          <li>Envia el monto de {props.amount} a nuestro correo de pago: text@example.com.</li>
          <li>Toma una captura de pantalla al pago enviado, justo como se muestra en la imagen.</li>
          <li>Sube tu captura de pantalla en el recuadro debajo.</li>
        </ol>
      </div>
      <div className='form-group'>
        <Dropzone label='Captura de zelle' name='zelleFile' setValue={props.setValue} value={props.value} />
      </div>
    </div>
  );
};

export default Zelle;
