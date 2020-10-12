import React, { useState } from 'react';

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
import AgregarCategoria from './Containers/Post';
// import CrudProduct from './Components/crudProduct'; 


function App() {
  const [products,setProducts] = useState()
  
  return (
    <div className="App">
      <BrowserRouter>
       
        <div className="searchBar">
        
        <Route  path="/" component={SearchBar}></Route>
        <Route exact path="/">
          <li className="liProducts">
            <Link to="/products"> Catalogo </Link>
          </li>
          <div className="pedigree">
          <ProductCard name="Perros" imagen={perros}/>
          </div>
          <div className="pedigree">
          <ProductCard props={Cate}/>
          </div>
        </Route>  

          </div>
          <div className="product">
        <Route exact path="/products" render={() =>
          <Cate/>} />        
        </div>
        <Route  path="/nuevaCateg"  render={() =>
          <AgregarCategoria/>}/> 
       
        <div className="productoSolo">
        <Route exact path='/products/:prodId' render={({ match }) => 
          <Product produc={match.params.prodId}/>
        }/>
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
