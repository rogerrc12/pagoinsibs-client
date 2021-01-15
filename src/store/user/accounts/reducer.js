import * as types from "./types";

const initialState = {
  accounts: [],
  accountInfo: {},
  error: "",
};

export default function(state = initialState, action = {}) {
  const { type } = action;

  switch (type) {
    case types.GET_ACCOUNTS_SUCCESS:
      return { ...state, accounts: action.accounts };

    case types.GET_ACCOUNT_INFO_SUCCESS:
      return { ...state, accountInfo: action.info };

    case types.API_ERROR:
      return { ...state, error: action.msg };

    default:
      return state;
  }
}
