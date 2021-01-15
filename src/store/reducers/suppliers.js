import * as actionTypes from "../constants";
const initialState = {
  categories: [],
  suppliers: [],
  products: [],
  profile: {},
  productInfo: {},
};

export default function(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.CATEGORIES_LOADED:
      return { ...state, categories: payload };
    case actionTypes.GET_SUPPLIERS_SUCCESS:
      return { ...state, suppliers: action.suppliers };
    case actionTypes.SUPPLIER_PROFILE_LOADED:
      return { ...state, profile: payload };
    case actionTypes.PRODUCTS_LOADED:
      return { ...state, products: payload };
    case actionTypes.PRODUCT_INFO_LOADED:
      return { ...state, productInfo: payload };
    case actionTypes.PRODUCT_INFO_ERROR:
      return { ...state, productInfo: {} };
    case actionTypes.GET_SUPPLIERS_ERROR:
      return { ...state, suppliers: [] };
    case actionTypes.SUPPLIER_PROFILE_ERROR:
      return { ...state, profile: {} };
    case actionTypes.CATEGORIES_ERROR:
      return { ...state, categories: [] };
    case actionTypes.PRODUCTS_ERROR:
      return { ...state, products: [] };
    default:
      return state;
  }
}
