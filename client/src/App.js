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
import SearchBar from './Components/SearchBar';
import Cate from './Components/Axios';

var productos = [
  {cat: 'perros', id:1,name: "Eukanuba Small", description: "Hola soy un perro" , price: "$850", stock:"60", imagen: "https://mascotaselmolino.com.ar/3868/eukanuba-adulto-small-breed.jpg"},
  {cat: 'gatos', id:2,name: "CatChow", description: "Hola soy un gato", price: "$750", stock:"45", imagen: "https://www.chedraui.com.mx/medias/7501072202246-00-CH1200Wx1200H?context=bWFzdGVyfHJvb3R8MTQ4NjIzfGltYWdlL2pwZWd8aDk2L2hmYi85ODk1MTk1NzM4MTQyLmpwZ3xjMGM5ZjEwYjI2ODg3ZThhOGYyZGEzNWQ3ZWZhMDNmMzk5MDgyZmM5ZmRlNjVmM2Y2YzZhZjczMDJlYzZkYjk0"},
  {cat: 'perros', id:3,name: "dddddd", description: "Hola soy un perro", stock:"30", price: "250"},
  {cat: 'gatos', id:4,name: "aaa", description: "Hola soy un gato", stock:"20", price: "10000"}
]

var categ = ['perros', 'gatos']

function App() {
  const [products,setProducts] = useState(productos)
  
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Switch> */}
        <Route path="/" component={SearchBar}></Route>
        <Route path="/" component={Cate}></Route>
        <Route exact path="/">
          <li>
            <Link to="/category"> Catalogo </Link>
          </li>
          {/* <ProductCard name="jeakja"/>  */}
        </Route>  
        <Route exact path="/category" render={() => 
          <Catalogo products={products} categ={categ} />}
        />
        <Route exact path="/products" render={() => 
          <Cate/>}
        />

        <Route exact path='/products/:id' render={({ match }) => 
        <Product product={products.find(p => p.id === parseInt(match.params.id))}/>
        }/>

      </BrowserRouter>  
    </div>
  );
}

export default App;
