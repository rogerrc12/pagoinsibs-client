import { SET_LOADING, REMOVE_LOADING, SET_SKELETON, REMOVE_SKELETON } from "../constants";
const initialState = { loading: false, skeleton: true };

export default function(state = initialState, action = {}) {
  const { type } = action;

  switch (type) {
    case SET_LOADING:
      return { ...state, loading: true };
    case SET_SKELETON:
      return { ...state, skeleton: true };

    case REMOVE_LOADING:
      return { ...state, loading: false };
    case REMOVE_SKELETON:
      return { ...state, skeleton: false };

    default:
      return state;
  }
}
