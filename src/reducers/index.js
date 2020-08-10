import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import activity from './activity';
import debits from './debits';
import payments from './payments';
import accounts from './accounts';
import modal from './modal';
import transactions from './transactions';
import suppliers from './suppliers';
import loading from './loading';
import banks from './banks';


export default combineReducers({
  loading,
  alert,
  modal,
  auth,
  activity,
  debits,
  payments,
  accounts,
  transactions,
  suppliers,
  banks
});