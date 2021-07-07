import { handleActions } from 'redux-actions'
import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  GET_TAGS_SUCCESS,
  GET_TAGS_FAIL,
  POST_PRODUCT_SUCCESS,
  POST_PRODUCT_FAIL,
} from '../constants/types'

const initialState = {}
const products = handleActions(
  {
    [GET_PRODUCTS_SUCCESS]: (state, action) => ({
      ...state,
      products: action.payload.data,
    }),
    [GET_PRODUCTS_FAIL]: (state, action) => ({
      ...state,
      products: null,
    }),
    [GET_CATEGORIES_SUCCESS]: (state, action) => ({
      ...state,
      categories: action.payload.data,
    }),
    [GET_CATEGORIES_FAIL]: (state, action) => ({
      ...state,
      categories: null,
    }),
    [GET_TAGS_SUCCESS]: (state, action) => ({
      ...state,
      tags: action.payload.data,
    }),
    [GET_TAGS_FAIL]: (state, action) => ({
      ...state,
      tags: null,
    }),
    [POST_PRODUCT_SUCCESS]: (state, action) => ({
      ...state,
      products: state.products.reverse().concat(action.payload.data).reverse(),
      new_product: action.payload.data,
    }),
    [POST_PRODUCT_FAIL]: (state, action) => ({ ...state, new_product: null }),
  },
  initialState,
)

export default products
