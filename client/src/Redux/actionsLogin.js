import axios from 'axios';
import { SET_SESSION, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './constantsLogin';
 //API_LOGIN = `http://localhost:3001/login`
 var _axios = axios.create({
   withCredentials: true
 })
 export function loginSuccess(user){//va a REDUCER
 console.log(user);
   return {
   type : LOGIN_SUCCESS,
   payload : user
 }}
 export function loginRequest({email, password}){//Va a Componente
 console.log({email, password});
   return (dispatch) => {
     axios.post('http://localhost:3001/auth/login', {email, password})
     .then(response => {dispatch(loginSuccess(response))})
     .catch(err => {console.log(err)})
   }
 }
