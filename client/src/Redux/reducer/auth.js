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
console.log(user)

const initialState = {
  user: []
}

export default function (state = initialState, action) {
  console.log(action)
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: payload.user
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
        user: payload.user
      }

    default:
      return state;
  }
}
