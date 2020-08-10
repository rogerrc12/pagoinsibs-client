import { 
  SEND_TRANSACTION_FAIL, 
  SEND_TRANSACTION_PENDING, 
  SEND_TRANSACTION_SUCCESS,
  CC_PAYMENT_PENDING,
  CC_PAYMENT_SUCCESS,
  CC_PAYMENT_FAIL,
  SEND_REQUEST_SUCCESS,
  SEND_DEBIT_PENDING,
  SEND_DEBIT_SUCCESS,
  SEND_DEBIT_FAIL,
} 
from '../actions/constants';

const initialState = {
  loading: false,
  transaction: {}
}

export default function(state = initialState, action = {}) {
  const { type, payload } = action;

  switch(type) {
    case SEND_TRANSACTION_PENDING :
    case CC_PAYMENT_PENDING :
    case SEND_DEBIT_PENDING :
      return { ...state, loading: true };
    case SEND_TRANSACTION_SUCCESS :
    case CC_PAYMENT_SUCCESS :
    case SEND_DEBIT_SUCCESS :
      return { ...state, transaction: payload, loading: false };
    case SEND_REQUEST_SUCCESS :
      return {...state, loading: false };
    case SEND_TRANSACTION_FAIL :
    case CC_PAYMENT_FAIL :
    case SEND_DEBIT_FAIL :
      return { ...state, transaction: {}, loading: false };
    default :
      return state;
  }
}