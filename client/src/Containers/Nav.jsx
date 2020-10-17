import React, { useState } from 'react';
import {Link} from "react-router-dom";
import logo from '../imagenes/logo.png';
import '../Estilos/SearchBar.module.css';
import SearchBar2 from '../Components/SearchBar2';
import StyleNav from '../Estilos/Nav.module.css';
import Search from '../Components/SearchComp';
import SearchBar from '../Components/SearchBar';
import {ListaDesplegable} from '../Components/ListaDesplegable';

export default function NavBar({funcionCatag, onSearch}) {

  function recargar() {
    window.location.reload()
  }

  return (
    <div className={StyleNav.nav}>
      <div className={StyleNav.divFixed}>
        <div>
          <Link to='/'>
            <img className={StyleNav.logo} src={logo} alt=""/>
          </Link>
        </div>
        <div>
          <Search funcion={onSearch}/> 
        </div>
      </div>
      <div className={StyleNav.divBotones}>
        <div className={StyleNav.botones}>
          <a className={StyleNav.botones} href='/products'>
            <span className={StyleNav.botonCatalogo} >Catálogo</span>
          </a>
          <a className={StyleNav.botones} href='/register'>
            <span className={StyleNav.botonCatalogo} >Registrarse</span>
          </a>
          <a className={StyleNav.botones} href='/login'>
            <span className={StyleNav.botonCatalogo} >Iniciar Sesión</span>
          </a> 
          <a className={StyleNav.botones} href='/carrito'>
            <span className={StyleNav.botonCatalogo} >Carrito</span>
          </a> 
          <ListaDesplegable/> 
        </div>   
      </div>
      
      {/* // <SearchBar2 onSearch={onSearch} productos={resultados} /> */}
    </div>
  );
};
