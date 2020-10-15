import { GET_ALL, GET_PRODUCTOS_CATEGORY} from './constantes'

const initialState = {}

export default function productos(state = initialState, action){
  switch(action.type){
    case GET_ALL:
    return{
      ...state,
      payload: action.payload
    }
    break;
    case GET_PRODUCTOS_CATEGORY:
      return{
        ...state,
        payload: action.payload
      }
      default:
      return {...state}
  }
}