import axios from 'axios';
import { GET_ME, POST_LOGIN, POST_LOGOUT, HACER_ADMIN } from './constantesLog'
import { LOGIN_SUCCESS } from './constantsLogin';
var _axios = axios.create({
  withCredentials: true
})

// export function postLog(usuario) {      //Login
//   const request = _axios.post('http://localhost:3001/auth/login', usuario)
//   return { type: POST_LOGIN, payload: request };
// }

export function postLog(user) {//va a REDUCER
  return {
    type: LOGIN_SUCCESS,
    payload: user
  }
}
export function postLogin(usuario) {//Crear ruta para crear/agregar Review
  return (dispatch) => {
    _axios.post('http://localhost:3001/auth/login', usuario)
      .then(response => {
        dispatch(postLog(response.data));
        localStorage.setItem("user", JSON.stringify(response.data));
      })
      .catch(error => { console.log(error) })
  }
}

export function postLogout() {      //
  const request = _axios.post('http://localhost:3001/auth/logout')
  localStorage.removeItem("user");
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
