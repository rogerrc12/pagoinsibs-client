import * as actionTypes from "./actionTypes";
const initialState = {
  banks: [],
  currencies: [],
  error: "",
};

export default function(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_BANKS_SUCCESS:
      return { ...state, banks: payload };
    case actionTypes.GET_CURRENCIES_SUCCESS:
      return { ...state, currencies: payload };

    case actionTypes.API_ERROR:
      return { ...state, error: "" };
    default:
      return state;
  }
}
