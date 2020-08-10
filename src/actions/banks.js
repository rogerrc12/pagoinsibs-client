import axios from "../helpers/axios";
import { GET_BANKS_ERROR, GET_BANKS } from "./constants";
import { setAlert } from "./alert";

export const getBanks = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/banks");
    return dispatch({ type: GET_BANKS, payload: res.data });
  } catch (error) {
    const { message } = error.response.data;
    if (message) dispatch(setAlert(message, "error"));

    dispatch({ type: GET_BANKS_ERROR });
  }
};
