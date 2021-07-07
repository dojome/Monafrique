import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  GET_TAGS_SUCCESS,
  GET_TAGS_FAIL,
  POST_PRODUCT_SUCCESS,
  POST_PRODUCT_FAIL,
  SET_MESSAGE,
} from '../constants/types'
import * as ProductsService from '../services/products.service'

export const getProducts = () => (dispatch) => {
  return ProductsService.getProducts().then(
    (data) => {
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: { data },
      })
      return Promise.resolve()
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      dispatch({
        type: GET_PRODUCTS_FAIL,
      })

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      })

      return Promise.reject()
    },
  )
}

export const getCategories = () => (dispatch) => {
  return ProductsService.getCategories().then(
    (data) => {
      dispatch({
        type: GET_CATEGORIES_SUCCESS,
        payload: { data },
      })
      return Promise.resolve()
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      dispatch({
        type: GET_CATEGORIES_FAIL,
      })

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      })

      return Promise.reject()
    },
  )
}

export const getTags = () => (dispatch) => {
  return ProductsService.getTags().then(
    (data) => {
      dispatch({
        type: GET_TAGS_SUCCESS,
        payload: { data },
      })
      return Promise.resolve()
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      dispatch({
        type: GET_TAGS_FAIL,
      })

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      })

      return Promise.reject()
    },
  )
}

export const postProduct = (data) => (dispatch) => {
  return ProductsService.postProduct(data).then(
    (data) => {
      dispatch({
        type: POST_PRODUCT_SUCCESS,
        payload: { data },
      })
      return Promise.resolve()
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      dispatch({
        type: POST_PRODUCT_FAIL,
      })

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      })

      return Promise.reject()
    },
  )
}
