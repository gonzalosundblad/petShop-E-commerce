import axios from 'axios';
import { ME, LOGIN_SUCCESS, LOGOUT, HACER_ADMIN } from './constantsLogin'
var _axios = axios.create({
  withCredentials: true
})

export function postLogin(user) {//va a REDUCER
  console.log(user)
  return {
    type: LOGIN_SUCCESS,
    payload: user
  }
}
export function postLog(email, password) {//Crear ruta para crear/agregar Review
  return (dispatch) => {
    _axios.post('http://localhost:3001/auth/login', { email, password })
      .then(response => { dispatch(postLogin(response.data)) })
      .catch(error => { console.log(error) })
  }
}

export function postLogo() {      //
  const request = _axios.post('http://localhost:3001/auth/logout')
  return { type: LOGOUT, payload: request };
}

export function postAdmin(user_id) {
  const request = _axios.post(`http://localhost:3001/auth/promote/${user_id}`)
  return { type: HACER_ADMIN, payload: request }
}

// export function getMe() {      //
//   const request = _axios.get('http://localhost:3001/auth/me')
//   return { type: ME, payload: request };
// }


export function getMe() {//S57 : Crear Ruta para obtener todas las reviews de un producto.
  return (dispatch) => {
    _axios.get(`http://localhost:3001/auth/me`)
      .then(response => {
        dispatch({
          type: ME,
          payload: response.data
        })
      })
      .catch(err => { console.log(err) })
  }
}