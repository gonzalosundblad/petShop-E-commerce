import {POST_CARRO, GET_CARRO, PUT_CANTIDAD_CARRO} from './constantsCarro'

import axios from 'axios';

export function getCarrito(usuario) { //obtener todos los productos del carrito
  const request = axios.get(`http://localhost:3001/users/${usuario}/cart`)
  return { type:GET_CARRO, payload: request}; }

export function postCarrito(usuario, products){ //Agregar productos al carrito
  const request = axios.post(`http://localhost:3001/users/${usuario}/cart`, products)
  return { type: POST_CARRO , payload : request } ; } 

  export function putCantidadOrden (id, cambio) { //Cambiar la cantidad de los productos
    return axios.put(`http://localhost:3001/user/${id}/cart`, cambio)
    .then((response) => {
      return({ type:PUT_CANTIDAD_CARRO, payload : response })
      console.log(response);
    })
  }