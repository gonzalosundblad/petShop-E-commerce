import axios from 'axios';
import {MESSAGE, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, REGISTER_SUCCESS, REGISTER_FAIL, GET_ME, HACER_ADMIN } from './constantsLogin';

var _axios = axios.create({
  withCredentials: true
})
export function postLog(user) {//va a REDUCER
  console.log(user);
  return {
    type: LOGIN_SUCCESS,
    payload: user
  }
}
export function loginRequest(usuario) {//Crear ruta para crear/agregar Review
  return (dispatch) => {
    _axios.post('http://localhost:3001/auth/login', usuario)
      .then(response => {
        if(response.data.message){dispatch({
          type: MESSAGE, payload: response.data
        })}
        else {dispatch(postLog(response.data),
          localStorage.setItem("user", JSON.stringify(response.data.user))
        )}
      })
      .catch(error => { console.log(error) })
  }
}

//----------------------------------------------------

export function logout() {//Crear ruta para crear/agregar Review
  return (dispatch) => {
    _axios.post('http://localhost:3001/auth/logout')
      .then(response => {
        dispatch({
          type: LOGOUT,
          payload: response
        },
          localStorage.removeItem("user"));
      })
      .catch(error => { console.log(error) })
  }
}
//----------------------------------------------------


export function getUserMe(user) {//va a REDUCER
  console.log('user');
  return {
    type: GET_ME,
    payload: user
  }
}
export function getMe() {//Va a Catalogo2.jsx
  console.log('getMe');
  return (dispatch) => {
    _axios.get('http://localhost:3001/auth/me')
      .then(response => { dispatch(getUserMe(response.data)) })
      .catch(err => { console.log(err) })
  }
}

//----------------------------------------------------


export function postAdm(user) {//va a REDUCER
  console.log('user');
  return {
    type: HACER_ADMIN,
    payload: user
  }
}
export function postAdmin(idUser) {//Crea un Usuario nuevo
  console.log('postAdmin');
  return (dispatch) => {
    axios.post(`http://localhost:3001/auth/promote/${idUser}`)
      .then(response => { dispatch(postAdm(response.data)) })
      .catch(err => { console.log(err) })
  }
}
