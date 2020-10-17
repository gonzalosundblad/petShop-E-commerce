import React, { useState } from 'react';
import {Link} from "react-router-dom";
import logo from '../imagenes/logo.png';
import '../Estilos/SearchBar.module.css';
import SearchBar2 from '../Components/SearchBar2';
import StyleNav from '../Estilos/Nav.module.css';
import Search from '../Components/SearchComp';
import SearchBar from '../Components/SearchBar';
import {ListaDesplegable} from './ListaDesplegable';

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
        {/* <a className={StyleNav.botones} href="/BorrarCategoria">
          <span className={StyleNav.botonAddProduct}>Borrar Categoria</span>
        </a> */}
        {/* <a className={StyleNav.botones} href='/products'>
          <span className={StyleNav.botonCatalogo} onClick={funcionCatag}>Catálogo</span>
        </a> */}
        {/* <a className={StyleNav.botones} href='/AgregarProducto/'>
          <span className= {StyleNav.botonAddProduct}>Agregar Producto</span>
        </a>
        <a className={StyleNav.botones} href='/AgregarCategoria'>
          <span className= {StyleNav.botonAddProduct}>Agregar Categoría</span>
        </a>
        <a className={StyleNav.botones} href='/ModificarProducto/'>
          <span className= {StyleNav.botonAddProduct}>Modificar Producto</span>
        </a> */}
      </div>
      <ListaDesplegable/>
      <Search funcion={onSearch}  />
      <div className={StyleNav.botones}>
        <a className={StyleNav.botones} href='/user'>
          <span className={StyleNav.botonCatalogo} >Inicio</span>
        </a>
        <a className={StyleNav.botones} href='/user/products'>
          <span className={StyleNav.botonCatalogo} >Catálogo</span>
        </a>
      </div>
      
      {/* // <SearchBar2 onSearch={onSearch} productos={resultados} /> */}
    </div>
  );
};
