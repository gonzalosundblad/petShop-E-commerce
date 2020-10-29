import { POST_CARRO, GET_CARRO, PUT_CANTIDAD_CARRO, DELETE_CARRITO, DELETE_CARRITOUNO, GET_CREADA } from './constantsCarro'

import axios from 'axios';

// export function getCarrito(usuario) { //obtener todos los productos del carrito
//   const request = axios.get(`http://localhost:3001/users/${usuario}/cart`)
//   return { type: GET_CARRO, payload: request };
// }

export function getCarro(prod) {//va a REDUCER
  console.log('getCarro');
  return {
    type: GET_CARRO,
    payload: prod
  }
}
export function getCarrito(usuario) {//Trae productos de una orden
  console.log('getCarrito');
  return (dispatch) => {
    axios.get(`http://localhost:3001/users/${usuario}/cart`)
      .then(response => { dispatch(getCarro(response.data)) })
      .catch(err => { console.log(err) })
  }
}
// export function getProdOrder(usuario) { //obtener todos los productos del carrito
//   const request = axios.get(`http://localhost:3001/users/${usuario}/cart/orders`)
//   return { type:GET_CREADA, payload: request}; }

export function getOrdProd(order) {//va a REDUCER
  console.log('Orden');
  return {
    type: GET_CREADA,
    payload: order
  }
}
export function getProdOrder(usuario) {//Trae productos de una orden
  console.log('getOrderId');
  return (dispatch) => {
    axios.get(`http://localhost:3001/users/${usuario}/cart/orders`)
      .then(response => { dispatch(getOrdProd(response.data)) })
      .catch(err => { console.log(err) })
  }
}

export function postCarrito(usuario, products) { //Agregar productos al carrito
  const request = axios.post(`http://localhost:3001/users/${usuario}/cart`, products)
  return { type: POST_CARRO, payload: request };
}
//--
export function putCantidadOrden(id, cambio) { //Cambiar la cantidad de los productos
  return axios.put(`http://localhost:3001/users/${id}/cart`, cambio)
    .then((response) => {
      return ({ type: PUT_CANTIDAD_CARRO, payload: response })
      console.log(response);
    })
}
export function deleteCarrito(id) {   //vacia carrito segun id usuario
  return axios.delete(`http://localhost:3001/users/${id}/cart`).then((resp) => {
    return { type: DELETE_CARRITO, payload: resp }
    console.log(resp)
  })
}
export function deleteCarritoUno(id, idProd) {   //borra un producto segun id usuario
  return axios.delete(`http://localhost:3001/users/${id}/deleteCartProduct`, idProd)
    .then((resp) => {
      return { type: DELETE_CARRITOUNO, payload: resp }
      console.log(resp)
    })
    .catch(err => console.log('error'))
}
