import React, {useState} from 'react';
import estilo from '../Estilos/Contador.module.css';

export default function Contador ({funcion,  valor}){
    const [contador, setContador]= useState (valor)


    function sumar(){
        setContador(contador + 1)
    }

    function restar(){
        setContador(contador - 1)
    }

    return(
    <div style={{width: "150px", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <button type="button" className={estilo.boton} onClick={() => restar()}> - </button>
        <input className={estilo.input} onChange={funcion} value={contador}/>
        <button type="button" className={estilo.boton} onClick={() => sumar()}> + </button>
    </div>
    )
}