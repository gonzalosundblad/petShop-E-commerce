import React, { useState } from 'react';
import {Link} from "react-router-dom";

import logo from '../imagenes/logo.jpeg';
import '../Estilos/searchbar.css';
import SearchBar2 from '../Components/SearchBar2';



export default function Nav({funcionCatag, funcionSearch}) {
    return (
      <div>
        <Link exact to="/">
          <img className="logo" src={logo} alt=""/>
        </Link>
        <SearchBar2/>
        <Link to='/products'>
          <button onClick={funcionCatag}>Catalogoooo</button>
        </Link>
        <Link to='/product/crud'>
          <button >Agregar Producto</button>
        </Link>
        <Link to='/product/AgregarCategoria'>
          <button >Agregar Categoria</button>
        </Link>
      </div>
    );
  };


  // <select>
  //         <option value='products/perros'>Categorias</option>
  //         <option > Perros </option>
  //         <option > Gatos </option>
  //         <option > Aves </option>
  //       </select>
       