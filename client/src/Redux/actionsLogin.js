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
//-------------------------------------------------------
 export const logout = () => (dispatch) => {
   AuthService.logout();
   dispatch({
     type: LOGOUT,
   });
 };
