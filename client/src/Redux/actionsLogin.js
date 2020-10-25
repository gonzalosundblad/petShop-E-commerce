import axios from 'axios';
import { SET_SESSION, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, ME } from './constantsLogin';
import AuthService from "../services/auth.service";

var _axios = axios.create({
  withCredentials: true
})
export const loginRequest = (email, password) => (dispatch) => {
  return AuthService.login(email, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
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
        type: LOGIN_FAIL,
      });

      return Promise.reject();
    }
  );
};

// export function loginRequest(email, password) {      //agrega un nuevo producto
//   const request = axios.post('http://localhost:3001/login', { email, password })
//   return { type: LOGIN_SUCCESS, payload: request };
// }

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};

export function authMe() {//
  const request = axios.get(`http://localhost:3001/auth/me`)
  return { type: ME, payload: request }
}
