import { combineReducers } from "redux";

import Auth from "./auth/reducer";
import Modal from "./settings/modal/reducer";
import Payments from "./payments/reducer";
import Accounts from "./user/accounts/reducer";
import Banks from "./settings/banks/reducer";
import Alert from "./settings/alert/reducer";
import Suppliers from "./settings/suppliers/reducer";

export default combineReducers({
  Alert,
  Modal,
  Accounts,
  Banks,
  Payments,
  Auth,
  Suppliers,
});
