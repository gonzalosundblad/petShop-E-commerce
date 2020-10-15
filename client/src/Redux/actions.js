import { GET_PRODUCTS, GET_CATEGORIES,GET_CATEGORIES_NOMBRECAT, GET_ID, POST_PRODUCT, POST_IDPROD_CAT_IDCATEG, POST_CATEGORY, PUT_ID, PUT_CATEGORY_ID, DELETE_IDPROD_CAT_IDCATEG, DELETE_ID, DELETE_CATEGORY_ID, SEARCH_PRODUCT } from './constants';
import axios from 'axios';

export function getProducts() { //obtener todos los productos
    const request = axios.get('http://localhost:3001/products')
    return { type:GET_PRODUCTS, payload: request}; }


export function getCategories() { //obtener todas las categorias
    const request = axios.get('http://localhost:3001/products/category');
    return { type: GET_CATEGORIES, payload: request}; }

export function getProductByCategory(name){//obtener todos los productos de una categoria
    const request = axios.get(`http://localhost:3001/products/category/${name}`)
    return { type: GET_CATEGORIES_NOMBRECAT, payload : request }; }

export function getProductById(id){
    const request = axios.get(`http://localhost:3001/products/${id}`)
    return { type: GET_ID, payload : request } ; }//obtener un producto segun su id
// HASTA ACA FUNCIONA--------------------------
export function postProduct(){      //agrega un nuevo producto
  const request = axios.post('http://localhost:3001/products')
  return { type: POST_PRODUCT, payload : request } ; }

export function postIdProdCatId(){   //agrega una categoria a un producto
  const request = axios.post('http://localhost:3001/products/:idProducto/category/:idCategoria')
  return { type: POST_IDPROD_CAT_IDCATEG, payload : request } ; }
//  postCategory tambien funciona
export function postCategory(data){   //agrega una categoria
  const request = axios.post('http://localhost:3001/products/category', data)
  return { type: POST_CATEGORY, payload : request } ; }

export function putId(){   //agrega una categoria
  const request = axios.put('http://localhost:3001/products')
  return { type: POST_CATEGORY, payload : request } ; }
