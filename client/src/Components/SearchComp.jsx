import React, { useState } from 'react';
import {Link } from "react-router-dom";
import StyleSearchComp from '../Estilos/SearchBar.module.css';
  

export default function Search ({funcion}){
    const[product, setProduct]= useState([]);
    return (
        <form onSubmit={(e) => {
            e.preventDefault(); 
            funcion(product); }}>
            <div className={StyleSearchComp.inputs}>
                <input className={StyleSearchComp.barra} type="search"
                    placeholder="Ingresar Producto"
                    value={product} 
                    onChange={e => setProduct(e.target.value)}>
                </input>
                {/* <Link to='/products/search'> */}
                    <input className={StyleSearchComp.boton} type="submit" value="." />
                {/* </Link> */}
            </div>
        </form>
    )
}
