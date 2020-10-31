import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  HACER_ADMIN,
  GET_ME,
  GET_GOOGLE,
  GET_GIT
} from "../constantsLogin.js";

const user = JSON.parse(localStorage.getItem("user"));
var logueado;
{ localStorage.getItem("user") ? logueado = true : logueado = false }


const initialState = {
  user: user,
  logged: logueado


}

export default function (state = initialState, action) {
  console.log(action.payload)

  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        logged: true
      };
    case LOGIN_FAIL:
      return {
        ...state,
        user: null,
        logged: false
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        logged: false
      };
    case GET_ME:
      return {
        ...state,
        user: action.payload
      }
    case HACER_ADMIN:
      return {
        ...state,
        user: action.payload
      }
    case GET_GOOGLE:
      return {
        ...state,
        user: action.payload
      }
    case GET_GIT:
      return {
        ...state,
        user: action.payload
      }

    default:
      return state;
  }
}
