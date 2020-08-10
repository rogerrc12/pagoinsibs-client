import { SET_ALERT, REMOVE_ALERT } from './constants';

// Set alert message from DB
export const setAlert = (msg, iconType) => dispatch => {
  dispatch({
    type: SET_ALERT,
    payload: { msg, iconType }
  });
};

// remove alert
export const removeAlert = () => dispatch => {
  dispatch({ type: REMOVE_ALERT });
}