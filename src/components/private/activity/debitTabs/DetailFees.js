import React from "react";
import Moment from "react-moment";
import { setCurrency } from "../../../../helpers/helpers";

const DetailFees = ({ detail }) => {
  return Object.keys(detail).length === 0 ? (
    <p>No hay datos para mostrar</p>
  ) : (
    <ul className='detail-list'>
      {detail.fees
        .sort((a, b) => Number(a.feeNo) - Number(b.feeNo))
        .map((fee) => (
          <li className='detail-item detail-fee' key={fee.id}>
            <p className='detail-left'>
              <span className='detail-fee__info'>
                Cuota #{fee.feeNo} <span className={`detail-fee__badge status ${fee.status.name}`}>{fee.status.name}</span>
              </span>
              <span className='detail-fee__date'>
                {!fee.completedDate ? (
                  <span>
                    Se cobrará antes de: <Moment format='DD MMM YYYY'>{fee.dueDate}</Moment>
                  </span>
                ) : (
                  <span>
                    cobrada el: <Moment format='DD MMM YYYY'>{fee.completedDate}</Moment>
                  </span>
                )}
              </span>
            </p>
            <span className='detail-right'>{setCurrency(detail.details.feeAmount) + " " + detail.details.currency.symbol}</span>
          </li>
        ))}
    </ul>
  );
};

export default DetailFees;
