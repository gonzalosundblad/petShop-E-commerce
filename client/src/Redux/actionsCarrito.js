import {POST_CARRO, GET_CARRO} from './constantsCarro'

import axios from 'axios';

export function getCarrito(usuario) { //obtener todos los productos
  const request = axios.get(`http://localhost:3001/users/${usuario}/cart`)
  return { type:GET_CARRO, payload: request}; }

export function postCarrito(usuario, products){
  const request = axios.post(`http://localhost:3001/users/${usuario}/cart`, products)
  return { type: POST_CARRO , payload : request } ; } 