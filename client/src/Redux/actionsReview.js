import { POST_REVIEW, PUT_REVIEW, DELETE_REVIEW, GET_ALL_REVIEW, NUMBERS } from './constantsReview';
import axios from 'axios';
var _axios = axios.create({
  withCredentials: true
})
export function postReview(review) {//va a REDUCER
  return {
    type: POST_REVIEW,
    payload: review
  }
}
export function postReviewRequest(id, post) {//Crear ruta para crear/agregar Review
  return (dispatch) => {
    _axios.post(`http://localhost:3001/reviews/product/${id}/review`, post)
      .then(response => { dispatch(postReview(response.data)) })
      .catch(error => { console.log(error) })
  }
}
//---------------------------------------------------------------------
export function putReview(request) {
  return { type: PUT_REVIEW, payload: request };
}
export function putReviewRequest(id, idReview, post) {//Para Modificar
  return (dispatch) => {
    _axios.put(`http://localhost:3001/reviews/product/${id}/review/${idReview}`, post)
      .then(response => { dispatch(putReview(response.data)) })
      .catch(error => { console.log(error) })
  }
}
//---------------------------------------------------------------------
export function deleteReview(request) {      // va a reducer
    return { type: DELETE_REVIEW, payload: request}
}
export function deleteReviewRequest(id, idReview) {//Crear Ruta para eliminar
  return (dispatch) => {
    _axios.delete(`http://localhost:3001/reviews/product/${id}/review/${idReview}`)
      .then(response => { dispatch(deleteReview(response.data)) })
      .catch(err => { console.log(err) })
  }
}
//---------------------------------------------------------------------------
export function getAllReviews(reviews) {//va a REDUCER
  return {
    type: GET_ALL_REVIEW,
    payload: reviews
  }
}
export function getAllReviewsRequest(id) {//S57 : Crear Ruta para obtener todas las reviews de un producto.
  return (dispatch) => {
    _axios.get(`http://localhost:3001/reviews/product/${id}/review/`)
      .then(response => { dispatch(getAllReviews(response.data)) })
      .catch(err => { console.log(err) })
  }
}
//---------------------------------------------------------------------------
export function getNumbers(id) {//S57 : Crear Ruta para obtener todas las reviews de un producto.
  return (dispatch) => {
    _axios.get(`http://localhost:3001/reviews/product/${id}/numbers`)
      .then(response => { dispatch(sendNum(response.data))})
      .catch(err => { console.log(err) })
  }
}
export function sendNum(request){
  return{
    type: NUMBERS,
    payload: request
  }
}
