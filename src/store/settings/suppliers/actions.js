import * as actionTypes from "./actionTypes";

export const getSuppliersInit = (idType) => ({
  type: actionTypes.GET_SUPPLIERS_INIT,
  idType,
});

export const getSuppliers = (suppliers) => ({
  type: actionTypes.GET_SUPPLIERS_SUCCESS,
  suppliers,
});

export const getSupplierInfoInit = (id) => ({
  type: actionTypes.GET_SUPPLIER_INFO_INIT,
  id,
});

export const getSupplierInfoSuccess = (info) => ({
  type: actionTypes.GET_SUPPLIER_INFO_SUCCESS,
  info,
});

export const getProductsInit = (id) => ({
  type: actionTypes.GET_PRODUCTS_INIT,
  id,
});

export const getProductsSuccess = (products) => ({
  type: actionTypes.GET_PRODUCTS_SUCCESS,
  products,
});

export const getProductInfoInit = (id) => ({
  type: actionTypes.GET_PRODUCT_INFO_INIT,
  id,
});

export const getProductInfoSuccess = (info) => ({
  type: actionTypes.GET_PRODUCT_INFO_SUCCESS,
  info,
});

export const apiError = (msg) => ({
  type: actionTypes.API_ERROR,
  msg,
});
