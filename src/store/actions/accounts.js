import axios from "../../helpers/axios";
import * as actionTypes from "../constants";
import { setAlert } from "./alert";
import { closeModal } from "./modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

// get user's bank accounts
export const getAccounts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/accounts");

    setTimeout(() => {
      dispatch({ type: actionTypes.REMOVE_SKELETON });
    }, 1000);
    dispatch({ type: actionTypes.ACCOUNTS_LOADED, payload: res.data });
  } catch (error) {
    const { message } = error.response.data;
    if (message) dispatch(setAlert(message, "error"));
    setTimeout(() => {
      dispatch({ type: actionTypes.REMOVE_SKELETON });
    }, 1000);
    dispatch({ type: actionTypes.ACCOUNTS_ERROR });
  }
};

// Add account to profile
export const addAccount = (data) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });

  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify(data);

    const { acc_id } = data;

    let res;
    if (acc_id !== null) {
      res = await axios.put(`/api/accounts/${acc_id}`, body, config);
    } else {
      res = await axios.post("/api/accounts", body, config);
    }

    dispatch({ type: actionTypes.REMOVE_LOADING });
    dispatch({ type: actionTypes.ACCOUNTS_LOADED, payload: res.data });
    dispatch(setAlert(acc_id ? "La cuenta fue actualizada." : "La cuenta fue agregada.", "success"));

    setTimeout(() => {
      dispatch(closeModal());
    }, 500);
  } catch (error) {
    dispatch({ type: actionTypes.REMOVE_LOADING });

    const { message } = error.response.data;
    if (message) dispatch(setAlert(message, "error"));

    return dispatch({ type: actionTypes.ACCOUNTS_ERROR });
  }
};

// Get account information
export const getAccountInfo = (id) => async (dispatch) => {
  if (id !== null) {
    try {
      const res = await axios.get(`/api/accounts/${id}`);
      dispatch({ type: actionTypes.GET_ACCOUNT_INFO, payload: res.data });
    } catch (error) {
      const { message } = error.response.data;
      if (message) dispatch(setAlert(message, "error"));
      dispatch({ type: actionTypes.GET_ACCOUNT_INFO_ERROR });
    }
  } else return false;
};

// Delete account
export const deleteAccount = (id) => (dispatch) => {
  MySwal.fire({
    title: "Deseas eliminiar esta cuenta?",
    text: "Los datos se borrarán y no podras revertir esa acción!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eiliminar",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.value) {
      dispatch({ type: actionTypes.SET_LOADING });
      try {
        const res = await axios.delete(`/api/accounts/${id}`);

        dispatch({ type: actionTypes.REMOVE_LOADING });
        dispatch({ type: actionTypes.ACCOUNTS_LOADED, payload: res.data });

        dispatch(setAlert("Cuenta eliminada correctamente.", "success"));
      } catch (error) {
        const { message } = error.response.data;
        if (message) dispatch(setAlert(message, "error"));

        dispatch({ type: actionTypes.ACCOUNTS_ERROR });
        dispatch({ type: actionTypes.REMOVE_LOADING });
      }
    }
  });
};
