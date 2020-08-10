import { CATEGORIES_LOADED, CATEGORIES_ERROR, SUPPLIERS_ERROR, SUPPLIERS_LOADED, PRODUCTS_LOADED, PRODUCTS_ERROR, SUPPLIER_PROFILE_LOADED, SUPPLIER_PROFILE_ERROR, PRODUCT_INFO_ERROR, PRODUCT_INFO_LOADED } from '../actions/constants';
const initialState = {
  categories: [],
  suppliers: [],
  products: [],
  profile: {},
  productInfo: {}
}

export default function(state = initialState, action = {}) {
  const { type, payload } = action;

  switch(type) {
    case CATEGORIES_LOADED :
      return {...state, categories: payload }
    case SUPPLIERS_LOADED :
      return {...state, suppliers: payload }
    case SUPPLIER_PROFILE_LOADED :
      return {...state, profile: payload }
    case PRODUCTS_LOADED :
      return {...state, products: payload }
    case PRODUCT_INFO_LOADED :
      return {...state, productInfo: payload }
    case PRODUCT_INFO_ERROR :
      return {...state, productInfo: {} }
    case SUPPLIERS_ERROR :
      return {...state, suppliers: [] }
    case SUPPLIER_PROFILE_ERROR :
      return {...state, profile: {} }
    case CATEGORIES_ERROR :
      return {...state, categories: [] }
    case PRODUCTS_ERROR :
        return {...state, products: [] }
    default :
      return state;
  }
}