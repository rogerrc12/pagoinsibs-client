import { SHOW_MODAL, CLOSE_MODAL } from '../constants';

export const showModal = () => (dispatch) => {
  dispatch({
    type: SHOW_MODAL,
  });
};

export const closeModal = (modalType) => (dispatch) => {
  dispatch({
    type: CLOSE_MODAL,
  });
};
