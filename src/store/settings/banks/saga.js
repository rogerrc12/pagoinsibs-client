import { put, all, takeLatest } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import axios from "../../../helpers/axios";

function* getBanks() {
  try {
    const res = yield axios.get("/api/banks");
    yield put(actions.getBanks(res.data));
  } catch (error) {
    yield put(actions.apiError());
  }
}

function* getCurrencies() {
  try {
    const res = yield axios.get("/api/currencies");
    yield put(actions.getCurrencies(res.data));
  } catch (error) {
    yield put(actions.apiError());
  }
}

export default function*() {
  yield all([takeLatest(actionTypes.GET_CURRENCIES_INIT, getCurrencies), takeLatest(actionTypes.GET_BANKS_INIT, getBanks)]);
}
