import { GET_PRODUCTS, GET_CATEGORIES,GET_CATEGORIES_NOMBRECAT, GET_ID, POST_PRODUCT, POST_IDPROD_CAT_IDCATEG, POST_CATEGORY, PUT_ID, PUT_CATEGORY_ID, DELETE_IDPROD_CAT_IDCATEG, DELETE_ID, DELETE_CATEGORY_ID, SEARCH } from './constants';
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
//----------------------------------------------
export function postProduct(){      //agrega un nuevo producto
  const request = axios.post('http://localhost:3001/products')
  return { type: POST_PRODUCT, payload : request } ; }

export function postIdProdCatId(user, category){   //agrega una categoria a un producto
  const request = axios.post(`http://localhost:3001/products/${user}/category/${category}`)
  return { type: POST_IDPROD_CAT_IDCATEG, payload : request } ; }
//-------------------------------------------
//  postCategory TAMBIEN FUNCIONA
export function postCategory(data){   //agrega una categoria
  const request = axios.post('http://localhost:3001/products/category', data)
  return { type: POST_CATEGORY, payload : request } ; }
//----------------------------------------
// PutId FUNCIONA
export function putId (id, cambios) {
    return axios.put(`http://localhost:3001/products/${id}`, cambios).then((response) => {
      return({ type: PUT_ID, payload : response })
      console.log(response);
    })
    }
export function putCategoryId (id, cambios) {
    return axios.put(`http://localhost:3001/products/category/${id}`, cambios).then((response) => {
      return({ type:PUT_CATEGORY_ID, payload : response })
      console.log(response);
    })
    }


export function deleteCatOfProduct(idP, idC){   //elimina una categoria de un producto
 return axios.delete(`http://localhost:3001/products/${idP}/category/${idC}`).then((resp) => {
  return { type: DELETE_IDPROD_CAT_IDCATEG, payload : resp } 
 })
 }

export function deleteProduct(id){   //elimina un producto segun id
 return axios.delete(`http://localhost:3001/products/${id}`).then((resp) => {
   return { type: DELETE_ID, payload : resp }
   console.log(resp)
 })
  }
export function deleteCategory(id){   //elimina un producto segun id
 return axios.delete(`http://localhost:3001/products/category/${id}`).then((resp) => {
   return { type: DELETE_ID, payload : resp }
   console.log(resp)
 })
  }


export function search(producto){   //busca entre todo
const request = axios.get(`http://localhost:3001/search?products=${producto}`)
return { type: SEARCH, payload : request } ; }