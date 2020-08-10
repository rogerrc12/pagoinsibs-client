import { 
  REGISTER_FAIL, 
  REGISTER_SUCCESS, 
  USER_LOADED,
  USER_ERROR,
  GET_RECEIVER_INFO,
  GET_RECEIVER_INFO_ERROR,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  RESET_SUCCESS,
  RESET_FAIL,
  LOGOUT,
  PASS_RESET_SUCCESS,
  PASS_RESET_FAIL,
  GOOGLE_REGISTER_SUCCESS
} from '../actions/constants';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user: {},
  receiver: {}
}

export default function(state = initialState, action = {}) {
  const { type, payload } = action;

  switch(type) {
    case USER_LOADED :
      return {...state, isAuthenticated: true, user: payload}
    case REGISTER_SUCCESS :
    case LOGIN_SUCCESS :
      localStorage.setItem('token', payload.token);
      return {...state, ...payload};
    case GOOGLE_REGISTER_SUCCESS :
      return {...state, user: payload}
    case RESET_SUCCESS :
      localStorage.setItem('token', payload.token);
      return {...state, ...payload, isAuthenticated: true};
    case GET_RECEIVER_INFO :
      return {...state, receiver: payload}
    case GET_RECEIVER_INFO_ERROR :
      return {...state, receiver: {}}
    case REGISTER_FAIL :
    case AUTH_ERROR :
    case LOGIN_FAIL :
    case RESET_FAIL :
    case PASS_RESET_SUCCESS :
    case LOGOUT :
      localStorage.removeItem('token');
      return {...state, user: {}, token: null, isAuthenticated: false, passwordReset: false};
    case  PASS_RESET_FAIL :
    case USER_ERROR :
      return {...state};
    default :
      return state;
  }
}