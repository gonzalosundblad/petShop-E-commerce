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

export function postIdProdCatId(){   //agrega una categoria a un producto
  const request = axios.post('http://localhost:3001/products/:idProducto/category/:idCategoria')
  return { type: POST_IDPROD_CAT_IDCATEG, payload : request } ; }
//-------------------------------------------
//  postCategory TAMBIEN FUNCIONA
export function postCategory(data){   //agrega una categoria
  const request = axios.post('http://localhost:3001/products/category', data)
  return { type: POST_CATEGORY, payload : request } ; }
//----------------------------------------
// export function putId(id, cambios){   //modifica un producto segun id
//   axios.put(`http://localhost:3001/products/${id}`, cambios)
//     .then(function(res){
//       console.log(res);
//       return { type: PUT_ID, payload : res }
//     })
//   }
export function putId (id, cambios) {
    return axios.put(`http://localhost:3001/products/${id}`, cambios).then((response) => {
      return({ type: PUT_ID, payload : response })
      console.log(response);
    })
    }

export function putCategoryId(){   //modifica una categoria segun id
const request = axios.put('http://localhost:3001/products')
return { type: PUT_CATEGORY_ID, payload : request } ; }

export function deleteCatOfProduct(){   //elimina una categoria de un producto
const request = axios.put('http://localhost:3001/products')
return { type: DELETE_IDPROD_CAT_IDCATEG, payload : request } ; }

export function deleteProduct(){   //elimina un producto segun id
const request = axios.put('http://localhost:3001/products')
return { type: DELETE_ID, payload : request } ; }

export function deleteCategory(){   //elimina una categoria
const request = axios.put('http://localhost:3001/products')
return { type: DELETE_CATEGORY_ID, payload : request } ; }

export function search(producto){   //busca entre todo
const request = axios.put(`http://localhost:3001/search?products=${producto}`)
return { type: SEARCH, payload : request } ; }
