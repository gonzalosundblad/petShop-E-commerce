import axios from 'axios';
import {GET_ORDER, GET_USER} from './constantesOrden'

export function getOrder() { //obtener todos los productos
  const request = axios.get('http://localhost:3001/orders/')
  return { type:GET_ORDER, payload: request}; }


//--------Usuarios-------

export function getUser() { //obtener todos los productos
  const request = axios.get('http://localhost:3001/users/')
  return { type:GET_USER, payload: request}; }