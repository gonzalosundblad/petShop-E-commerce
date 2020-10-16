import React, { useState } from 'react';
import {Link} from "react-router-dom";
import logo from '../imagenes/logo.png';
import '../Estilos/SearchBar.module.css';
import StyleNav from '../Estilos/Nav.module.css';

export default function NavBar({funcionCatag, onSearch, resultados}) {

  function recargar() {
    window.location.reload()
  }

  return (
    <div className={StyleNav.nav}>
      <a href="/">
        <img className={StyleNav.logo} src={logo} alt=""/>
      </a>
      <a className={StyleNav.botones} href='/user'>
            <span className= {StyleNav.botonAddProduct}>Inicio</span>
        </a>
      <a className={StyleNav.botones} href='/admin'>
            <span className= {StyleNav.botonAddProduct}>Admin</span>
        </a>

    </div>
  );
};
