import { SHOW_MODAL, CLOSE_MODAL } from "../constants";

export const showModal = () => (dispatch) => {
  dispatch({
    type: SHOW_MODAL,
  });
};

export const closeModal = () => (dispatch) => {
  dispatch({
    type: CLOSE_MODAL,
  });
};
