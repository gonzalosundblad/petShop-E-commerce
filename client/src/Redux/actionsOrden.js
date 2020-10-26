import axios from 'axios';
import { GET_ORDER, GET_USER, GET_ORDENID, POST_USER, PUT_USER, DELETE_USER, PUT_ORDER, POST_PASSWORD, GET_ORDENIDUSER } from './constantesOrden'

export function getOrder() { //obtener todos los productos
  const request = axios.get('http://localhost:3001/orders/')
  return { type: GET_ORDER, payload: request };
}


//--------Usuarios-------

export function getUser() { //obtener todos los usuarios
  const request = axios.get('http://localhost:3001/users/')
  return { type: GET_USER, payload: request };
}
export function postUser(usuario) {      //agrega un nuevo usuario
  const request = axios.post('http://localhost:3001/users/', usuario)
  return { type: POST_USER, payload: request };
}
export function putUser(id, usuario) {
  const request = axios.put(`http://localhost:3001/users/${id}`, usuario)
  return { type: PUT_USER, payload: request };
}
export function deleteUser(id) {      //borrar un  usuario
  return axios.delete(`http://localhost:3001/users/${id}`).then((resp) => {
    return { type: DELETE_USER, payload: resp }
  })
}

//-----Orden---

export function getOrderId(id) {
  const request = axios.get(`http://localhost:3001/orders/${id}`)
  return { type: GET_ORDENID, payload: request }
}
export function getOrderIdUser(idUser) {
  const request = axios.get(`http://localhost:3001/orders/${idUser}/orders'`)
  return { type: GET_ORDENIDUSER, payload: request }
}

export function putOrder(id, estado) {
  return axios.put(`http://localhost:3001/orders/${id}`, estado).then((resp) => {
    return { type: PUT_ORDER, payload: resp }
  })
}

export function deleteOrder(id) {      //borrar un  usuario
  return axios.delete(`http://localhost:3001/users/${id}`).then((resp) => {
    return { type: DELETE_USER, payload: resp }
  })
}

//-----Reset Password-----
export function postPass(id, password) {      //agrega un nuevo usuario
  const request = axios.put(`http://localhost:3001/users/${id}/passwordReset`, { password })
  return { type: POST_PASSWORD, payload: request };
}

