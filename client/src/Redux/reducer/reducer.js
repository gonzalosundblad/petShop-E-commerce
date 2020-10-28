import { GET_PRODUCTS, GET_CATEGORIES, GET_CATEGORIES_NOMBRECAT, GET_ID, POST_PRODUCT, POST_IDPROD_CAT_IDCATEG, POST_CATEGORY, PUT_ID, PUT_CATEGORY_ID, DELETE_IDPROD_CAT_IDCATEG, DELETE_ID, DELETE_CATEGORY_ID, SEARCH } from '../constants';
import { GET_CARRO, POST_CARRO, PUT_CANTIDAD_CARRO, DELETE_CARRITO, DELETE_CARRITOUNO, GET_CREADA } from '../constantsCarro'
import { POST_USER, GET_USER, PUT_USER, DELETE_USER, PUT_ORDER, GET_ORDENID, GET_ORDENIDUSER, DELETE_ORDER } from '../constantesOrden'
import { POST_REVIEW, PUT_REVIEW, DELETE_REVIEW, GET_ALL_REVIEW } from '../constantsReview';
import { loadState, saveState } from "./localStorage"

export const initialState = {
  products: [],
  categories: [],
  users: [],
  carrito: loadState === undefined ? [] : loadState(),
  order: [],
  reviews: [],

};

export default (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case GET_PRODUCTS: //obtener todos los productos
      return {
        ...state,
        products: action.payload,
      }
    case GET_CATEGORIES: //obtener todas las categorias
      return {
        ...state,
        categories: action.payload,
      }
    case GET_CATEGORIES_NOMBRECAT: // obtener todos los productos de cierta categoria
      return {
        ...state,
        categories: action.payload,
      }
    case GET_ID: //obtener un producto segun su id
      return {
        ...state,
        products: action.payload,
      }
    case POST_PRODUCT: // agregar producto
      return {
        ...state,
        products: state.products.concat(action.product)
      }
    case POST_IDPROD_CAT_IDCATEG: //agregar a un producto existente una categoria
      return {
        ...state,
        categories: state.products.concat(action.category)
      }
    case POST_CATEGORY: //agregar una categoria
      return {
        ...state,
        categories: state.categories.concat(action.category)
      }
    case PUT_ID: //modificar un producto segun sU id
      return {
        ...state,
        products: state.products.map(prod => prod.id === action.payload.id ? action.payload : prod)
      }
    case PUT_CATEGORY_ID: //modificar una categoria
      return {
        ...state,
        categories: state.categories.map(cat => cat.id === action.payload.id ? action.payload : cat)
      }
    case DELETE_ID: //eliminar un producto
      return {
        ...state,
        products: state.products.filter(prod => prod.id !== action.payload)
      }
    case DELETE_IDPROD_CAT_IDCATEG:
      return {
        ...state,
        products: state.products.filter(prod => prod.id !== action.payload)
      }
    case DELETE_CATEGORY_ID: //elimina una categoria
      return {
        ...state,
        categories: state.categories.filter(prod => prod.id !== action.payload)


      }
    case SEARCH: // busca entre todos
      return {
        ...state,
        products: action.payload

      }//--------------------------------------------------usuarios
    case POST_USER:  //agrega un usuario
      return {
        ...state,
        users: state.users.concat(action.payload)
      }

    case GET_USER:
      return {
        ...state,
        users: action.payload
      }

    case PUT_USER:
      return {
        ...state,
        users: state.users.map(user => user.id === action.payload.id ? action.payload : user)
      }

    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(prod => prod.id !== action.payload)
      }


    //-----------------------------------------------------Carrito
    case GET_CARRO:
      return {
        ...state,
        carrito: action.payload,
      }
    case GET_CREADA:
      return {
        ...state,
        carrito: action.payload,
      }
    case POST_CARRO:  //agrega un producto al carrito
      return {
        ...state,
        carrito: state.carrito.concat(action.carrito)
      }
    case PUT_CANTIDAD_CARRO:
      return {
        ...state,
        carrito: state.carrito.map(cart => cart.id === action.payload.id ? action.payload : cart)
      }
    case DELETE_CARRITO:
      return {
        ...state,
        carrito: state.carrito.filter(cart => cart.id !== action.payload)
      }
    case DELETE_CARRITOUNO:
      return {
        ...state,
        carrito: state.carrito.filter(cart => cart.id !== action.payload)
      }
    //--------Orden------------
    case GET_ID:
      return {
        ...state,
        order: action.payload,
      }
    case GET_ORDENIDUSER:
      return {
        ...state,
        order: action.payload,
      }
    case PUT_ORDER:
      return {
        ...state,
        order: state.order.map(ord => ord.id === action.payload.id ? action.payload : ord)
      }
    case DELETE_ORDER:
      return {
        ...state,
        order: state.order.filter(ord => ord.id !== action.payload.id)
      }
    //reviews-----------------------
    case POST_REVIEW:
      return {
        ...state,
        reviews: state.carrito.concat(action.payload)
      }
    case PUT_REVIEW:
      return {
        ...state,
        reviews: state.reviews.map(ord => ord.id === action.payload.id ? action.payload : ord)
      }
    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter(cart => cart.id !== action.payload)
      }
    case GET_ALL_REVIEW:
      return {
        ...state,
        reviews: action.payload
      }

    default: return state
  }

};
