import React, { useState, useEffect } from 'react';
import StyleApp from './App.module.css';
import { BrowserRouter, Route } from "react-router-dom";
import MostrarCatalogo from './Containers/Catalogo'
import {Nav} from './Containers/Nav';
import CrudProduct from './Containers/CrudProduct';
import { mostrarCategorias } from './Containers/Categorias';
import ProductosPorCategoria from './Containers/ProdCateg';
import { agregarCategoria } from './Containers/Categorias';
import ModificaCategoria from './Containers/modifyborrCateg';
import { listaCategorias } from './Containers/Categorias';
import ModificayBorra from './Containers/Productos';
import Product from './Components/Product';
import Catalogo from './Components/CatalogoComp';
import User from './Components/Login';
import ControlledCarousel from './Components/Carousel';
import AgregarUsuario from './Containers/Usuarios';
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
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import Cancel from './Components/Cancel';
import CheckoutLogeado from './Components/CheckoutLogeado';
import CheckoutNoLog from './Components/CheckoutNoLog';
import Pagos from './Components/Pagos';


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
          <Route exact path="/" component={mostrarCategorias} />
          <Route exact path="/" component={Animales} />
          <Route exact path="/" component={Carrusel} />
          <Route exact path="/" component={ParaComprar} />
          <Route exact path="/" component={PieDePagina} />
          <Route exact path="/login" render={() => <User />} />
          <Route exact path="/register" render={() => <AgregarUsuario />} />
          <Route path="/products" component={listaCategorias} />
          <Route exact path="/products" component={MostrarCatalogo} />
          <Route exact path="/products/search" render={() => <Catalogo productos={resultados} />} />
          <Route exact path={`/products/category/:Categoria`} render={({ match }) => <ProductosPorCategoria name={match.params.Categoria} />} />
          <Route exact path={`/producto/:Id`} render={({ match }) => <Product id2={match.params.Id} />} />
          <Route exact path="/carrito" render={() => <Carrito />} />
          <Route exact path="/admin/AgregarCategoria" component={agregarCategoria} />
          <Route exact path='/admin/ModificarProducto/' render={() => <ModificayBorra />} />
          <Route exact path='/admin/ModificarCategoria/' render={() => <ModificaCategoria />} />
          <Route exact path='/admin/products/crud/' component={CrudProduct} />
          {/* <Route exact path="/admin/products/crud/:id" render={({ match }) => <CrudProduct prod={match.params.id} />} /> */}
          <Route exact path="/admin/ordenes" render={() => <Ordenes />} />
          <Route exact path="/admin/ordenes/:id" render={({ match }) => <OrdenAdmin id={match.params.id} />} />
          <Route exact path="/admin/usuarios" render={() => <Usuarios />} />
          <Route exact path="/perfil" render={() => <Perfil />} />
          <Route exact path="/order/:id" render={({ match }) => <OrdenUsuario id2={match.params.id} />} />
          <Route exact path="/reset" render={() => <Reset />} />
          <Route exact path="/user/:id/ordenes" render={({ match }) => <OrdenCompra id={match.params.id} />} />
          <Route exact path="/forgot" render={() => <ForgotPassword />} />
          <Route exact path="/resetpassword/:token" render={() => <ResetPassword/>} />
          <Route exact path="/perfil" render={() => <Perfil />} />
          <Route path='/cancel' render={() => <Cancel/>} />
          <Route path='/checkoutlog' render={() => <CheckoutLogeado/>} />
          <Route path='/checkoutguest' render={() => <CheckoutNoLog/>} />
          <Route path='/pago' render={() => <Pagos/>} />




        </div>
      </BrowserRouter>
    </div >
  );
}


export default App;
