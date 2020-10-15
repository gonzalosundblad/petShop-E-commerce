import React from 'react';
import {
  BrowserRouter,
  Route,
} from "react-router-dom";
import Productos from './Components/Product';
import { Provider } from 'react-redux'
import store from './Redux/store';


function App() {
  
  return (
    <Provider store={store} >
      <BrowserRouter>
      <Route path="/" component={Productos} />
      </BrowserRouter>  
    </Provider>
  );
}

export default App;
