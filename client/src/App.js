import React from 'react';
import logo from './logo.svg';
import './App.css';
import Product from './Components/Product'
import ProductCard from './Components/ProductCard'
import Catalogo from './Containers/Catalogo';
//import Catalogo from './Containers/Catalogo'
var products = [{name: "Eukanuba Adulto Small", price: "750$", imagen: "https://mascotaselmolino.com.ar/3868/eukanuba-adulto-small-breed.jpg"},{name: "llllll", price: "300"},{name: "dddddd", price: "250"}]

function App() {
  return (
    <div className="App">
      {/* <Product/>
      <ProductCard name="jeakja"/> */}
      <Catalogo products={products}/>
    </div>
  );
}

export default App;
