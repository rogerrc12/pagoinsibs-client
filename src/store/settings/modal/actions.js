import { SHOW_MODAL, CLOSE_MODAL } from "./types";

export const showModal = () => ({
  type: SHOW_MODAL,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});
