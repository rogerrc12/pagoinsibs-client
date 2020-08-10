import { SHOW_MODAL, CLOSE_MODAL } from '../actions/constants';

const initialState = {
  show: false
}

export default function(state = initialState, action = {}) {
  switch(action.type) {
    case SHOW_MODAL :
      return {...state, show: true};
    case CLOSE_MODAL :
      return {...state, show: false};
    default :
      return state;
  }
}