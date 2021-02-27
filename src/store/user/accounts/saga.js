import { all, takeLatest, put, call } from "redux-saga/effects";
import * as types from "./types";
import * as actions from "./actions";
import axios from "../../../helpers/axios";
import Swal from "sweetalert2";
import { closeModal } from "../../settings/modal/actions";

function* getAccounts() {
  try {
    const res = yield axios.get("/api/accounts");
    if (res.status === 200) yield put(actions.getAccountsSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* getAccountInfo(action) {
  const { id } = action;

  try {
    const res = yield axios.get(`/api/accounts/${id}`);
    if (res.status === 200) yield put(actions.getAccountInfoSuccess(res.data));
    yield put(actions.getAccountInfoSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* addAccount({ values }) {
  const { acc_id } = values;
  const url = acc_id ? `/api/accounts/${acc_id}` : "/api/accounts";

  try {
    const res = yield axios[acc_id ? "put" : "post"](url, values);
    if (res.status === 200) {
      yield put(actions.addAccountSuccess());
      yield put(actions.getAccountsInit());
      yield put(closeModal());
      yield call([Swal, "fire"], "Exitoso", `La cuenta fue ${acc_id ? "Actualizada" : "Agregada"} correctamente.`, "success");
    }
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

export default function*() {
  yield all([takeLatest(types.GET_ACCOUNTS_INIT, getAccounts), takeLatest(types.GET_ACCOUNT_INFO_INIT, getAccountInfo), takeLatest(types.ADD_ACCOUNT_INIT, addAccount)]);
}
