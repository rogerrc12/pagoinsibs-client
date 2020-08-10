import {  TRANSACTIONS_ERROR,  TRANSACTIONS_LOADED, CLEAR_USER_DATA } from '../actions/constants';

const initialState = {
  transfers: [],
  detail: {}
}

export default function(state = initialState, action = {}) {
  const { type, payload } = action;

  switch(type) {

    case TRANSACTIONS_LOADED :
      return {...state, transfers: payload};

    case TRANSACTIONS_ERROR :
      return {...state, transfers: []};

    case CLEAR_USER_DATA :
      return {...state, transfers: [], payments: [], debits: [], detail: {}, accounts: { toSend: [], toReceive: [] }};
    
    default :
      return state;
  }
}