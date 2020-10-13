import React, {useState, useEffect } from 'react';

import perros from './imagenes/perros.jpg'
import gatos from './imagenes/gatos.jpg'
// import perro from './imagenes/dogChowPerro.jpg'
// import gato from './imagenes/razaGatos.jpg'
// import comida from './imagenes/comida.jpg'
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
import Cate from './Containers/Axios';
import CrudProduct from './Components/crudProduct';
// import CrudProduct from './Components/crudProduct'; 
import  axios from 'axios';
// var productos = [
//   {cat: 'perros', id:1,name: "Eukanuba Small", description: "Hola soy un perro" , price: "$850", stock:"60", imagen: "https://mascotaselmolino.com.ar/3868/eukanuba-adulto-small-breed.jpg"},
//   {cat: 'gatos', id:2,name: "CatChow", description: "Hola soy un gato", price: "$750", stock:"45", imagen: "https://www.chedraui.com.mx/medias/7501072202246-00-CH1200Wx1200H?context=bWFzdGVyfHJvb3R8MTQ4NjIzfGltYWdlL2pwZWd8aDk2L2hmYi85ODk1MTk1NzM4MTQyLmpwZ3xjMGM5ZjEwYjI2ODg3ZThhOGYyZGEzNWQ3ZWZhMDNmMzk5MDgyZmM5ZmRlNjVmM2Y2YzZhZjczMDJlYzZkYjk0"},
//   {cat: 'perros', id:3,name: "dddddd", description: "Hola soy un perro", stock:"30", price: "250"},
//   {cat: 'gatos', id:4,name: "aaa", description: "Hola soy un gato", stock:"20", price: "10000"}
// ]

var categ = ['perros', 'gatos']

 


function App() {
  const [ categories, setCategories] = useState()
  
  return (
    <div className="App">
      <BrowserRouter>
       
        <div className="searchBar">
          <Route  path="/" component={SearchBar}></Route>
          <Route path="/" render={() => 
            <Cate/> } />
          <Route exact path="/">
            <div className="pedigree">
              <ProductCard name="Perros" imagen={perros}/>
            </div>
            <div className="pedigree">
              <ProductCard name="Gatos" imagen={gatos}/>
            </div>
          </Route>
        </div>

 
          {/* </div> */}
          {/* <div className="product"> */}
        {/* <Route exact path="/products" render={() => 
          <Catalogo products={products} categ={categ} />}
        /> */}
       
      <div className="productoSolo">
        <Route exact path='/products/:prodId' render={({ match }) => 
          <Product produc={match.params.prodId}/>
        }/>
        
        <Route exact path='/product/crud/' component={CrudProduct}/>
        <Route exact path={'/product/crud/:ID'} render={({ match }) => <CrudProduct prod={match.params.ID}/>}/>     
      </div> 
      </BrowserRouter>  
    </div>
  );
}

// Axios({
//   method: "GET",
//   url: "http://localhost:5000/",
//   headers: {
//     "Content-Type": "application/json"
//   }
// }).then(res => {
//   console.log(res.data.message);
// });

export default App;
