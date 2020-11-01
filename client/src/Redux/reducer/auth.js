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
  message: "",
  logged: false
}

export default function (state = initialState, action) {
  console.log(action)

  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        message: "LOGIN_SUCCESS",
        logged: true
      };
    case MESSAGE:
    return {
      ...state,
      message: action.payload
    };
    case LOGIN_FAIL:
      return {
        ...state,
        user: null,
        logged:false,
        message: "LOGIN_FAIL"
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        logged:false,
        message: "LOGOUT"
      };
    case GET_ME:
      return {
        ...state,
        user: action.payload.user,
        message: "GET_ME",
        logged: true
      }
    case HACER_ADMIN:
      return {
        ...state,
        user: action.payload,
        logged: true,
        message: "HACER_ADMIN"
      }

    default:
      return state;
  }
}
