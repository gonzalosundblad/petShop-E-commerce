import React, { useState } from 'react';
import '../Components/searchbar.css';
import {
    Link
  } from "react-router-dom";
  import './searchbar.css'
  import logo from '../imagenes/logo.jpeg';
  import '../Components/searchbar.css';

export default function Search ({funcion}){
    const[product, setProduct]= useState([]);
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            
            funcion(product);
        }}>
          <Link exact to="/">
            <img className="logo" src={logo} alt=""/>
          </Link>
          <div>
            <input className="barra" type="search"
                placeholder="Ingresar Producto"
                value={product} 
                onChange={e => setProduct(e.target.value)}>
            </input>
            
            {/* <Link to='/products/search'> */}
            <input className="boton" type="submit" value="BUSCAR" />
            {/* </Link> */}
             </div>
        </form>
       
    )
}
