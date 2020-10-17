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
<<<<<<< HEAD
import { search } from './Redux/actions';
=======
import {AgregarUsuario} from './Containers/Usuarios';
>>>>>>> c9216cdfd0a6b6cab29fa9f6552489257f7c9d37

// import { search } from './redux/actions.js'
import Carrito from './Containers/carrito';
function App() {
  // const [products,setProducts] = useState()
  const [resultados, setResultados] = useState([]);
  // useEffect(() => {
  //   search(producto).payload
  //   .then(resp => setResultados(resp.data))
  // }, []);

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
<<<<<<< HEAD
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
          <Route exact path={`/user/products/:Id`} render={({ match }) => <Product id2={match.params.Id} />}/>
          {/* <Route path='/products/search' render={() => <SearchBar2 /> }/> */}
          <Route exact path='/carrito' render={() => <Carrito />}/>
          <Route exact path='/admin/products/crud/' render={() => <CrudProduct/>}/>
          <Route exact path="/admin/products/crud/:id" render={({ match }) => <CrudProduct prod={match.params.id} /> } />
          
=======
        <Route path="/" render={() =>  <Nav onSearch={onSearch}  />} />
        <Route path='/' render = {() => <Catalogo productos = {resultados} /> } />
        <div className= {StyleApp.padding}>
          {/* <Route exact path="/" render={() =>  <Presentacion />} /> */}
          {/* <Route path="/user" render={() =>  <Nav onSearch={onSearch}  />} /> */}
          <Route exact path='/' component={MostrarCategorias}/>
          <Route exact path="/" render={() =>  <ControlledCarousel />} />
          <Route exact path={`/products/category/:Categoria`} render={({match}) => <ProductosPorCategoria name={match.params.Categoria}/>}/>
          <Route exact path="/login" render={() =>  <User />} />
          <Route exact path="/register" render={() => <AgregarUsuario/> } />
            <div className= {StyleApp.padding}>
              <Route exact path="/products" component={MostrarCatalogo} />
              <Route exact path={`/producto/:Id`} render={({ match }) => <Product id2={match.params.Id} />}/>
              <Route exact path="/admin/AgregarCategoria"  render={() =><AgregarCategoria/>}/>
              <Route exact path='/admin/ModificarProducto/' render={() => <Modifica/>}/>
              <Route exact path='/admin/ModificarCategoria/' render={() => <ModificaCategoria />}/>
              <Route exact path='/admin/BorrarCategoria' render={() => <BorrarCategoria/>}/> 
              <Route exact path='/admin/products/crud/' render={() => <CrudProduct/>}/>
              <Route exact path="/admin/products/crud/:id" render={({ match }) => <CrudProduct prod={match.params.id} /> } /> 
            </div>
        </div>
>>>>>>> c9216cdfd0a6b6cab29fa9f6552489257f7c9d37
      </div>
      </BrowserRouter>
    </div>
  );
}


export default App;
