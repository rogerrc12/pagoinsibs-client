import React from "react";

const WrapperButtons = (props) => {
  return (
    <div className='continue-form col-12 mx-auto mt-2'>
      {props.submitButton ? (
        <button type='submit' className={`continue-btn button ld-ext-right ${props.isProcessing ? "running" : ""}`} disabled={props.disabled || props.isProcessing}>
          <div class='ld ld-spin ld-ring' />
          Completar pago
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
