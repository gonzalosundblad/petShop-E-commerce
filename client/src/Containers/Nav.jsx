import React, { useState } from 'react';
import {Link} from "react-router-dom";
import logo from '../imagenes/logo.png';
import '../Estilos/SearchBar.module.css';
import SearchBar2 from '../Components/SearchBar2';
import StyleNav from '../Estilos/Nav.module.css';
import Search from '../Components/SearchComp';
import SearchBar from '../Components/SearchBar';

export default function Nav({funcionCatag, onSearch, resultados}) {

  function recargar() {
    window.location.reload()
  }

  return (
    <div className={StyleNav.nav}>
      <Link to='/'>
        <img className={StyleNav.logo} src={logo} alt=""/>
        </Link>
        <div className={StyleNav.botones}>
          <a className={StyleNav.botones} href="/BorrarCategoria">
            <button className={StyleNav.botonAddProduct}>Borrar Categoria</button>
          </a>
          <a className={StyleNav.botones} href='/products'>
            <span className={StyleNav.botonCatalogo} onClick={funcionCatag}>Catálogo</span>
          </a>
          <a className={StyleNav.botones} href='/AgregarProducto/'>
            <span className= {StyleNav.botonAddProduct}>Agregar Producto</span>
          </a>
          <a className={StyleNav.botones} href='/AgregarCategoria'>
            <span className= {StyleNav.botonAddProduct}>Agregar Categoría</span>
          </a>
          <a className={StyleNav.botones} href='/ModificarProducto/'>
            <span className= {StyleNav.botonAddProduct}>Modificar Producto</span>
          </a>
        </div>
      <Search funcion={onSearch}  />
    </div>
  );
};
  