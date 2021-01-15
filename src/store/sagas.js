import { all } from "redux-saga/effects";
import banksSaga from "./settings/banks/saga";
import paymentsSaga from "./payments/saga";
import suppliersSaga from "./settings/suppliers/saga";
import authSaga from "./auth/saga";
import accountsSaga from "./user/accounts/saga";
// import debitsSagas from "./sagas/debits";

export default function* rootSaga() {
  yield all([authSaga(), banksSaga(), suppliersSaga(), paymentsSaga(), accountsSaga()]);
}
