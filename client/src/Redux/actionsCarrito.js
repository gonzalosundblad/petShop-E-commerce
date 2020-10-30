import {POST_CARRO, GET_CARRO, PUT_CANTIDAD_CARRO, DELETE_CARRITO, DELETE_CARRITOUNO , GET_CREADA} from './constantsCarro'

import axios from 'axios';

// export function getProducts(allProducts) {//va a REDUCER
//   console.log('allProducts');
//   return {
//     type: GET_PRODUCTS,
//     payload: allProducts
//   }
// }
// export function getProductsRequest() {//Va a Catalogo2.jsx
//   console.log('getProductsRequest');
//   return (dispatch) => {
//     axios.get(`http://localhost:3001/products`)
//       .then(response => { dispatch(getProducts(response.data)) })
//       .catch(err => { console.log(err) })
//   }
// }

export function getCarrito(datos) {//va a REDUCER
  console.log('Datos Carrito');
  return {  
    type:GET_CARRO,
    payload: datos 
   
  }
}

export function getCarritoRequest(usuario) { //obtener todos los productos del carrito
  console.log(usuario)
  return (dispatch) => {
    axios.get(`http://localhost:3001/users/${usuario}/cart`)
    .then (response  =>  { dispatch(getCarrito(response.data[0].products)) })
    .catch(err => { console.log(err) })
    }
}

//--------------------------------------------------------------------------------

export function getProdOrder(usuario) { //obtener todos los productos del carrito
  const request = axios.get(`http://localhost:3001/users/${usuario}/cart/orders`)
  return { type:GET_CREADA, payload: request}; }

export function postCarrito(usuario, products){ //Agregar productos al carrito
  console.log(products)
  const request = axios.post(`http://localhost:3001/users/${usuario}/cart`, products)
  return { type: POST_CARRO , payload : request } ; }
//--
  export function putCantidadOrden (id, cambio) { //Cambiar la cantidad de los productos
    return axios.put(`http://localhost:3001/users/${id}/cart`, cambio)
    .then((response) => {
      return({ type:PUT_CANTIDAD_CARRO, payload : response })
      console.log(response);
    })
  }

//----------------------- BORRAR UN CARRITO DE UN USUARIO ---------------------------

  export function deleteCart(resp) {//va a REDUCER
    console.log('Carrito Borrado');
    return { 
      type: DELETE_CARRITO, 
      payload : resp 
    }
  }   


  export function deleteCarrito(id){   //vacia carrito segun id usuario
    console.log('deleteProductOfUserCart');
    return (dispatch) => {
      axios.delete(`http://localhost:3001/users/${id}/cart`)
        .then(response => { dispatch(deleteCart(response)) })
        .catch(err => { console.log(err) })
    }
  }


  //----------------------- BORRAR UN PRODUCTO DE UN USUARIO DEL CARRITO ---------------------------
  export function delProductCart(resp) {//va a REDUCER
    console(resp)
    console.log('Borrado');
    return { 
      type: DELETE_CARRITOUNO, 
      payload : resp 
    }
  }   

  export function deleteCarritoProd(id_user, product_id){   //borra un producto segun del carrito del usuario
    console.log('deleteProductOfUserCart');
    console.log(id_user + "------" +product_id )
    return (dispatch) => {
      console.log("hola")
      axios.delete(`http://localhost:3001/users/${id_user}/deleteCartProduct`, product_id)
        .then(response => {console.log(response); dispatch(delProductCart(response)) })
        .catch(err => { console.log(err) })
    }
    }
  
     
  