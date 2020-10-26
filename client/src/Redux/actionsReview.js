import { POST_REVIEW, PUT_REVIEW, DELETE_REVIEW, GET_ALL_REVIEW } from './constantsReview';
import axios from 'axios';

export function postReview(review) {//va a REDUCER
  return {
    type: POST_REVIEW,
    payload: review
  }
}
export function postReviewRequest(id, post) {//Crear ruta para crear/agregar Review
  return (dispatch) => {
    axios.post(`http://localhost:3001/reviews/product/${id}/review`, post)
      .then(response => { dispatch(postReview(response.data)) })
      .catch(error => { console.log(error) })
  }
}


export function putReview(id, idReview, post) {
  const request = axios.put(`http://localhost:3001/reviews/product/${id}/review/${idReview}`, post)
  return { type: PUT_REVIEW, payload: request };
}
//---------------------------------------------------------------------
export function deleteReview(id, idReview) {      //
  return axios.delete(`http://localhost:3001/reviews/product/${id}/review/${idReview}`).then((resp) => {
    return { type: DELETE_REVIEW, payload: resp }
  })
}
//---------------------------------------------------------------------------
export function getAllReviews(reviews) {//va a REDUCER
  //  console.log(reviews);
  return {
    type: GET_ALL_REVIEW,
    payload: reviews
  }
}
export function getAllReviewsRequest(id) {//S57 : Crear Ruta para obtener todas las reviews de un producto.
  return (dispatch) => {
    axios.get(`http://localhost:3001/reviews/product/${id}/review/`)
      .then(response => { dispatch(getAllReviews(response.data)) })
      .catch(err => { console.log(err) })
  }
}
