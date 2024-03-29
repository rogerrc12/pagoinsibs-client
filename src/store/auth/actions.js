import * as actionTypes from "./actionTypes";

export const loadUser = () => ({
  type: actionTypes.LOAD_USER_INIT,
});

export const loadUserSuccess = (data) => ({
  type: actionTypes.LOAD_USER_SUCCESS,
  payload: data,
});

// Register action
export const startUserRegistration = (values, setNextPage) => ({
  type: actionTypes.START_REGISTRATION_INIT,
  values,
  setNextPage,
});

export const startUserRegistrationSuccess = () => ({
  type: actionTypes.START_REGISTRATION_SUCCESS,
});

export const completeUserRegistration = (values) => ({
  type: actionTypes.COMPLETE_REGISTRATION_INIT,
  values,
});

export const completeUserRegistrationSuccess = (data) => ({
  type: actionTypes.COMPLETE_REGISTRATION_SUCCESS,
  payload: data,
});

export const loginUser = (values) => ({
  type: actionTypes.LOGIN_INIT,
  values,
});

export const loginUserSuccess = (data) => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: data,
});

export const clearError = () => ({
  type: actionTypes.CLEAR_ERROR,
});

export const apiError = (msg) => ({
  type: actionTypes.API_ERROR,
  payload: msg,
});

export const setGoogleLogin = (res, history) => async (dispatch) => {
  //   const { tokenId } = res;
  //   const { pathname } = history.location;
  //   if (tokenId) {
  //     const config = { headers: { "Content-Type": "application/json" } };
  //     const body = JSON.stringify({ tokenId: tokenId });
  //     dispatch({ type: actionTypes.SET_LOADING });
  //     try {
  //       const res = await axios.post("/api/auth/google-oauth", body, config);
  //       const { registered, user, token } = res.data;
  //       dispatch({ type: actionTypes.REMOVE_LOADING });
  //       if (registered) {
  //         dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: token });
  //         return dispatch(loadUser());
  //       } else {
  //         dispatch({ type: actionTypes.REGISTER_SUCCESS, payload: user });
  //         return pathname === "/login" && history.push("/registro");
  //       }
  //     } catch (error) {
  //       const errors = error.response.data.errors;
  //       if (errors) dispatch(setAlert(errors[0].msg, "error"));
  //       return dispatch({ type: actionTypes.REMOVE_LOADING });
  //     }
  //   } else return null;
};

// // Set password Reset
export const sendPassResetInit = ({ email }) => ({
  type: actionTypes.SEND_PASS_RESET_INIT,
  email,
});

export const sendPassResetSuccess = () => ({
  type: actionTypes.SEND_PASS_RESET_SUCCESS,
});

export const checkPassResetToken = (resetType, token) => ({
  type: actionTypes.CHECK_PASS_RESET_TOKEN,
  resetType,
  token,
});

export const checkPassResetTokenSuccess = (email) => ({
  type: actionTypes.CHECK_PASS_RESET_TOKEN_SUCCESS,
  email,
});

export const resetPassInit = (values) => ({
  type: actionTypes.PASSWORD_RESET_INIT,
  values,
});

export const resetPassSuccess = () => ({
  type: actionTypes.PASSWORD_RESET_SUCCESS,
});

export const updateProfileInit = (values) => ({
  type: actionTypes.UPDATE_PROFILE_INIT,
  values,
});

export const updateProfileSuccess = () => ({
  type: actionTypes.UPDATE_PROFILE_SUCCESS,
});

// logout
export const logout = () => ({
  type: actionTypes.LOGOUT_INIT,
});

export const logoutSuccess = () => ({
  type: actionTypes.LOGOUT_SUCCESS,
});

export const clearUserData = () => ({
  type: actionTypes.CLEAR_USER_DATA,
});
