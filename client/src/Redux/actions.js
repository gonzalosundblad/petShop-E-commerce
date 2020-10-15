import axios from 'axios'
import { GET_ALL, GET_PRODUCTOS_CATEGORY} from './constantes'


export function mostrarProductos() {
  return function(dispatch) {
      return axios.get("http://localhost:3001/products")
        .then(response =>{
          console.log(response.data)
          dispatch({ type: GET_ALL, payload: response.data });
        })
  };
}

export const productosCategoria = (name) => {
    return function(dispatch){
      return axios.get(`http://localhost:3001/products/category/${name}`)
      .then(resp => {
        dispatch({
          type: GET_PRODUCTOS_CATEGORY,
          payload: resp.data
        })
      })
    }
 }


