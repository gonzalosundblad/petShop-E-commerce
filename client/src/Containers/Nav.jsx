import React, { useState } from 'react';
import {Link} from "react-router-dom";
import Search from '../Components/SearchComp';
import logo from '../imagenes/logo.jpeg';
import '../Components/searchbar.css';
import SearchBar from '../Components/SearchBar';
import SearchBar2 from '../Components/SearchBar2';
import Select from '../Components/SelectComp';
import Categoria2 from './Categoria2';

export default function Nav({funcionCatag, funcionSearch}) {
    return (
      <div>
        {/* <Link exact to="/">
            <img className={logo} src={logo} alt=""/>
          </Link> */}
        {/* <Search funcion={}/> */}
        <SearchBar2/>
        <Link to='/products'>
          <button onClick={funcionCatag}>Catalogoooo</button>
        </Link>
         <Categoria2/>
       
       
      </div>
    );
  };


  // <select>
  //         <option value='products/perros'>Categorias</option>
  //         <option > Perros </option>
  //         <option > Gatos </option>
  //         <option > Aves </option>
  //       </select>
       