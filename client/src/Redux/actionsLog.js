import axios from 'axios';
import { GET_ME, POST_LOGIN, POST_LOGOUT, HACER_ADMIN } from './constantesLog'
var _axios = axios.create({
  withCredentials: true
})

export function postLogin(usuario) {      //Login
  const request = _axios.post('http://localhost:3001/auth/login', usuario)
  return { type: POST_LOGIN, payload: request };
}
export function postLogout() {      //
  const request = _axios.post('http://localhost:3001/auth/logout')
  return { type: POST_LOGOUT, payload: request };
}

export function postAdmin(user_id) {
  const request = _axios.post(`http://localhost:3001/auth/promote/${user_id}`)
  return { type: HACER_ADMIN, payload: request }
}

export function getMe() {      //
  const request = _axios.get('http://localhost:3001/auth/me')
  return { type: GET_ME, payload: request };
}
