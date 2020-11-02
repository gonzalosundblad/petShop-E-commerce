import { GET_PRODUCTS, GET_CATEGORIES, GET_CATEGORIES_NOMBRECAT, GET_ID, POST_PRODUCT, POST_IDPROD_CAT_IDCATEG, POST_CATEGORY, PUT_ID, PUT_CATEGORY_ID, DELETE_IDPROD_CAT_IDCATEG, DELETE_ID, DELETE_CATEGORY_ID, SEARCH, POST_USER, GET_USERS, PUT_USER, DELETE_USER, POST_PASSWORD } from './constants';
import axios from 'axios';

export function getProducts(allProducts) {//va a REDUCER
  return {
    type: GET_PRODUCTS,
    payload: allProducts
  }
}
export function getProductsRequest() {//Va a Catalogo2.jsx
  return (dispatch) => {
    axios.get(`http://localhost:3001/products`)
      .then(response => { dispatch(getProducts(response.data)) })
      .catch(err => { console.log(err) })
  }
}
//----------------------------------------------------

export function getCateg(categorias) {//va a REDUCER
  return {
    type: GET_CATEGORIES,
    payload: categorias
  }
}
export function getCategories() {//
  return (dispatch) => {
    axios.get('http://localhost:3001/products/category')
      .then(response => { dispatch(getCateg(response.data)) })
      .catch(err => { console.log(err) })
  }
}

//----------------------------------------------------


export function getProdCate(prodCateg) {//va a REDUCER
  console.log('getCateg');
  return {
    type: GET_CATEGORIES_NOMBRECAT,
    payload: prodCateg
  }
}
export function getProductByCategory(name) {//Trae producto por categorias
  return (dispatch) => {
    axios.get(`http://localhost:3001/products/category/${name}`)
      .then(response => { dispatch(getProdCate(response.data)) })
      .catch(err => { console.log(err) })
  }
}

//----------------------------------------------------

export function getProdId(producto) {//va a REDUCER
  return {
    type: GET_ID,
    payload: producto
  }
}
export function getProductById(id) {//Muestra producto por ID
  return (dispatch) => {
    axios.get(`http://localhost:3001/products/${id}`)
      .then(response => { dispatch(getProdId(response.data)) })
      .catch(err => { console.log(err) })
  }
}

//----------------------------------------------------


export function postProd(product) {//va a REDUCER
  console.log('postProd');
  return {
    type: POST_PRODUCT,
    payload: product
  }
}
export function postProduct(input) {//Agrega un producto nuevo Pero falta que agregue categorias.
  console.log('postCategory');
  return (dispatch) => {
    axios.post('http://localhost:3001/products', input)
      .then(response => { dispatch(postProd(response.data)) })
      .catch(err => { console.log(err) })
  }
}

//----------------------------------------------------


export function postIdProdCatId(user, category) {   //agrega una categoria a un producto
  const request = axios.post(`http://localhost:3001/products/${user}/category/${category}`)
  return { type: POST_IDPROD_CAT_IDCATEG, payload: request };
}

//----------------------------------------------------


export function postCateg(categorie) {//va a REDUCER
  console.log('Categoria');
  return {
    type: POST_CATEGORY,
    payload: categorie
  }
}


export function postCategory(categoria) {//Crea una categoria
  console.log('postCategory');
  return (dispatch) => {
    axios.post('http://localhost:3001/products/category', categoria)
      .then(response => { dispatch(postCateg(response.data)) })
      .catch(err => { console.log(err) })
  }
}

//----------------------------------------------------


export function putProduct(cambio) {//va a REDUCER
  console.log('Cambios');
  return {
    type: PUT_ID,
    payload: cambio
  }
}
export function putId(id, cambios) {//Modifica producto segun id
  console.log('putId');
  return (dispatch) => {
    axios.put(`http://localhost:3001/products/${id}`, cambios)
      .then(response => { dispatch(putProduct(response.data)) })
      .catch(err => { console.log(err) })
  }
}

//----------------------------------------------------


export function putCat(categ) {//va a REDUCER
  console.log('Categoria Modificada');
  return {
    type: PUT_CATEGORY_ID,
    payload: categ
  }
}
export function putCategoryId(id, cambios) {//Modifica categoria segun id
  console.log('putCategoryId');
  console.log(id)
  return (dispatch) => {
    axios.put(`http://localhost:3001/products/category/${id}`, cambios)
      .then(response => { dispatch(putCat(response.data)) })
      .catch(err => { console.log(err) })
  }
}

//----------------------------------------------------

export function deleteCatOfProduct(idP, idC) {   //elimina una categoria de un producto
  return axios.delete(`http://localhost:3001/products/${idP}/category/${idC}`).then((resp) => {
    return { type: DELETE_IDPROD_CAT_IDCATEG, payload: resp }
  })
}

//----------------------------------------------------


export function delProduct(prod) {//va a REDUCER
  console.log('Borrado');
  return {
    type: DELETE_ID,
    payload: prod
  }
}
export function deleteProduct(id) {//Va a Catalogo2.jsx
  console.log('deleteProduct');
  return (dispatch) => {
    axios.delete(`http://localhost:3001/products/${id}`)
      .then(response => { dispatch(delProduct(response.data)) })
      .catch(err => { console.log(err) })
  }
}

//----------------------------------------------------


export function delCateg(categ) {//va a REDUCER
  console.log('categ');
  return {
    type: DELETE_ID,
    payload: categ
  }
}
export function deleteCategory(id) {//Va a Catalogo2.jsx
  console.log('deleteCategory');
  return (dispatch) => {
    axios.delete(`http://localhost:3001/products/category/${id}`)
      .then(response => { dispatch(delCateg(response.data)) })
      .catch(err => { console.log(err) })
  }
}

//----------------------------------------------------


export function search(producto) {   //busca entre todo FALTA
  const request = axios.get(`http://localhost:3001/search?products=${producto}`)
  return { type: SEARCH, payload: request };
}
