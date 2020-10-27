import {GET_CARRO_SIN_USER } from './constantsCarrosinUser'

import axios from 'axios';
 // Carrito sin usuario




export function getCarritoSinUser() { //obtener todos los productos del carrito
  const request = [];
  for(var i = 0; i < localStorage.length; i++){
    let clave = localStorage.key(i);
    let prod = JSON.parse(localStorage.getItem(clave));
        if(typeof(parseInt(clave)) === "number" ){
            request.push(prod)
        }     
  }
  return { type:GET_CARRO_SIN_USER, payload: request}; }

// export function getProdOrder(usuario) { //obtener todos los productos del carrito
//   const request = axios.get(`http://localhost:3001/users/${usuario}/cart/orders`)
//   return { type:GET_CREADA, payload: request}; }

// export function postCarritoSinUser(usuario, products){ //Agregar productos al carrito
//   const request = axios.post(`http://localhost:3001/users/${usuario}/cart`, products)
//   return { type: POST_CARRO , payload : request } ; }
//--
//   export function putCantidadOrden (id, cambio) { //Cambiar la cantidad de los productos
//     return axios.put(`http://localhost:3001/users/${id}/cart`, cambio)
//     .then((response) => {
//       return({ type:PUT_CANTIDAD_CARRO, payload : response })
//       console.log(response);
//     })
//   }
//   export function deleteCarrito(id){   //vacia carrito segun id usuario
//     return axios.delete(`http://localhost:3001/users/${id}/cart`).then((resp) => {
//       return { type: DELETE_CARRITO, payload : resp }
//       console.log(resp)
//     })
//      }
//   export function deleteCarritoUno(id, idProd){   //borra un producto segun id usuario
//     return axios.delete(`http://localhost:3001/users/${id}/deleteCartProduct`, idProd)
//       .then((resp) => {
//       return { type: DELETE_CARRITOUNO, payload : resp }
//       console.log(resp)
//     })
//     .catch(err => console.log('error'))
//      }
