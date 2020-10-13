import React, {useState} from 'react';
import './App.css';
import Product from './Components/Product';
import ProductCard from './Components/ProductCard';
import { BrowserRouter, Route, Link} from "react-router-dom";
import MostrarCatalogo from './Containers/Catalogo2'
import Nav from './Containers/Nav';
import AgregarCategoria from './Containers/Post';
import CrudProduct from './Components/crudProduct'; 
import Categories from './Containers/Categorias';
import Categoria2 from './Containers/Categoria2';
import ProductoSolo from './Containers/ProductoSolo';

function App() {
  const [products,setProducts] = useState()
  
  return (
    <div className="App">
      <BrowserRouter>
      <div className="searchBar">
        <Route path="/" render={() =>  <Nav />} />
        <Route exact path="/" component={Categoria2} />
        <Route exact path="/products" component={MostrarCatalogo} />
        <Route exact path={`/products/:Categoria`} render={({match}) => <Categories Categ={match.params.Categoria}/>}/>
        <Route exact path='/product/crud/' render={() => <CrudProduct/>}/>
        <Route exact path='/product/AgregarCategoria' render={() => <AgregarCategoria/>}/> 
        <Route exact path={`/producto/:Id`} render={({ match }) =>  <ProductoSolo Id={match.params.Id}/>}/> 
     
      </div> 
      </BrowserRouter>  
    </div>
  );
}


export default App;

