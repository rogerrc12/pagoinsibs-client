import axios from "../helpers/axios";
import * as actionTypes from "./constants";
import { setAlert } from "./alert";
import { logout } from "./auth";

export const getSuppliers = (id) => async (dispatch) => {
  if (id !== null) {
    dispatch({ type: actionTypes.SET_LOADING });

    try {
      const res = await axios.get(`/api/suppliers/${id}`);

      dispatch({ type: actionTypes.SUPPLIERS_LOADED, payload: res.data });

      dispatch({ type: actionTypes.REMOVE_LOADING });
    } catch (error) {
      const { message } = error.response.data;

      if (message) dispatch(setAlert(message, "error"));

      dispatch({ type: actionTypes.REMOVE_LOADING });
      dispatch({ type: actionTypes.SUPPLIERS_ERROR });
    }
  } else {
    return false;
  }
};

export const getSupplierProfile = (id) => async (dispatch) => {
  if (id !== null) {
    dispatch({ type: actionTypes.SET_LOADING });

    try {
      const res = await axios.get(`/api/suppliers/profile/${id}`);

      dispatch({ type: actionTypes.SUPPLIER_PROFILE_LOADED, payload: res.data });
      dispatch({ type: actionTypes.REMOVE_LOADING });
    } catch (error) {
      const { message } = error.response.data;

      if (message) dispatch(setAlert(message, "error"));

      dispatch({ type: actionTypes.SUPPLIER_PROFILE_ERROR });
      dispatch({ type: actionTypes.REMOVE_LOADING });
    }
  } else return false;
};

export const getProducts = (id) => async (dispatch) => {
  if (id !== null) {
    dispatch({ type: actionTypes.SET_LOADING });

    try {
      const res = await axios.get(`/api/suppliers/products/${id}`);

      dispatch({
        type: actionTypes.PRODUCTS_LOADED,
        payload: res.data,
      });

      return dispatch({ type: actionTypes.REMOVE_LOADING });
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        if (errors[0].msg.toLowerCase().includes("token")) {
          return dispatch(logout());
        } else {
          dispatch(setAlert(errors[0].msg, "error"));
        }
      }

      dispatch({ type: actionTypes.REMOVE_LOADING });
      dispatch({ type: actionTypes.PRODUCTS_ERROR });
    }
  } else return false;
};

export const getProductInfo = (id) => async (dispatch) => {
  if (id !== null) {
    dispatch({ type: actionTypes.SET_LOADING });

    try {
      const res = await axios.get(`/api/suppliers/products/info/${id}`);

      dispatch({ type: actionTypes.PRODUCT_INFO_LOADED, payload: res.data });

      return dispatch({ type: actionTypes.REMOVE_LOADING });
    } catch (error) {
      console.log(error);
      const errors = error.response.data.errors;

      if (errors) {
        if (errors[0].msg.toLowerCase().includes("token")) {
          return dispatch(logout());
        } else {
          dispatch(setAlert(errors[0].msg, "error"));
        }
      }

      dispatch({ type: actionTypes.REMOVE_LOADING });
      dispatch({ type: actionTypes.PRODUCT_INFO_ERROR });
    }
  } else return false;
};
