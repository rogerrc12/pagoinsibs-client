import * as actionTypes from "./actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  user: {},
  receiver: {},
  error: "",
  isLoading: false,
  resetEmail: "",
};

export default function(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.LOAD_USER_INIT:
    case actionTypes.LOGIN_INIT:
    case actionTypes.REGISTER_INIT:
      return { ...state, isLoading: true };

    case actionTypes.LOAD_USER_SUCCESS:
      return { ...state, isAuthenticated: true, user: payload, isLoading: false };
    case actionTypes.REGISTER_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return { ...state, ...payload, isLoading: false };
    case actionTypes.CHECK_PASS_RESET_TOKEN_SUCCESS:
      return { ...state, resetEmail: action.email };
    case actionTypes.PASSWORD_RESET_SUCCESS:
    case actionTypes.LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return { ...state, user: {}, resetEmail: "", token: null, isAuthenticated: false, passwordReset: false, isLoading: false };

    case actionTypes.API_ERROR:
      return { ...state, error: payload, isLoading: false };

    case actionTypes.CLEAR_ERROR:
      return { ...state, error: "" };
    default:
      return state;
  }
}
