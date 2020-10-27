import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducer/index.js";

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
// import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import Reducer from './reducer/reducer';
// import thunk from 'redux-thunk';
// import { saveState } from './localStorege';

// const store = createStore(Reducer, composeWithDevTools(applyMiddleware(thunk)));
// store.subscribe(function () {
//   saveState(store.getState().carrito)
// })

// export default store