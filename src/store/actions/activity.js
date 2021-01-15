import axios from "../helpers/axios";
import * as actionTypes from "./constants";
import { setAlert } from "./alert";
import { timeOut } from "./auth";

// get user's transactions activity
export const getAllTransfers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/transfers");
    dispatch({ type: actionTypes.TRANSACTIONS_LOADED, payload: res.data });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      if (errors[0].msg.includes("Token")) {
        dispatch(timeOut());
      } else {
        dispatch(setAlert(errors[0].msg, "error"));
      }
    }

    dispatch({ type: actionTypes.TRANSACTIONS_ERROR });
  }
};
