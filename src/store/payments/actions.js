import * as actionTypes from "./actionTypes";

export const getPaymentsInit = () => ({
  type: actionTypes.GET_PAYMENTS_INIT,
});

export const getPaymentsSuccess = (payments) => ({
  type: actionTypes.GET_PAYMENTS_SUCCESS,
  payments,
});

export const getPaymentDetailsInit = (id) => ({
  type: actionTypes.GET_PAYMENT_DETAILS_INIT,
  id,
});

export const getPaymentDetailsSuccess = (details) => ({
  type: actionTypes.GET_PAYMENT_DETAILS_SUCCESS,
  details,
});

export const getDebitsInit = () => ({
  type: actionTypes.GET_DEBITS_INIT,
});

export const getDebitsSuccess = (debits) => ({
  type: actionTypes.GET_DEBITS_SUCCESS,
  debits,
});

export const getDebitDetailsInit = (id) => ({
  type: actionTypes.GET_DEBIT_DETAILS_INIT,
  id,
});

export const getDebitDetailsSuccess = (details) => ({
  type: actionTypes.GET_DEBIT_DETAILS_SUCCESS,
  details,
});

export const createPaymentInit = (values) => ({
  type: actionTypes.CREATE_PAYMENT_INIT,
  values,
});

export const createPaymentSuccess = () => ({
  type: actionTypes.CREATE_PAYMENT_SUCCESS,
});

export const createDebitInit = (values) => ({
  type: actionTypes.CREATE_DEBIT_INIT,
  values,
});

export const createDebitSuccess = () => ({
  type: actionTypes.CREATE_DEBIT_SUCCESS,
});

export const apiError = () => ({
  type: actionTypes.API_ERROR,
});
