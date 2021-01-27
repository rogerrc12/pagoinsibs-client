import { takeLatest, all, put, call } from "redux-saga/effects";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";
import axios from "../../helpers/axios";
import Swal from "sweetalert2";
import history from "../../helpers/history";

function* getPayments() {
  try {
    const res = yield axios.get("/api/payments");

    yield put(actions.getPaymentsSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* getPaymentDetails({ id }) {
  try {
    const res = yield axios.get(`/api/payments/${id}`);
    if (res.status === 200) yield put(actions.getPaymentDetailsSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* getDebits() {
  try {
    const res = yield axios.get("/api/debits");
    if (res.status === 200) yield put(actions.getDebitsSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* getDebitDetails({ id }) {
  try {
    const res = yield axios.get(`/api/debits/${id}`);
    if (res.status === 200) yield put(actions.getDebitDetailsSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* createPayment({ values }) {
  const formData = new FormData();

  formData.append("description", values.description);
  formData.append("amount", values.amount);
  formData.append("supplierId", values.supplierId);
  formData.append("accountId", values.accountId);
  formData.append("paymentType", values.paymentType);
  formData.append("productId", values.productId);
  formData.append("currencyId", values.currencyId);
  formData.append("cardNumber", values.cardNumber);
  formData.append("paypalEmail", values.paypalEmail);
  formData.append("paypalPaymentId", values.paypalPaymentId);
  formData.append("withCurrencyConversion", values.withCurrencyConversion);

  if (values.zelleFile) {
    formData.append("zelleFile", values.zelleFile);
  }

  try {
    const res = yield axios.post("/api/payments", formData);
    if (res.status === 200) {
      yield call(
        [Swal, "fire"],
        "Solicitud recibida",
        "Tu solicitud de cobro ha sido recibida, y pronto estaremos en contacto. Puedes ver tu correo para más información.",
        "success"
      );
      yield put(actions.createPaymentSuccess());
      return yield call([history, "push"], "/dashboard");
    }
  } catch (error) {
    yield call([Swal, "fire"], "Ha ocurrido un error", error.data.message, "error");
    yield put(actions.apiError());
  }
}

function* createDebit(action) {
  try {
    const res = yield axios.post("/api/debits", action.values);
    if (res.status === 200) {
      yield call(
        [Swal, "fire"],
        "Solicitud recibida",
        "Tu solicitud de domiciliación ha sido recibida, y pronto estaremos en contacto. Puedes ver tu correo para más información.",
        "success"
      );
      yield put(actions.createDebitSuccess());
      return yield call([history, "push"], "/dashboard");
    }
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

export default function*() {
  yield all([
    takeLatest(actionTypes.CREATE_PAYMENT_INIT, createPayment),
    takeLatest(actionTypes.GET_PAYMENTS_INIT, getPayments),
    takeLatest(actionTypes.GET_DEBITS_INIT, getDebits),
    takeLatest(actionTypes.CREATE_DEBIT_INIT, createDebit),
    takeLatest(actionTypes.GET_PAYMENT_DETAILS_INIT, getPaymentDetails),
    takeLatest(actionTypes.GET_DEBIT_DETAILS_INIT, getDebitDetails),
  ]);
}
