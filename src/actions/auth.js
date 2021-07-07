import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from '../constants/types'
import * as AuthService from '../services/auth.service'

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (res) => {
      if (res.success === true) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { data: res.data },
        })
      } else {
        dispatch({
          type: LOGIN_FAIL,
        })
        // console.log(res.message)
        // dispatch({
        //   type: SET_MESSAGE,
        //   payload: res.message,
        // })
        throw res.message
      }

      return Promise.resolve()
    },
    (error) => {
      console.log(error)
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      dispatch({
        type: LOGIN_FAIL,
      })

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      })

      return Promise.reject()
    },
  )
}

export const logout = () => (dispatch) => {
  AuthService.logout()
  dispatch({
    type: LOGOUT,
  })
}
