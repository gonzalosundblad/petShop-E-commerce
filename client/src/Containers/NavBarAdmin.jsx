import React, { useState } from 'react';
import {Link} from "react-router-dom";
import logo from '../imagenes/logo.png';
import '../Estilos/SearchBar.module.css';
import SearchBar2 from '../Components/SearchBar2';
import StyleNav from '../Estilos/Nav.module.css';


export default function NavAdmin({funcionCatag, onSearch, resultados}) {

  function recargar() {
    window.location.reload()
  }

  return (
    <div className={StyleNav.nav}>
      <a href="/">
        <img className={StyleNav.logo} src={logo} alt=""/>
      </a>
      <div className={StyleNav.botones}>
        <a className={StyleNav.botones} href='/admin/AgregarCategoria'>
            <span className= {StyleNav.botonAddProduct}>Agregar Categoría</span>
        </a>
        <a className={StyleNav.botones} href='/admin/ModificarProducto/'>
            <span className= {StyleNav.botonAddProduct}>Modificar/Eliminar Producto</span>
        </a>
        <a className={StyleNav.botones} href='/admin/ModificarCategoria/'>
            <span className= {StyleNav.botonAddProduct}>Modificar/Eliminar Categoría</span>
        </a>
        <a className={StyleNav.botones} href='/admin'>
            <span className= {StyleNav.botonAddProduct}>Admin</span>
        </a>
      </div>
    </div>
  );
};
