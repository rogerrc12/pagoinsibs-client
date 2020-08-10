// get user's supplier payments activity
import axios from "../helpers/axios";
import * as actionTypes from "./constants";
import { setAlert } from "./alert";

export const getAllPayments = () => async (dispatch) => {
  dispatch({ type: actionTypes.SET_SKELETON });

  try {
    const res = await axios.get("/api/payments");

    dispatch({ type: actionTypes.PAYMENTS_LOADED, payload: res.data });
    dispatch({ type: actionTypes.REMOVE_SKELETON });
  } catch (error) {
    dispatch({ type: actionTypes.REMOVE_SKELETON });

    const { message } = error.response.data;
    if (message) dispatch(setAlert(message, "error"));

    dispatch({ type: actionTypes.PAYMENTS_ERROR });
  }
};

// get payment by type and id
export const getPayment = (type, id) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_SKELETON });

  try {
    const res = await axios.get(`/api/payments/${type}/${id}`);

    setTimeout(() => {
      dispatch({ type: actionTypes.REMOVE_SKELETON });
    }, 1000);
    return dispatch({ type: actionTypes.GET_PAYMENT_LOADED, payload: res.data });
  } catch (error) {
    const { message } = error.response.data;
    if (message) dispatch(setAlert(message, "error"));

    dispatch({ type: actionTypes.REMOVE_SKELETON });
    return dispatch({ type: actionTypes.GET_PAYMENT_ERROR });
  }
};
