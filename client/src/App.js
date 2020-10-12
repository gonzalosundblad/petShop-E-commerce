import React, {useState} from 'react';
import './App.css';
import Product from './Components/Product';
import ProductCard from './Components/ProductCard';
import { BrowserRouter, Route, Link} from "react-router-dom";
import MostrarCatalogo from './Containers/Catalogo2'
import Nav from './Containers/Nav'
import AgregarCategoria from './Containers/Post';
// import CrudProduct from './Components/crudProduct'; 
import CategoryPerro from './Containers/Categorias';
import Categoria2 from './Containers/Categoria2';

function App() {
  const [products,setProducts] = useState()
  
  return (
    <div className="App">
      <BrowserRouter>
      <div className="searchBar">
        <Route path="/" render={() =>  <Nav />} />
        <Route exact path="/" component={Categoria2} />
        <Route exact path="/products" component={MostrarCatalogo} />
        <Route exact path="/products/Perros" component={CategoryPerro} />
        <Route exact path="/"></Route>
        <Route  path="/nuevaCateg"  render={() =><AgregarCategoria/>}/> 
        {/* <div className="productoSolo"> */}
        {/* <Route exact path='/products/:prodId' render={({ match }) =>  <Product produc={match.params.prodId}/>}/> */}
      {/* </div>  */}
      </div> 
      </BrowserRouter>  
    </div>
  );
}


export default App;
