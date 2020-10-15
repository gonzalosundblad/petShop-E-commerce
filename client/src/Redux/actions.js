import { GET_PRODUCTS, GET_CATEGORIES,GET_CATEGORIES_NOMBRECAT, GET_ID, POST_PRODUCT, POST_IDPROD_CAT_IDCATEG, POST_CATEGORY, PUT_ID, PUT_CATEGORY_ID, DELETE_IDPROD_CAT_IDCATEG, DELETE_ID, DELETE_CATEGORY_ID, SEARCH_PRODUCT } from './constantes';
import axios from 'axios';

export function getProducts() { //obtener todos los productos
  const request = axios.get('http://localhost:3001/products', {
  })
       return { type: GET_PRODUCTS, payload: request }}
export function getCategories() { //obtener todos los productos
    const request = axios.get('http://localhost:3001/products/category');
    return { type: GET_CATEGORIES, payload: request }; }
export function getProductByCategory(){//obtener todos los productos de una categoria
    const request = axios.get('http://localhost:3001/products/category/:nombreCat')
    return { type: GET_CATEGORIES_NOMBRECAT, payload : request }; }
export function getProductById(){
    const request = axios.get('http://localhost:3001/products/:id')
    return { type: GET_ID, payload : request } ; }//obtener un producto segun su id
export function postProduct(){      //agrega un nuevo producto
  const request = axios.post('http://localhost:3001/products')
  return { type: POST_PRODUCT, payload : request } ; }
export function postIdProdCatId(){   //agrega una categoria a un producto
  const request = axios.post('http://localhost:3001/products/:idProducto/category/:idCategoria')
  return { type: POST_IDPROD_CAT_IDCATEG, payload : request } ; }
export function postCategory(){   //agrega una categoria
  const request = axios.post('http://localhost:3001/products')
  return { type: POST_CATEGORY, payload : request } ; }
export function postCategory2(){   //agrega una categoria
  const request = axios.post('http://localhost:3001/products')
  return { type: POST_CATEGORY, payload : request } ; }

