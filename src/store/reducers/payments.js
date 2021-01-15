import { GET_PAYMENT_ERROR, GET_PAYMENT_LOADED, PAYMENTS_ERROR, PAYMENTS_LOADED } from "../constants";

const initialState = {
  payments: [],
  paymentDetails: {},
};

export default function(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case PAYMENTS_LOADED:
      return { ...state, payments: payload };
    case PAYMENTS_ERROR:
      return { ...state, payments: [] };

    case GET_PAYMENT_LOADED:
      return { ...state, paymentDetails: payload };
    case GET_PAYMENT_ERROR:
      return { ...state, paymentDetails: {} };

    default:
      return state;
  }
}
