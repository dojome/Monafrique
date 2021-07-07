import {
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
  SET_MESSAGE,
} from '../constants/types'
import * as OrdersService from '../services/orders.service'

export const getOrders = () => (dispatch) => {
  return OrdersService.getOrders().then(
    (data) => {
      dispatch({
        type: GET_ORDERS_SUCCESS,
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
        type: GET_ORDERS_FAIL,
      })

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      })

      return Promise.reject()
    },
  )
}
