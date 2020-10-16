import React, { useState } from 'react';
import {Link } from "react-router-dom";
import StyleSearchComp from '../Estilos/SearchBar.module.css';
  

export default function Search ({funcion}){
    const[producto, setProduct]= useState([]);
    return (
        <form onSubmit={(e) => {
            e.preventDefault(); 
            funcion(producto); }}>
            <div className={StyleSearchComp.inputs}>
                <input className={StyleSearchComp.barra} type="search"
                    placeholder="Ingresar Producto"
                    value={producto} 
                    onChange={e => setProduct(e.target.value)}>
                </input>
                {/* <a href='/products/search'> */}
                    <input className={StyleSearchComp.boton} type="submit" value="." />
               {/* </a> */}
            </div>
        </form>
    )
}
