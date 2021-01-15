import * as actionTypes from "./actionTypes";
const initialState = {
  categories: [],
  suppliers: [],
  products: [],
  debitProducts: [],
  profile: {},
  productInfo: {},
  error: "",
};

export default function(state = initialState, action = {}) {
  const { type } = action;

  switch (type) {
    // case actionTypes.CATEGORIES_LOADED:
    //   return { ...state, categories: payload };
    case actionTypes.GET_SUPPLIERS_SUCCESS:
      return { ...state, suppliers: action.suppliers };
    case actionTypes.GET_SUPPLIER_INFO_SUCCESS:
      return { ...state, profile: action.info };
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return { ...state, products: action.products.products, debitProducts: action.products.debitProducts };
    case actionTypes.GET_PRODUCT_INFO_SUCCESS:
      return { ...state, productInfo: action.info };
    // case actionTypes.CATEGORIES_ERROR:
    //   return { ...state, categories: [] };

    case actionTypes.API_ERROR:
      return { ...state, error: action.msg };
    default:
      return state;
  }
}
