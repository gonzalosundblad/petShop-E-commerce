import React, { useState, useEffect } from 'react';

import StyleApp from './App.module.css';
import { BrowserRouter, Route} from "react-router-dom";
import MostrarCatalogo from './Containers/Catalogo2'
import Nav from './Containers/Nav';
import AgregarCategoria from './Containers/Post';
import CrudProduct from './Components/crudProduct';
import Categories from './Containers/Categorias';
import Categoria2 from './Containers/Categoria2';
import Modifica from './Containers/Put';
import axios from 'axios';
import Catalogo from './Components/CatalogoComp'
import Product from './Components/Product';
import ModificaCategoria from './Containers/modificaCatego'
import Presentacion from './Components/presentacion';
import User from './Components/UserNuevo'
import UserNuevo from './Components/User'
import NavAdmin from './Containers/NavBarAdmin';
import ControlledCarousel from './Components/Carousel';
import { search } from './Redux/actions';

// import { search } from './redux/actions.js'
function App() {
  const [products,setProducts] = useState()
  const [resultados, setResultados] = useState([]);

  function onSearch(producto) {
       search(producto).payload
          .then(r =>{
              setResultados(r.data);
              if(r.data.length === 0){
                return alert('No se encontraron resultados')}
          })

        }
  return (
    <div className= {StyleApp.App}>
      <BrowserRouter>
      <div>
        <Route exact path="/" render={() =>  <Presentacion />} />
        <Route exact path="/" render={() =>  <ControlledCarousel />} />
        <Route exact path="/login" render={() =>  <User />} />
        <Route exact path="/register" render={() => <UserNuevo /> } />
        <Route path="/user" render={() =>  <Nav onSearch={onSearch} productos={resultados} />} />
          <Route path="/user" render = {() => <Catalogo productos = {resultados} /> } />
          <Route exact path="/user" component={Categoria2} />
          <Route exact path="/user/products" component={MostrarCatalogo} />
          <Route exact path={`/user/products/category/:name`} render={({ match }) => <Categories name={match.params.name}/>} />
          <Route  path="/admin/"  render={() => <NavAdmin/>} />
          <Route exact path="/admin/AgregarCategoria"  render={() =><AgregarCategoria/>}/>
          <Route exact path='/admin/' render={() => <CrudProduct/>}/>
          <Route  path='/admin/ModificarProducto/' render={() => <Modifica/>}/>
          <Route  path='/admin/ModificarCategoria/' render={() => <ModificaCategoria />}/>
          <Route exact path={`/user/producto/:Id`} render={({ match }) => <Product id2={match.params.Id} />}/>
          {/* <Route path='/products/search' render={() => <SearchBar2 /> }/> */}
          <Route exact path='/admin/products/crud/' render={() => <CrudProduct/>}/>
          <Route exact path="/admin/products/crud/:id" render={({ match }) => <CrudProduct prod={match.params.id} /> } />
          
      </div>
      </BrowserRouter>
    </div>
  );
}


export default App;
