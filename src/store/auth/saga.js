import { all, takeLatest, call, put } from "redux-saga/effects";
import * as actions from "./actions";
import * as types from "./actionTypes";
import axios from "../../helpers/axios";
import setAuthToken from "../../helpers/setAuthToken";
import history from "../../helpers/history";
import { closeModal } from "../settings/modal/actions";
import Swal from "sweetalert2";

function* loadUser() {
  if (localStorage.token) setAuthToken(localStorage.token);

  try {
    const res = yield axios.get("/api/auth");
    if (res.status === 200) yield put(actions.loadUserSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* loginUser(action) {
  try {
    const res = yield axios.post("/api/auth", action.values);
    if (res.status === 200) {
      yield put(actions.loginUserSuccess(res.data));
      yield call(loadUser);
    }
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* registerUser(action) {
  try {
    const res = yield axios.post("/api/users", action.values);

    if (res.status === 200) {
      yield put(actions.registerUserSuccess(res.data));
      yield call(loadUser);
    }
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* logout() {
  yield put(actions.clearUserData());
  yield put(actions.logoutSuccess());
  yield call([history, "push"], "/login");
}

function* sendPassReset(action) {
  const values = { email: action.email };

  try {
    const res = yield axios.post("/api/users/reset", values);
    if (res.status === 200) {
      yield put(actions.sendPassResetSuccess());
      yield call([Swal, "fire"], "Correo enviado!", "El correo para cambiar su contraseña ha sido enviado. Recuerde revisar su carpeta spam", "success");
    }
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* checkPassResetToken(action) {
  const { resetType, token } = action;

  if (!token) yield call([history, "push"], "/404");

  try {
    const res = yield axios.get(`/api/users/password-reset?reset=${resetType}&reset_token=${token}`);
    if (res.status === 200) yield put(actions.checkPassResetTokenSuccess(res.data.email));
  } catch (error) {
    yield call([history, "push"], "/404");
    yield put(actions.apiError(error.message));
  }
}

function* resetPassword(action) {
  try {
    const res = yield axios.put("/api/users/password-reset", action.values);
    if (res.status === 200) {
      yield put(actions.resetPassSuccess());
      yield call([Swal, "fire"], "Contraseña cambiada!", "ya puedes iniciar sesión.", "success");

      yield call([history, "push"], "/login");
    }
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* updateProfile({ values }) {
  try {
    const res = yield axios.put("/api/users/profile", values);
    if (res.status === 200) {
      yield put(actions.updateProfileSuccess());
      yield call(loadUser);

      yield call([Swal, "fire"], "Exitoso", "Su perfil ha sido actualizado!", "success");
      yield put(closeModal());
    }
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

export default function*() {
  yield all([
    takeLatest(types.LOGIN_INIT, loginUser),
    takeLatest(types.LOAD_USER_INIT, loadUser),
    takeLatest(types.LOGOUT_INIT, logout),
    takeLatest(types.REGISTER_INIT, registerUser),
    takeLatest(types.SEND_PASS_RESET_INIT, sendPassReset),
    takeLatest(types.CHECK_PASS_RESET_TOKEN, checkPassResetToken),
    takeLatest(types.PASSWORD_RESET_INIT, resetPassword),
    takeLatest(types.UPDATE_PROFILE_INIT, updateProfile),
  ]);
}