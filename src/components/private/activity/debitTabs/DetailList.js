import React from "react";

const DetailList = ({ detail }) => {
  return !detail.details ? (
    <p>No hay datos para mostrar</p>
  ) : (
    <ul className='detail-list'>
      <li className='detail-item detail-status'>
        <span className={`detail-right status ${detail.details.status.name}`}>{detail.details.status.name}</span>
      </li>
      <li className='detail-item'>
        <span className='detail-left'>Producto domiciliado:</span>
        <span className='detail-right'>{detail.details.product.name}</span>
      </li>
      <li className='detail-item'>
        <span className='detail-left'>Forma de pago de las cuotas:</span>
        <span className='detail-right'>{detail.details.paymentType}</span>
      </li>
      <li className='detail-item'>
        <span className='detail-left'>Frecuencia del pago:</span>
        <span className='detail-right'>
          {detail.details.paymentFrequency === null ? "cuotas" : detail.details.paymentFrequency + " cuotas"} {detail.details.paymentPeriod + "es"}
        </span>
      </li>
      {detail.details.paymentType === "account" && (
        <>
          <li className='detail-item'>
            <span className='detail-left'>Banco a debitar:</span>
            <span className='detail-right'>{detail.details.bankName}</span>
          </li>
          <li className='detail-item'>
            <span className='detail-left'>Número de cuenta:</span>
            <span className='detail-right'>termina en {detail.details.accNumber && detail.details.accNumber.substring(16, 20)}</span>
          </li>
          <li className='detail-item'>
            <span className='detail-left'>Tipo de cuenta:</span>
            <span className='detail-right'>{detail.details.accType}</span>
          </li>
        </>
      )}
    </ul>
  );
};

export default DetailList;
