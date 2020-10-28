import React, { useState, useEffect } from 'react';
import StyleApp from './App.module.css';
import { BrowserRouter, Route } from "react-router-dom";
import MostrarCatalogo from './Containers/Catalogo'
import {Nav} from './Containers/Nav';
import { CrudProduct } from './Containers/CrudProduct';
import { MostrarCategorias } from './Containers/Categorias';
import { ProductosPorCategoria } from './Containers/Categorias';
import { AgregarCategoria } from './Containers/Categorias';
import { ModificaCategoria } from './Containers/Categorias';
import { ListaCategorias } from './Containers/Categorias';
import ModificayBorra from './Containers/Productos';
import Product from './Components/Product';
import Catalogo from './Components/CatalogoComp';
import User from './Components/Login';
import ControlledCarousel from './Components/Carousel';
import { AgregarUsuario } from './Containers/Usuarios';
import Ordenes from './Containers/Orden';
import { search } from './Redux/actions'
import Carrito from './Containers/carrito';
import Usuarios from './Components/usuarios';
import Perfil from './Components/perfil';
import OrdenUsuario from './Containers/ordenUsuario';
import OrdenAdmin from './Components/ordenAdmin';
import { Fondo } from './Containers/fondo';
import { Animales } from './Containers/fondo';
import { ParaComprar } from './Containers/fondo';
import { PieDePagina } from './Containers/fondo';
import Reset from './Components/Reset';
import OrdenCompra from './Containers/ordenCompra';
import Carrusel from './Components/Carousel'


function App() {
  const [resultados, setResultados] = useState([]);

  function onSearch(producto) {
    search(producto).payload
      .then(resp => {
        setResultados(resp.data)
      })
  }

  return (

    <div >
      <BrowserRouter>
        <Route path="/" render={() => <Nav onSearch={onSearch} />} />
        <div className={StyleApp.App}>
          
          <Route exact path="/" render={() => <Fondo />} />
          <Route exact path="/" component={MostrarCategorias} />
          <Route exact path="/" component={Animales} />
          <Route exact path="/" component={Carrusel} />
          <Route exact path="/" component={ParaComprar} />
          <Route exact path="/" component={PieDePagina} />

          <Route exact path="/login" render={() => <User />} />
          <Route exact path="/register" render={() => <AgregarUsuario />} />
          <Route path="/products" component={ListaCategorias} />
          <Route exact path="/products" component={MostrarCatalogo} />
          <Route exact path="/products/search" render={() => <Catalogo productos={resultados} />} />
          <Route exact path={`/products/category/:Categoria`} render={({ match }) => <ProductosPorCategoria name={match.params.Categoria} />} />
          <Route exact path={`/producto/:Id`} render={({ match }) => <Product id2={match.params.Id} />} />
          <Route exact path="/carrito" render={() => <Carrito />} />
          <Route exact path="/admin/AgregarCategoria" render={() => <AgregarCategoria />} />
          <Route exact path='/admin/ModificarProducto/' component={ModificayBorra} />
          <Route exact path='/admin/ModificarCategoria/' render={() => <ModificaCategoria />} />
          <Route exact path='/admin/products/crud/' render={() => <CrudProduct />} />
          <Route exact path="/admin/products/crud/:id" render={({ match }) => <CrudProduct prod={match.params.id} />} />
          <Route exact path="/admin/ordenes" render={() => <Ordenes />} />
          <Route exact path="/admin/ordenes/:id" render={({ match }) => <OrdenAdmin id={match.params.id} />} />
          <Route exact path="/admin/usuarios" render={() => <Usuarios />} />
          <Route exact path="/user/:id" render={({ match }) => <Perfil id={match.params.id} />} />
          <Route exact path="/order/:id" render={({ match }) => <OrdenUsuario id={match.params.id} />} />
          <Route exact path="/reset" render={() => <Reset />} />
          <Route exact path="/user/:id/ordenes" render={({ match }) => <OrdenCompra id={match.params.id} />} />
        </div>
      </BrowserRouter>
    </div >
  );
}


export default App;
