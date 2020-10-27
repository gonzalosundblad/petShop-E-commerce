import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, REGISTER_SUCCESS, REGISTER_FAIL } from './constantsLogin';
import AuthService from "../services/auth.service";

var _axios = axios.create({
  withCredentials: true
})
//-----------------------------------
export const register = (name, email, password) => (dispatch) => {
  return AuthService.register(name, email, password).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      return Promise.reject();
    }
  );
};

//-----------------------------------

// export const loginRequest = (email, password) => (dispatch) => {
//   return AuthService.login(email, password).then(
//     (data) => {
//       dispatch({
//         type: LOGIN_SUCCESS,
//         payload: { user: data },
//       });
//       return Promise.resolve();
//     },
//     (error) => {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       //       dispatch({
//       //         type: LOGIN_FAIL,
//       //       });

//       return Promise.reject();
//     }
//   );
// };


export function postLog(user) {//va a REDUCER
  return {
    type: LOGIN_SUCCESS,
    payload: user
  }
}
export function loginRequest(usuario) {//Crear ruta para crear/agregar Review
  return (dispatch) => {
    _axios.post('http://localhost:3001/auth/login', usuario)
      .then(response => {
        dispatch(postLog(response.data),
          localStorage.setItem("user", JSON.stringify(response.data))
        );
      })
      .catch(error => { console.log(error) })
  }
}


export function logout() {//Crear ruta para crear/agregar Review
  return (dispatch) => {
    _axios.post('http://localhost:3001/auth/logout')
      .then(response => {
        dispatch({
          type: LOGOUT,
          payload: response
        },
          localStorage.removeItem("user"));
      })
      .catch(error => { console.log(error) })
  }
}

// export function logout() {      //
//   const request = _axios.post('http://localhost:3001/auth/logout')
//   localStorage.removeItem("user");
//   return { type: LOGOUT, payload: request };
// }
// -------------------------------------------------------
// export const logout = () => (dispatch) => {
//   AuthService.logout();
//   dispatch({
//     type: LOGOUT,
//   });
// };
