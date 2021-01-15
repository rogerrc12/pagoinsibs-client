import { SET_ALERT, REMOVE_ALERT } from "../constants";

const initialState = {
  iconType: "",
  open: false,
  message: "",
};

export default function(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return { ...state, message: payload.msg, iconType: payload.iconType, open: true };
    case REMOVE_ALERT:
      return { ...state, open: false };
    default:
      return state;
  }
}
