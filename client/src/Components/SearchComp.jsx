import React, { useState } from 'react';
import {useHistory} from "react-router-dom";
import StyleSearchComp from '../Estilos/SearchBar.module.css';


export default function Search ({funcion}){
    const[producto, setProduct]= useState([]);
    const history= useHistory();
    return (
        <form onSubmit={(e) => {
            e.preventDefault(); 
            funcion(producto); 
            history.push('/products/search');
            }}>
            <div className={StyleSearchComp.inputs}>
                <input className={StyleSearchComp.barra} type="search"
                    placeholder="Buscar productos..."
                    value={producto} 
                    onChange={e => setProduct(e.target.value)}>
                </input>
                <input className={StyleSearchComp.boton} type="submit" value="." />

            </div>
        </form>
    )
}
