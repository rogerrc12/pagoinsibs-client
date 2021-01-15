import * as types from "./actionTypes";

const initialState = {
  payments: [],
  paymentDetails: {},
  debits: [],
  debitDetails: {},
  error: "",
  isLoading: true,
};

export default function(state = initialState, action = {}) {
  const { type } = action;

  switch (type) {
    case types.GET_PAYMENTS_SUCCESS:
      return { ...state, payments: action.payments, isLoading: false };

    case types.GET_PAYMENT_DETAILS_SUCCESS:
      return { ...state, paymentDetails: action.details, isLoading: false };

    case types.GET_DEBITS_SUCCESS:
      return { ...state, debits: action.debits, isLoading: false };

    case types.GET_DEBIT_DETAILS_SUCCESS:
      return { ...state, debitDetails: action.details, isLoading: false };

    case types.API_ERROR:
      return { ...state, error: action.msg, isLoading: false };

    default:
      return state;
  }
}
