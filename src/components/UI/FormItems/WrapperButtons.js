import React from "react";

const WrapperButtons = (props) => {
  return (
    <div className='continue-form col-12 mx-auto mt-4'>
      {props.submitButton ? (
        <button type='submit' className='continue-btn button' disabled={props.disabled}>
          Confirmar pago
        </button>
      ) : (
        <button type={props.type} className='continue-btn button' disabled={props.disabled} onClick={props.nextPage}>
          Continuar
        </button>
      )}
      <button type={props.type} className='previous-btn button' onClick={props.prevPage}>
        ir atrás
      </button>
    </div>
  );
};

export default WrapperButtons;
