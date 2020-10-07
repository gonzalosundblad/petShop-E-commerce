import React from 'react';
import logo from './logo.svg';
import './App.css';
import Product from './Components/Product';
import ProductCard from './Components/ProductCard';
import Catalogo from './Containers/Catalogo';
import {
  BrowserRouter,
  Route,
  Link
} from "react-router-dom";

var products = [{id:1, name: "Eukanuba Small", price: "$850", imagen: "https://mascotaselmolino.com.ar/3868/eukanuba-adulto-small-breed.jpg"},{id:2,name: "llllll", price: "300"},{id:3,name: "dddddd", price: "250"}]

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <li>
          <Link to="/products"> Catalogo </Link>
        </li>
        {/* <Switch> */}
        <Route exact path="/">
          <ProductCard name="jeakja"/> 
        </Route> 
        <Route path="/products" render={() => 
          <Catalogo products={products}/>}
        />   
      </BrowserRouter>      
    </div>
  );
}

export default App;
