import {GET_PRODUCTS, GET_CATEGORIES,GET_CATEGORIES_NOMBRECAT, GET_ID, POST_PRODUCT, POST_IDPROD_CAT_IDCATEG, POST_CATEGORY, PUT_ID, PUT_CATEGORY_ID, DELETE_IDPROD_CAT_IDCATEG, DELETE_ID, DELETE_CATEGORY_ID, SEARCH } from './constants';

const initialState = {
  products : [],
  categories : []
};

export default (state = initialState, action) => {
  console.log(action);

  switch (action.type) {
    case GET_PRODUCTS: //obtener todos los productos
    return {
      ...state,
      products : action.payload,
    }
    case GET_CATEGORIES: //obtener todas las categorias
    return {
      ...state,
      categories : action.categories,
    }
    case GET_CATEGORIES_NOMBRECAT: // obtener todos los productos de cierta categoria
    return {
      ...state,
      categories : action.categories.products,
    }
    case GET_ID: //obtener un producto segun su id
    return {
      ...state,
      products : action.product,
    }
    case POST_PRODUCT: // agregar producto
    return {
      ...state,
      products : state.products.concat(action.product)
    }
    case POST_IDPROD_CAT_IDCATEG: //agregar a un producto existente una categoria
    return {
      ...state,
      categories : state.products.concat(action.category)
    }
    case POST_CATEGORY: //agregar una categoria
    return {
      ...state,
      categories : state.categories.concat(action.category)
    }
    case PUT_ID: //modificar un producto segun sU id
    return {
      ...state,
      products : state.products.map(prod => prod.id === action.payload.id ? action.payload : prod )
    }
    case PUT_CATEGORY_ID: //modificar una categoria
    return {
      ...state,
      categories : state.categories.map(cat => cat.id === action.payload.id ? action.payload : cat )
    }
    case DELETE_ID: //eliminar un producto
    return {
      ...state,
      products: state.products.filter((id) => id !== action.payload)
    }
    case DELETE_CATEGORY_ID: //elimina una categoria
    return {
      ...state,
      categories: state.categories.filter((id) => id !== action.payload)


    }
    case SEARCH: // busca entre todos
    return {
      ...state,
      products : action.payload

    }
    default : return state
  }
  };
