import { put, all, takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";
import axios from "../../../helpers/axios";

function* getSuppliers(action) {
  let url = "/api/admin/suppliers";

  if (action.idType) url = `/api/suppliers/${action.idType}`;

  try {
    const res = yield axios.get(url);

    if (res.status === 200) yield put(actions.getSuppliers(res.data));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* getSupplierInfo(action) {
  const { id } = action;

  try {
    const res = yield axios.get(`/api/suppliers/profile/${id}`);
    if (res.status === 200) yield put(actions.getSupplierInfoSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* getProducts(action) {
  const { id } = action;

  try {
    const res = yield axios.get(`/api/suppliers/products/${id}`);

    if (res.status === 200) {
      const products = {
        products: res.data.length > 0 ? res.data.filter((product) => !product.isDirectDebit) : [],
        debitProducts: res.data.length > 0 ? res.data.filter((product) => product.isDirectDebit) : [],
      };

      yield put(actions.getProductsSuccess(products));
    }
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* getProductInfo(action) {
  const { id } = action;

  try {
    const res = yield axios.get(`/api/suppliers/products/info/${id}`);
    if (res.status === 200) yield put(actions.getProductInfoSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

export default function*() {
  yield all([
    takeLatest(actionTypes.GET_SUPPLIERS_INIT, getSuppliers),
    takeLatest(actionTypes.GET_SUPPLIER_INFO_INIT, getSupplierInfo),
    takeLatest(actionTypes.GET_PRODUCTS_INIT, getProducts),
    takeLatest(actionTypes.GET_PRODUCT_INFO_INIT, getProductInfo),
  ]);
}
