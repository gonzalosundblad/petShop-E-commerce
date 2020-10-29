import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  HACER_ADMIN,
  ME
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
    case ME:
      return {
        ...state,
        user: action.payload
      }

    default:
      return state;
  }
}
