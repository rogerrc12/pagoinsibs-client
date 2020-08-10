import { GET_BANKS, GET_BANKS_ERROR } from '../actions/constants';
const initialState = {
  banks: []
}

export default function (state = initialState, action = {}) {
  const { type, payload } = action;

  switch(type) {
    case GET_BANKS:
      return {...state, banks: payload}
    case GET_BANKS_ERROR :
      return {...state, banks: []}
    default :
      return state;
  }
}