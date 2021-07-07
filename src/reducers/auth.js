import { handleActions } from 'redux-actions'
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../constants/types'

const user = JSON.parse(localStorage.getItem('user'))

const initialState =
  user && user.token
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null }
const auth = handleActions(
  {
    [LOGIN_SUCCESS]: (state, action) => ({
      ...state,
      isLoggedIn: true,
      user: action.payload.data,
    }),
    [LOGIN_FAIL]: (state, action) => ({
      ...state,
      isLoggedIn: false,
      user: null,
    }),
    [LOGOUT]: (state, action) => ({
      ...state,
      isLoggedIn: false,
      user: null,
    }),
  },
  initialState,
)

export default auth
