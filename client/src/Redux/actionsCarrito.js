import { POST_CARRO, GET_CARRO, PUT_CANTIDAD_CARRO, DELETE_CARRITO, DELETE_CARRITOUNO, GET_CREADA } from './constantsCarro'

import axios from 'axios';

//--------------OBTENER CARRITO DE UN USUARIO--------------------------------------

export function getCarrito(datos) {//va a REDUCER
  console.log('Datos Carrito');
  return {
    type: GET_CARRO,
    payload: datos

  }
}

export function getCarritoRequest(usuario) { //obtener todos los productos del carrito
  console.log(usuario)
  return (dispatch) => {
    axios.get(`http://localhost:3001/users/${usuario}/cart`)
      .then(response => { dispatch(getCarrito(response.data[0].products)) })
      .catch(err => { console.log(err) })
  }
}

//--------------OBTENER TODAS LAS ORDENES DE UN USUARIO------------------------------

export function getProdOrderUsers(resp) { //obtener todos los productos del carrito
  console.log("Ordenes de usuario obtenidas")
  return { type: GET_CREADA, payload: resp };
}

export function getProdOrder(usuario) { //Trae los productos de una orden
  console.log("Cargar productos al carrito")
  return (dispatch) => {
    axios.get(`http://localhost:3001/users/${usuario}/cart/orders`)
      .then((response) => { dispatch(getProdOrderUsers(response.data[0].products)) })
      .catch(err => { console.log(err) })
  }
}

//------------------AGREGAR PRODUCTO AL CARRITO--------------------------------------


export function postCarritoProducto(resp) {
  console.log('Producto agregado al carrito');
  return {
    type: POST_CARRO,
    payload: resp
  }
}

export function postCarrito(usuario, products) { //Agregar productos al carrito
  console.log("Cargar productos al carrito")
  return (dispatch) => {
    axios.post(`http://localhost:3001/users/${usuario}/cart`, products)
      .then((response) => { dispatch(postCarritoProducto(response.data)) })
      .catch(err => { console.log(err) })
  }
}

// export function postCarrito(usuario, products) {
//   const request = axios.post(`http://localhost:3001/users/${usuario}/cart`, products)
//   return { type: POST_CARRO, payload: request }
// }


//---------------------CAMBIAR CANTIDAD DENTRO DE LA ORDEN--------------------------

export function putCantidaOrder(resp) {
  console.log('Cantidad Cambiada');
  return {
    type: PUT_CANTIDAD_CARRO,
    payload: resp
  }
}


export function putCantidadOrdenRequest(id, cambio) { //Cambiar la cantidad de los productos
  console.log("cambiar cantidad de elementos")
  return (dispatch) => {
    axios.put(`http://localhost:3001/users/${id}/cart`, cambio)
      .then((response) => { dispatch(putCantidaOrder(response)) })
      .catch(err => { console.log(err) })
  }
}

//----------------------- BORRAR UN CARRITO DE UN USUARIO ---------------------------

export function deleteCart(resp) {//va a REDUCER
  console.log('Carrito Borrado');
  return {
    type: DELETE_CARRITO,
    payload: resp
  }
}

export function deleteCarrito(id) {   //vacia carrito segun id usuario
  console.log('deleteProductOfUserCart');
  return (dispatch) => {
    axios.delete(`http://localhost:3001/users/${id}/cart`)
      .then(response => { dispatch(deleteCart(response)) })
      .catch(err => { console.log(err) })
  }

}


//----------------------- BORRAR UN PRODUCTO DE UN USUARIO DEL CARRITO ---------------------------
export function delProductCart(resp) {//va a REDUCER
  console.log('Borrado');
  return {
    type: DELETE_CARRITOUNO,
    payload: resp
  }
}

export function deleteCarritoProd(idUser, valor) {   //borra un producto segun del carrito del usuario
  console.log('deleteProductOfUserCart');
  console.log(JSON.stringify(valor))
  return (dispatch) => {
    axios.delete(`http://localhost:3001/users/${idUser}/deleteCartProduct/${valor}`)
      .then(response => { 
        dispatch(delProductCart(response)) })
      .catch(err => { console.log(err) })
  }
}