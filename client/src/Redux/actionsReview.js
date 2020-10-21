import { POST_REVIEW, PUT_REVIEW, DELETE_REVIEW, GET_ALL_REVIEW} from './constantsReview';
import axios from 'axios';

export function postReview(review){//va a REDUCER
  return {
  type : POST_REVIEW,
  payload : review
}}
export function postReviewRequest(idProducto, post){//Crear ruta para crear/agregar Review
//productID y paquete con userId
  return (dispatch) => {
    axios.post(`http://localhost:3001/reviews/product/${idProducto}/review`, {post})
      .then(response => {dispatch(postReview(response.data))})
      .catch(error => {console.log(error)})
  }
}
//product/:id/review
// const product_id = req.params.id;
// const { qualification, description, user_id } = req.body;
//--------------------------------------------------------------------
export function putReview(review){//va a REDUCER
console.log('// REVIEW: ');
  return {
  type : PUT_REVIEW,
  payload : review
}}
export function putReviewRequest(id, idReview, post){//Crear ruta para Modificar Review
console.log('putReviewRequest');
  return (dispatch) => {
    axios.put(`http://localhost:3001/product/${id}/review/${idReview}`, post)
    .then(response => {dispatch(putReview(response.data))})
    .catch(err => {console.log(err)})
  }
}
//---------------------------------------------------------------------
export function deleteReview(review){//va a REDUCER
console.log('// REVIEW: ');
  return {
  type : DELETE_REVIEW,
  payload : review
}}
export function deleteReviewRequest(id, idReview){//S56 : Crear Ruta para eliminar Review
console.log(idReview);
  return (dispatch) => {
    axios.delete(`http://localhost:3001/product/${id}/review/${idReview}`)
    .then(response => {dispatch(deleteReview(response.data))})
    .catch(err => {console.log(err)})
  }
}
//---------------------------------------------------------------------------
export function getAllReviews(reviews){//va a REDUCER
//  console.log(reviews);
  return {
  type : GET_ALL_REVIEW,
  payload : reviews
}}
export function getAllReviewsRequest(id){//S57 : Crear Ruta para obtener todas las reviews de un producto.
  return (dispatch) => {
    axios.get(`http://localhost:3001/reviews/product/${id}/review/`)
    .then(response => {dispatch(getAllReviews(response.data))})
    .catch(err => {console.log(err)})
  }
}
