import { combineReducers } from 'redux'
import auth from './auth'
import message from './message'
import products from './products'
import orders from './orders'

const rootReducer = combineReducers({
  auth,
  message,
  products,
  orders,
})

export default rootReducer
