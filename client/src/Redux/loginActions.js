// import axios from 'axios';
// import { SET_SESSION } from './constantsUser';
//  //API_LOGIN = localhost//3000...etc
//
//
// export const login = ({ email, password }) => (dispatch, getState) => {
//     return new Promise((resolve, reject) => {
//         axios.post(API_LOGIN,{ email, password })
//             .then((respJson) => {
//                 //si todo sale bien guardamos el user y token en localstore
//                 dispatch({
//                     type: SET_SESSION,
//                     user: respJson.data.user,
//                     token: respJson.data.token
//                 })
//                 return resolve(respJson.data)
//             })
//             .catch( (err) => {
//                 if(err.response && err.response.data)
//                     return reject(err.response.data)
//                 else
//                     return reject({ error : true, message : "Ocurrio un error por favor intenta más tarde."});
//             });
//     });
// }
