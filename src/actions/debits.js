// get user's direct debits activity
import axios from "../helpers/axios";
import * as actionTypes from "./constants";
import { setAlert } from "./alert";

export const getAllDebits = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/debits");

    dispatch({ type: actionTypes.DEBITS_LOADED, payload: res.data });
  } catch (error) {
    const { message } = error.response.data;
    if (message) dispatch(setAlert(message, "error"));

    dispatch({ type: actionTypes.DEBITS_ERROR });
  }
};

// get debit by id
export const getDebitDetails = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_SKELETON });

  try {
    const res = await axios.get(`/api/debits/${id}`);

    setTimeout(() => {
      dispatch({ type: actionTypes.REMOVE_SKELETON });
    }, 1000);
    return dispatch({ type: actionTypes.GET_DEBIT_LOADED, payload: res.data });
  } catch (error) {
    const message = error.response.data.message;
    if (message) dispatch(setAlert(message, "error"));

    setTimeout(() => {
      dispatch({ type: actionTypes.REMOVE_SKELETON });
    }, 1000);
    return dispatch({ type: actionTypes.GET_DEBIT_ERROR });
  }
};
