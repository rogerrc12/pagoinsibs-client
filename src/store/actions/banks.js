import * as actionTypes from "../constants";

export const getBanksInit = () => ({
  type: actionTypes.GET_BANK_INIT,
});

export const getBanks = (banks) => ({
  type: actionTypes.GET_BANKS_SUCCESS,
  payload: banks,
});

export const getBanksError = () => ({
  type: actionTypes.GET_BANKS_ERROR,
});

export const getCurrenciesInit = () => ({
  type: actionTypes.GET_CURRENCIES_INIT,
});

export const getCurrencies = (currencies) => ({
  type: actionTypes.GET_CURRENCIES_SUCCESS,
  payload: currencies,
});

export const getCurrenciesError = () => ({
  type: actionTypes.GET_CURRENCIES_ERROR,
});
