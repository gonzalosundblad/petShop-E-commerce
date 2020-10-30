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

const initialState = {
  user: user
}

export default function (state = initialState, action) {
  console.log(action)

  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    case LOGIN_FAIL:
      return {
        ...state,
        user: null
      };
    case LOGOUT:
      return {
        ...state,
        user: null
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
