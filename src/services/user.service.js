import axios from 'axios'
import { LOGIN_API_URL } from '../constants/api'
export const login = (username, password) => {
  return axios.post(LOGIN_API_URL, { username, password }).then((response) => {
    if (response.data.jwt_token) {
      localStorage.setItem('token', response.data.jwt_token)
    }
    return response.data
  })
}
