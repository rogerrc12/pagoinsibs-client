import axios from "../helpers/axios";
import * as actionTypes from "../actions/constants";
import { setAlert } from "./alert";
import { closeModal } from "./modal";
import setAuthToken from "../helpers/setAuthToken";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

// Loading user data
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");
    return dispatch({ type: actionTypes.USER_LOADED, payload: res.data });
  } catch (error) {
    dispatch({ type: actionTypes.AUTH_ERROR });
  }
};

// Register action
export const registerUser = (userData) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });

  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify(userData);
    const res = await axios.post("/api/users", body, config);

    dispatch({ type: actionTypes.REMOVE_LOADING });
    dispatch({ type: actionTypes.REGISTER_SUCCESS, payload: res.data });
    return dispatch(loadUser());
  } catch (error) {
    const message = error.response.data.message;

    if (message) dispatch(setAlert(message, "error"));

    dispatch({ type: actionTypes.REGISTER_FAIL });
    dispatch({ type: actionTypes.REMOVE_LOADING });
  }
};

// Login action
export const loginUser = (data) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });

  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify(data);

    const res = await axios.post("/api/auth", body, config);

    dispatch({ type: actionTypes.REMOVE_LOADING });
    dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: res.data });
    return dispatch(loadUser());
  } catch (error) {
    const message = error.response.data.message;
    if (message) dispatch(setAlert(message, "error"));

    dispatch({ type: actionTypes.REMOVE_LOADING });
    return dispatch({ type: actionTypes.LOGIN_FAIL });
  }
};

// Login action with google
export const setGoogleLogin = (res, history) => async (dispatch) => {
  const { tokenId } = res;
  const { pathname } = history.location;

  if (tokenId) {
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify({ tokenId: tokenId });
    dispatch({ type: actionTypes.SET_LOADING });

    try {
      const res = await axios.post("/api/auth/google-oauth", body, config);
      const { registered, user, token } = res.data;
      dispatch({ type: actionTypes.REMOVE_LOADING });

      if (registered) {
        dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: token });
        return dispatch(loadUser());
      } else {
        dispatch({ type: actionTypes.GOOGLE_REGISTER_SUCCESS, payload: user });
        return pathname === "/login" && history.push("/registro");
      }
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) dispatch(setAlert(errors[0].msg, "error"));
      return dispatch({ type: actionTypes.REMOVE_LOADING });
    }
  } else return null;
};

// Set password Reset
export const setPasswordReset = ({ email }) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });

  try {
    const config = { headers: { "Content-Type": "application/json" } };

    const body = JSON.stringify({ email });
    const res = await axios.post("/api/users/reset", body, config);
    const { message } = res.data;

    dispatch({ type: actionTypes.REMOVE_LOADING });
    if (message) dispatch(setAlert(message, "success"));

    MySwal.fire({
      type: "success",
      title: "Mensaje enviado",
      text: "El correo para cambiar tu contraseña fue enviado correctamente. Recuerda revisar la carpeta spam.",
      confirmButtonText: "reenviar correo",
      showCancelButton: true,
      cancelButtonColor: "#259659",
      cancelButtonText: "OK!",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          const res = await axios.post("/api/users/reset", body, config);
          if (res.data.message) {
            dispatch(setAlert(message, "success"));
            return false;
          }
        } catch (error) {
          MySwal.showValidationMessage(error.response.data.message);
        }
      },
    });

    return true;
  } catch (error) {
    const message = error.response.data.message;
    if (message) dispatch(setAlert(message, "error"));

    dispatch({ type: actionTypes.RESET_FAIL });
    dispatch({ type: actionTypes.REMOVE_LOADING });
  }
};

// check reset password page
export const getResetPassword = (history, reset, token) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/users/password-reset?reset=${reset}&reset_token=${token}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    const { message } = error.response.data;
    if (message) dispatch(setAlert(message, "error"));
    setTimeout(() => history.push("/404"), 1000);
  }
};

// Reset password
export const resetPassword = (values, history) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });

  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    console.log(values);
    const body = JSON.stringify(values);
    const res = await axios.put("/api/users/password-reset", body, config);

    dispatch({ type: actionTypes.PASS_RESET_SUCCESS });
    dispatch({ type: actionTypes.REMOVE_LOADING });

    MySwal.fire({
      type: "success",
      title: "Contraseña cambiada",
      text: res.data.message,
      showConfirmButton: true,
      confirmButtonText: "Iniciar sesión",
    }).then((result) => {
      return history.push("/login");
    });
  } catch (error) {
    dispatch({ type: actionTypes.REMOVE_LOADING });
    dispatch({ type: actionTypes.PASS_RESET_FAIL });

    const { message } = error.response.data;
    if (message) return dispatch(setAlert(message, "error"));
  }
};

// logout for time out
export const timeOut = () => (dispatch) => {
  dispatch(setAlert("Su tiempo de conexión caducó. Por favor ingrese de nuevo.", "error"));
  dispatch(logout());
};

// logout
export const logout = () => (dispatch) => {
  dispatch({ type: actionTypes.REMOVE_LOADING });
  dispatch({ type: actionTypes.CLEAR_USER_DATA });
  return dispatch({ type: actionTypes.LOGOUT });
};

// Get user info by pay id
export const getUserInfoByPayId = (pay_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/users/transfer-to/${pay_id}`);
    return dispatch({ type: actionTypes.GET_RECEIVER_INFO, payload: res.data });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      if (errors[0].msg.includes("Token")) {
        dispatch(timeOut());
      } else {
        dispatch(setAlert(errors[0].msg, "error"));
      }
    }
    return dispatch({ type: actionTypes.GET_RECEIVER_INFO_ERROR });
  }
};

// Update user data
export const updateUser = (userInfo) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });

  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const body = JSON.stringify(userInfo);
    const res = await axios.put("/api/users/profile", body, config);

    dispatch({ type: actionTypes.USER_LOADED, payload: res.data });

    dispatch(setAlert("Perfil actualizado", "success"));
    dispatch({ type: actionTypes.REMOVE_LOADING });

    setTimeout(() => {
      dispatch(closeModal());
    }, 700);
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      if (errors[0].msg.includes("Token")) {
        dispatch(timeOut());
      } else {
        dispatch(setAlert(errors[0].msg, "error"));
      }
    }

    dispatch({ type: actionTypes.USER_ERROR });
    return dispatch({ type: actionTypes.REMOVE_LOADING });
  }
};
