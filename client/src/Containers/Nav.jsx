import React, { useState } from 'react';
import {Link} from "react-router-dom";
import logo from '../imagenes/logo.png';
import '../Estilos/SearchBar.module.css';
import SearchBar2 from '../Components/SearchBar2';
import StyleNav from '../Estilos/Nav.module.css';
import Search from '../Components/SearchComp';
import SearchBar from '../Components/SearchBar';

export default function Nav({funcionCatag, funcionSearch}) {
  return (
    <div className={StyleNav.nav}>
      <Link exact to="/">
        <img className={StyleNav.logo} src={logo} alt=""/>
      </Link>
      <Link exact to="/BorrarCategoria">
       <button className={StyleNav.botones}>Borrar Categoria</button>
      </Link>
      <div className={StyleNav.botones}>
        <a className={StyleNav.botones} href='/products'>
            <span className={StyleNav.botonCatalogo} onClick={funcionCatag}>Catálogo</span>
        </a>
        <a className={StyleNav.botones} href='/AgregarProducto/'>
            <span className= {StyleNav.botonAddProduct}>Agregar Producto</span>
        </a>
        <a className={StyleNav.botones} href='/AgregarCategoria'>
            <span className= {StyleNav.botonAddProduct}>Agregar Categoría</span>
        </a>
      </div>
      {/* <SearchBar2 /> */}
      <SearchBar2/>
      
    </div>
  );
};
  