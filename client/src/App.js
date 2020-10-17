import React, { useState, useEffect } from 'react';
import StyleApp from './App.module.css';
import { BrowserRouter, Route} from "react-router-dom";
import MostrarCatalogo from './Containers/Catalogo'
import Nav from './Containers/Nav';
import {CrudProduct} from './Containers/Productos';
import {MostrarCategorias} from './Containers/Categorias';
import {ProductosPorCategoria} from './Containers/Categorias';
import {BorrarCategoria} from './Containers/Categorias';
import {AgregarCategoria} from './Containers/Categorias';
import {ModificaCategoria} from './Containers/Categorias';
import {Modifica} from './Containers/Productos';
import axios from 'axios';
import Product from './Components/Product';
import Catalogo from './Components/CatalogoComp';
import Presentacion from './Components/presentacion';
import User from './Components/UserNuevo';
import UserNuevo from './Components/User';
import NavAdmin from './Containers/NavBarAdmin';
import ControlledCarousel from './Components/Carousel';

// import { search } from './redux/actions.js'
function App() {
  // const [products,setProducts] = useState()
  const [resultados, setResultados] = useState([]);
  // useEffect(() => {
  //   search(producto).payload
  //   .then(resp => setResultados(resp.data))
  // }, []);

  function onSearch(producto) {
       axios.get(`http://localhost:3001/search?products=${producto}`)
          .then(r =>{
              const array = r.data;
              setResultados(array);
              if(array.length === 0){
                return alert('No se encontraron resultados')}
          })

        }
  return (
    <div className= {StyleApp.App}>
      <BrowserRouter>
      <div>
        {/* <Route path="/" render={() =>  <Nav onSearch={onSearch}  />} /> */}
        <div className= {StyleApp.padding}>
        <Route exact path="/" render={() =>  <Presentacion />} />
        <Route exact path="/" render={() =>  <ControlledCarousel />} />
        <Route path="/user" render={() =>  <Nav onSearch={onSearch}  />} />
        <Route path='/user' render = {() => <Catalogo productos = {resultados} /> } />
        <Route exact path='/user' component={MostrarCategorias}/>
        <Route exact path={`/user/products/category/:Categoria`} render={({match}) => <ProductosPorCategoria name={match.params.Categoria}/>}/>
        <Route exact path="/products/crud/:id" render={({ match }) => <CrudProduct prod={match.params.id} /> } />
        <Route exact path="/login" render={() =>  <User />} />
        <Route exact path="/register" render={() => <UserNuevo /> } />
            <div className= {StyleApp.padding}>
              <Route exact path="/user/products" component={MostrarCatalogo} />
              <Route exact path={`/user/producto/:Id`} render={({ match }) => <Product id2={match.params.Id} />}/>
              {/* <Route exact path='/admin/' render={() => <CrudProduct/>}/> */}
              <Route  path="/admin/"  render={() => <NavAdmin/>} />
              <Route exact path="/admin/AgregarCategoria"  render={() =><AgregarCategoria/>}/>
              <Route exact path='/admin/ModificarProducto/' render={() => <Modifica/>}/>
              <Route exact path='/admin/ModificarCategoria/' render={() => <ModificaCategoria />}/>
              <Route exact path='admin/BorrarCategoria' render={() => <BorrarCategoria/>}/> 
              <Route exact path='/admin/products/crud/' render={() => <CrudProduct/>}/>
              <Route exact path="/admin/products/crud/:id" render={({ match }) => <CrudProduct prod={match.params.id} /> } /> 
            </div>
        </div>
      </div>
      </BrowserRouter>
    </div>
  );
}


export default App;
