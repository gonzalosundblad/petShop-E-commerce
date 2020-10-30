import React, {useState} from 'react';

export default function Contador ({funcion}){
    const [contador, setContador]= useState (0);

    function sumar(){
        setContador(contador + 1)
    }

    function restar(){
        setContador(contador - 1)
    }

    return(
    <div class="btn-group" role="group" aria-label="Basic example" style={{width: "150px"}}>
        <button type="button" class="btn btn-primary" onClick={() => restar()}> - </button>
        <button type="button" class="btn btn-outline-primary" onChange={funcion}>{contador}</button>
        <button type="button" class="btn btn-primary" onClick={() => sumar()}> + </button>
    </div>
    )
}