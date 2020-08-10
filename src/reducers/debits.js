import {
  DEBITS_ERROR,
  DEBITS_LOADED, GET_DEBIT_ERROR,
  GET_DEBIT_LOADED
} from "../actions/constants";

const initialState = {
  debits: [],
  debitDetails: {}
}

export default function(state = initialState, action ={}) {
  const { type, payload } = action;
  
  switch (type) {
    case DEBITS_LOADED :
      return {...state, debits: payload};
    case DEBITS_ERROR :
      return {...state, debits: []}
    case GET_DEBIT_LOADED :
      return {...state, debitDetails: payload};
    case GET_DEBIT_ERROR :
      return {...state, debitDetails: {}};
  
    default :
      return state;
  }
}