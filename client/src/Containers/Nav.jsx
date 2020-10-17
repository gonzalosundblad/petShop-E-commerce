import React, { useState } from 'react';
import {Link} from "react-router-dom";
import logo from '../imagenes/logo.png';
import '../Estilos/SearchBar.module.css';
import SearchBar2 from '../Components/SearchBar2';
import StyleNav from '../Estilos/Nav.module.css';


export default function Nav({funcionCatag, onSearch, resultados}) {

  function recargar() {
    window.location.reload()
  }

  return (
    <div className={StyleNav.nav}>
      <a href="/">
        <img className={StyleNav.logo} src={logo} alt=""/>
      </a>
      <div className={StyleNav.botones}>
        <a className={StyleNav.botones} href='/user'>
            <span className={StyleNav.botonCatalogo} onClick={funcionCatag}>Inicio</span>
            </a>
        <a className={StyleNav.botones} href='/user/products'>
            <span className={StyleNav.botonCatalogo} onClick={funcionCatag}>Catálogo</span>
            </a>
        <a className={StyleNav.botones} href='/carrito'>
            <span className={StyleNav.botonCatalogo}>Mi Carrito</span>
            </a>
      </div>
      <SearchBar2 onSearch={onSearch} productos={resultados} />
    </div>
  );
};
