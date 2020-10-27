import React, { useState } from 'react';
import {Link } from "react-router-dom";
import StyleSearchComp from '../Estilos/SearchBar.module.css';
// import lupa from './'

export default function Search ({funcion}){
    const[producto, setProduct]= useState([]);
    return (
        <form onSubmit={(e) => {
            e.preventDefault(); 
            funcion(producto); }}>
            <div className={StyleSearchComp.inputs}>
                <input className={StyleSearchComp.barra} type="search"
                    placeholder="Buscar productos..."
                    value={producto} 
                    onChange={e => setProduct(e.target.value)}>
                </input>
                {/* <a class="nav-link" href='/search'> */}
                    <input className={StyleSearchComp.boton} type="submit" value="." />
               {/* </a> */}
            </div>
        </form>
    )
}
