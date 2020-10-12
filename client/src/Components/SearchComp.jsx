import React, { useState } from 'react';
import {Link } from "react-router-dom";
import '../Estilos/searchbar.css';
import logo from '../imagenes/logo.jpeg';
  

export default function Search ({funcion}){
    const[product, setProduct]= useState([]);
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            
            funcion(product);
        }}>
          
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
