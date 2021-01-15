import * as actionTypes from "./actionTypes";

export const getBanksInit = () => ({
  type: actionTypes.GET_BANKS_INIT,
});

export const getBanks = (banks) => ({
  type: actionTypes.GET_BANKS_SUCCESS,
  payload: banks,
});

export const getCurrenciesInit = () => ({
  type: actionTypes.GET_CURRENCIES_INIT,
});

export const getCurrencies = (currencies) => ({
  type: actionTypes.GET_CURRENCIES_SUCCESS,
  payload: currencies,
});

export const apiError = () => ({
  type: actionTypes.API_ERROR,
});
