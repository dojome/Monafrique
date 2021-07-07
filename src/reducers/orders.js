import { handleActions } from 'redux-actions'
import { GET_ORDERS_SUCCESS, GET_ORDERS_FAIL } from '../constants/types'

const initialState = {}
const orders = handleActions(
  {
    [GET_ORDERS_SUCCESS]: (state, action) => ({
      ...state,
      orders: action.payload.data,
    }),
    [GET_ORDERS_FAIL]: (state, action) => ({
      ...state,
      orders: null,
    }),
  },
  initialState,
)

export default orders
