import axios from 'axios';
import { GET_ORDER, GET_USER, GET_ORDENID, POST_USER, PUT_USER, DELETE_USER, PUT_ORDER, POST_PASSWORD, GET_ORDENIDUSER, DELETE_ORDER } from './constantesOrden'

export function getOrders(ordenes) {//va a REDUCER
  return {
    type: GET_ORDER,
    payload: ordenes
  }
}
export function getOrder() {//Trae todas las ordenes
  return (dispatch) => {
    axios.get('http://localhost:3001/orders/')
      .then(response => { dispatch(getOrders(response.data)) })
      .catch(err => { console.log(err) })
  }
}

//----------------------------------------------------


//--------Usuarios-------

export function getUsuarios(usuarios) {//va a REDUCER
  console.log('usuarios');
  return {
    type: GET_USER,
    payload: usuarios
  }
}
export function getUser() {//Trae todos los usuarios
  console.log('getProductsRequest');
  return (dispatch) => {
    axios.get('http://localhost:3001/users/')
      .then(response => { dispatch(getUsuarios(response.data)) })
      .catch(err => { console.log(err) })
  }
}

//----------------------------------------------------


export function postUsuario(user) {//va a REDUCER
  console.log('user');
  return {
    type: POST_USER,
    payload: user
  }
}
export function postUser(usuario) {//Crea un Usuario nuevo
  console.log('postUser');
  return (dispatch) => {
    axios.post('http://localhost:3001/users/', usuario)
      .then(response => { dispatch(postUsuario(response.data)) })
      .catch(err => { console.log(err) })
  }
}

//----------------------------------------------------


export function putUsuario(user) {//va a REDUCER
  console.log('Usuario Modificado');
  return {
    type: PUT_USER,
    payload: user
  }
}
export function putUser(id, usuario) {//Modifica al usuario (no se ven los cambios visualmente)
  console.log('putUser');
  return (dispatch) => {
    axios.put(`http://localhost:3001/users/${id}`, usuario)
      .then(response => { dispatch(putUsuario(response.data)) })
      .catch(err => { console.log(err) })
  }
}

//----------------------------------------------------


export function delUser(usuario) {//va a REDUCER
  console.log('Borrado');
  return {
    type: DELETE_USER,
    payload: usuario
  }
}
export function deleteUser(id) {//Borrar un usuario (no se ven los cambios visualmente)
  console.log('deleteProduct');
  return (dispatch) => {
    axios.delete(`http://localhost:3001/users/${id}`)
      .then(response => { dispatch(delUser(response.data)) })
      .catch(err => { console.log(err) })
  }
}

//----------------------------------------------------


//-----Orden---

// export function getOrderId(id) {
//   const request = axios.get(`http://localhost:3001/orders/${id}`)
//   return { type: GET_ORDENID, payload: request }
// }

export function getOrd(order) {//va a REDUCER
  console.log('Orden');
  return {
    type: GET_ORDENID,
    payload: order
  }
}
export function getOrderId(id) {//Trae una orden segun id
  console.log('getOrderId');
  return (dispatch) => {
    axios.get(`http://localhost:3001/orders/${id}`)
      .then(response => { dispatch(getOrd(response.data)) })
      .catch(err => { console.log(err) })
  }
}

//----------------------------------------------------


export function getOrdUser(order) {//va a REDUCER
  console.log('Orden');
  return {
    type: GET_ORDENIDUSER,
    payload: order
  }
}
export function getOrderIdUser(idUser) {//Trae una orden segun id usuario
  console.log('getOrderIdUser');
  return (dispatch) => {
    axios.get(`http://localhost:3001/users/${idUser}/orders`)
      .then(response => { dispatch(getOrdUser(response.data)) })
      .catch(err => { console.log(err) })
  }
}

//----------------------------------------------------


// export function getOrderIdUser(idUser) {
//   const request = axios.get(`http://localhost:3001/orders/${idUser}/orders`)
//   return { type: GET_ORDENIDUSER, payload: request }
// }

// export function putOrder(id, estado) {
//   return axios.put(`http://localhost:3001/orders/${id}`, estado).then((resp) => {
//     return { type: PUT_ORDER, payload: resp }
//   })
// }

export function putOrden(order) {//va a REDUCER
  console.log('Orden Modificada');
  return {
    type: PUT_ORDER,
    payload: order
  }
}
export function putOrder(id, estado) {//Modifica a la orden (no se ven los cambios visualmente)
  console.log('putOrder');
  return (dispatch) => {
    axios.put(`http://localhost:3001/orders/${id}`, estado)
      .then(response => { dispatch(putOrden(response.data)) })
      .catch(err => { console.log(err) })
  }
}

//----------------------------------------------------


// export function deleteOrder(id) {      //
//   return axios.delete(`http://localhost:3001/orders/${id}`).then((resp) => {
//     return { type: DELETE_ORDER, payload: resp }
//   })
// }

export function delOrder(order) {//va a REDUCER
  console.log('Borrado');
  return {
    type: DELETE_ORDER,
    payload: order
  }
}
export function deleteOrder(id) {//Va a Catalogo2.jsx
  console.log('deleteProduct');
  return (dispatch) => {
    axios.delete(`http://localhost:3001/orders/${id}`)
      .then(response => { dispatch(delOrder(response.data)) })
      .catch(err => { console.log(err) })
  }
}

//----------------------------------------------------


//-----Reset Password-----
export function postPass(id, password) {      //agrega un nuevo usuario
  const request = axios.put(`http://localhost:3001/users/${id}/passwordReset`, { password })
  return { type: POST_PASSWORD, payload: request };
}
