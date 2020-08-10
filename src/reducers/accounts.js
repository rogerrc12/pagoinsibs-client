import {
    ACCOUNTS_LOADED,
    ACCOUNTS_ERROR,
    GET_ACCOUNT_INFO, GET_ACCOUNT_INFO_ERROR
} from '../actions/constants';

const initialState = {
    accounts: [],
    accountInfo: {}
}

export default function(state = initialState, actions={}) {
    const { type, payload } = actions;

    switch (type) {
        case ACCOUNTS_LOADED:
            return {...state, accounts: payload}
        case ACCOUNTS_ERROR:
            return {...state, accounts: []}
            
        case GET_ACCOUNT_INFO :
            return {...state, accountInfo: payload};
        case GET_ACCOUNT_INFO_ERROR :
            return {...state, accountInfo: {}};
            
        default:
            return state;
    }
}