import axios from 'axios';
import { GET_ME, POST_LOGIN, POST_LOGOUT } from './constantesLog'

export function postLogin(usuario) {      //agrega un nuevo usuario
  const request = axios.post('http://localhost:3001/auth/login', usuario)
  return { type: POST_LOGIN, payload: request };
}
export function postLogout(usuario) {      //agrega un nuevo usuario
  const request = axios.post('http://localhost:3001/auth/logout', usuario)
  return { type: POST_LOGOUT, payload: request };
}

export function getMe() {      //trae todos los usuarios
  const request = axios.get('http://localhost:3001/auth/me')
  return { type: GET_ME, users: request };
}