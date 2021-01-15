import * as actionTypes from "../constants";
const initialState = {
  banks: [],
  currencies: [],
};

export default function(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_BANKS_SUCCESS:
      return { ...state, banks: payload };
    case actionTypes.GET_BANKS_ERROR:
      return { ...state, banks: [] };
    case actionTypes.GET_CURRENCIES_SUCCESS:
      return { ...state, currencies: payload };
    default:
      return state;
  }
}
