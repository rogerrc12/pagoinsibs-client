import * as types from "./actionTypes";

const initialState = {
  payments: [],
  paymentDetails: {},
  debits: [],
  debitDetails: {},
  error: "",
  isLoading: true,
  isProcessing: false,
};

export default function(state = initialState, action = {}) {
  const { type } = action;

  switch (type) {
    case types.CREATE_PAYMENT_INIT:
    case types.CREATE_DEBIT_INIT:
      return { ...state, isProcessing: true };

    case types.CREATE_PAYMENT_SUCCESS:
    case types.CREATE_DEBIT_SUCCESS:
      return { ...state, isProcessing: false };

    case types.GET_PAYMENTS_SUCCESS:
      return { ...state, payments: action.payments, isLoading: false };

    case types.GET_PAYMENT_DETAILS_SUCCESS:
      return { ...state, paymentDetails: action.details, isLoading: false };

    case types.GET_DEBITS_SUCCESS:
      return { ...state, debits: action.debits, isLoading: false };

    case types.GET_DEBIT_DETAILS_SUCCESS:
      return { ...state, debitDetails: action.details, isLoading: false };

    case types.API_ERROR:
      return { ...state, error: action.msg, isLoading: false, isProcessing: false };

    default:
      return state;
  }
}
