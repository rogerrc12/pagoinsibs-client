import axios from "../../helpers/axios";
import * as actionTypes from "../constants";
import { setAlert } from "./alert";
import { logout } from "./auth";
import { setCurrency } from "../../helpers/helpers";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

// Send money to another user
export const sendTransaction = (data) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });

  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify(data);

  try {
    const res = await axios.post("/api/transfers/send-transfer", body, config);

    dispatch({ type: actionTypes.REMOVE_LOADING });
    dispatch({ type: actionTypes.SEND_TRANSACTION_SUCCESS, payload: res.data });

    MySwal.fire({
      position: "center",
      type: "success",
      title: `Transferencia por Bs. ${setCurrency(data.amount)}`,
      text:
        "¡Tu solicitud de transferencia ha sido recibida!. Hemos enviado un correo con todos los detalles de la operación. Gracias por usar nuestros servicios.",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Cerrar sesión",
      confirmButtonColor: "#db5656",
      cancelButtonColor: "#37ce7b",
      cancelButtonText: "Continuar",
    }).then((result) => {
      if (result.value) {
        dispatch({ type: actionTypes.CLEAR_USER_DATA });
        dispatch(logout());
      }
    });

    return true;
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
    dispatch({ type: actionTypes.SEND_TRANSACTION_FAIL });

    return false;
  }
};

// Request money to another user
export const requestTransfer = (data) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });

  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify(data);
    const res = await axios.post("/api/transfers/request-transfer", body, config);

    dispatch({ type: actionTypes.REMOVE_LOADING });
    dispatch({ type: actionTypes.SEND_REQUEST_SUCCESS });

    MySwal.fire({
      position: "center",
      type: "success",
      title: `¡Solicitud enviada!`,
      text: `${
        data.amount
          ? "¡Tu solicitud de cobro ha sido enviada!. Hemos enviado un correo al usuario con todos los detalles."
          : "¡Tu invitación a unirse a PAGO INSIBS ha sido enviada al usuario!"
      }`,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Cerrar sesión",
      confirmButtonColor: "#db5656",
      cancelButtonColor: "#37ce7b",
      cancelButtonText: "Continuar",
    }).then((result) => {
      if (result.value) {
        dispatch({ type: actionTypes.CLEAR_USER_DATA });
        dispatch(logout());
      }
    });

    return res.data;
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
    dispatch({ type: actionTypes.SEND_TRANSACTION_FAIL });
  }
};

// Payment trough Credit Card
export const sendCcPayment = (data) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });

  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const body = JSON.stringify(data);
    const res = await axios.post("/api/payments/creditcard", body, config);

    dispatch({ type: actionTypes.REMOVE_LOADING });
    dispatch({ type: actionTypes.CC_PAYMENT_SUCCESS, payload: res.data });

    MySwal.fire({
      position: "center",
      type: "success",
      title: `Pago registrado por Bs. ${setCurrency(data.amount)}`,
      text:
        "¡Tu pago se ha procesado de forma exitosa!. Hemos enviado un correo con todos los detalles de la operación. Gracias por usar nuestros servicios.",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Cerrar sesión",
      confirmButtonColor: "#db5656",
      cancelButtonColor: "#37ce7b",
      cancelButtonText: "Continuar",
    }).then((result) => {
      if (result.value) {
        dispatch({ type: actionTypes.CLEAR_USER_DATA });

        dispatch(logout());
      }
    });

    return true;
  } catch (error) {
    const message = error.response.data.message;

    if (message) dispatch(setAlert(message, "error"));

    dispatch({ type: actionTypes.REMOVE_LOADING });
    dispatch({ type: actionTypes.CC_PAYMENT_FAIL });

    return false;
  }
};

// Paymeny trough bank account
export const sendAccPayment = (data) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });

  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const body = JSON.stringify(data);
    const res = await axios.post("/api/payments/account", body, config);

    dispatch({ type: actionTypes.REMOVE_LOADING });
    dispatch({
      type: actionTypes.SEND_TRANSACTION_SUCCESS,
      payload: res.data,
    });

    MySwal.fire({
      position: "center",
      type: "success",
      title: `Pago por Bs. ${setCurrency(data.amount)}`,
      text:
        "¡Tu solicitud de pago ha sido recibida!. Hemos enviado un correo con todos los detalles de la operación. Gracias por usar nuestros servicios.",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Cerrar sesión",
      confirmButtonColor: "#db5656",
      cancelButtonColor: "#37ce7b",
      cancelButtonText: "Continuar",
    }).then((result) => {
      if (result.value) {
        dispatch({ type: actionTypes.CLEAR_USER_DATA });

        dispatch(logout());
      }
    });

    return true;
  } catch (error) {
    dispatch({ type: actionTypes.REMOVE_LOADING });
    dispatch({ type: actionTypes.SEND_TRANSACTION_FAIL });

    const message = error.response.data.message;

    if (message) dispatch(setAlert(message, "error"));
  }
};

export const sendDirectDebit = (data) => async (dispatch) => {
  // dispatch({ type: actionTypes.SET_LOADING })

  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify(data);

  try {
    const res = await axios.post("/api/debits", body, config);

    dispatch({ type: actionTypes.REMOVE_LOADING });
    dispatch({ type: actionTypes.SEND_DEBIT_SUCCESS, payload: res.data });

    MySwal.fire({
      position: "center",
      type: "success",
      title: `¡Solicitud recibida!`,
      html: `Hemos enviado un email con toda la información de esta operación. Gracias por usar nuestros servicios.`,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Cerrar sesión",
      confirmButtonColor: "#db5656",
      cancelButtonColor: "#37ce7b",
      cancelButtonText: "Continuar",
    }).then((result) => {
      if (result.value) {
        return dispatch(logout());
      }
    });

    return true;
  } catch (error) {
    dispatch({ type: actionTypes.REMOVE_LOADING });
    dispatch({ type: actionTypes.SEND_DEBIT_FAIL });

    const message = error.response.data.message;
    if (message) dispatch(setAlert(message, "error"));
  }
};
