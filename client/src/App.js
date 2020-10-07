import React, { useState } from 'react';
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
var productos = [
  {cat: 'perros', id:1,name: "Eukanuba Small", price: "$850", imagen: "https://mascotaselmolino.com.ar/3868/eukanuba-adulto-small-breed.jpg"},
  {cat: 'gatos', id:2,name: "CatChow", price: "$750", imagen: "https://www.chedraui.com.mx/medias/7501072202246-00-CH1200Wx1200H?context=bWFzdGVyfHJvb3R8MTQ4NjIzfGltYWdlL2pwZWd8aDk2L2hmYi85ODk1MTk1NzM4MTQyLmpwZ3xjMGM5ZjEwYjI2ODg3ZThhOGYyZGEzNWQ3ZWZhMDNmMzk5MDgyZmM5ZmRlNjVmM2Y2YzZhZjczMDJlYzZkYjk0"},
  {cat: 'perros', id:3,name: "dddddd", price: "250"},
  {cat: 'gatos', id:4,name: "aaa", price: "10000"}
]

var categ = ['perros', 'gatos']

function App() {
  const [products,setProducts] = useState(productos)
  
  // function filtrarCategoria(id) {
  //   setCities(oldCities => oldCities.filter(c => c.id !== id )); //el filter realiza una lista de ciudades que no tengan esa id
  // }

  return (
    <div className="App">
      <BrowserRouter>
        {/* <Switch> */}
        <Route exact path="/">
          <li>
            <Link to="/products"> Catalogo </Link>
          </li>
          <ProductCard name="jeakja"/> 
        </Route>  
        <Route path="/products" render={() => 
          <Catalogo products={products} categ={categ} />}
        />
        <Route path="/products/:Categoria" render={() => 
          <Catalogo products={products} categ={categ} />}
        />
              
      </BrowserRouter>  
    </div>
  );
}

export default App;
