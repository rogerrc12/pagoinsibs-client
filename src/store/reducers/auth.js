import * as actionTypes from "../constants";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  user: {},
  receiver: {},
  error: "",
};

export default function(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.USER_LOADED:
      return { ...state, isAuthenticated: true, user: payload };
    case actionTypes.REGISTER_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return { ...state, ...payload };
    case actionTypes.GOOGLE_REGISTER_SUCCESS:
      return { ...state, user: payload };
    case actionTypes.RESET_SUCCESS:
      localStorage.setItem("token", payload.token);
      return { ...state, ...payload, isAuthenticated: true };
    case actionTypes.GET_RECEIVER_INFO:
      return { ...state, receiver: payload };
    case actionTypes.GET_RECEIVER_INFO_ERROR:
      return { ...state, receiver: {} };
    case actionTypes.API_ERROR:
    case actionTypes.RESET_FAIL:
    case actionTypes.PASS_RESET_SUCCESS:
    case actionTypes.LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return { ...state, user: {}, token: null, isAuthenticated: false, passwordReset: false, error: payload };
    case actionTypes.PASS_RESET_FAIL:
    case actionTypes.USER_ERROR:
      return { ...state };
    default:
      return state;
  }
}
