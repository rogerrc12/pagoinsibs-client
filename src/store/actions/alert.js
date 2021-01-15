import { SET_ALERT, REMOVE_ALERT } from "../constants";

// Set alert message from DB
export const setAlert = (msg, iconType) => ({
  type: SET_ALERT,
  payload: { msg, iconType },
});

// remove alert
export const removeAlert = () => ({
  type: REMOVE_ALERT,
});
