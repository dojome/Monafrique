import axios from 'axios'
import { LOGIN_API_URL } from '../constants/api'
export const login = (username, password) => {
  return axios
    .post(LOGIN_API_URL, { username, password })
    .then((response) => {
      if (response.data && response.data.success === true) {
        localStorage.setItem('user', JSON.stringify(response.data.data))
        return response.data
      }
      return false
    })
    .catch((err) => {
      console.log('login error message', err)
      return false
    })
}

export const logout = () => {
  localStorage.removeItem('user')
}
