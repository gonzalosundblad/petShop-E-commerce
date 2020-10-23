import { POST_REVIEW, PUT_REVIEW, DELETE_REVIEW, GET_ALL_REVIEW} from './constantsReview';
import axios from 'axios';

export function postReview(review){//va a REDUCER
  return {
  type : POST_REVIEW,
  payload : review
}}
export function postReviewRequest(id, post){//Crear ruta para crear/agregar Review
  return (dispatch) => {
    axios.post(`http://localhost:3001/reviews/product/${id}/review`, post)
      .then(response => {dispatch(postReview(response.data))})
      .catch(error => {console.log(error)})
  }
}
//http://localhost:3001/reviews/product/1/review
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
console.log(id, idReview, post);
  return (dispatch) => {
    axios.put(`http://localhost:3001/reviews/product/${id}/review/${idReview}`, post)
    .then(response => {dispatch(putReview(response.data))})
    .catch(err => {console.log(err)})
  }
}
//---------------------------------------------------------------------
export function deleteReview(review){//va a REDUCER
console.log('// delete2: ');
  return {
  type : DELETE_REVIEW,
  payload : review
}}
export function deleteReviewRequest(id, idReview){//S56 : Crear Ruta para eliminar Review
console.log('delete');
  return (dispatch) => {
    axios.delete(`http://localhost:3001/reviews/product/${id}/review/${idReview}`)
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
