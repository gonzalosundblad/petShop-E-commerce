import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  HACER_ADMIN,
  GET_ME,
  MESSAGE
} from "../constantsLogin.js";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user,
  message: ""
}

export default function (state = initialState, action) {
  console.log(action.payload)

  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        message: action.payload
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

    default:
      return state;
  }
}
