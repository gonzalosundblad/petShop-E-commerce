import React  from 'react';
import { Link } from 'react-router-dom';
import  StyleCategoria from '../Estilos/CategoriaComp.module.css';
import  '../imagenes/perros.jpg';
import { useState } from 'react';


export default function CategoriaCard ({nombre, id}){
  // const [idCambiado, setID] = useState ([]);

    return(
      <a className={StyleCategoria.card1} href={`/user/products/category/${nombre}`}>
        {/* <figure>
            <img className="card-img-top" src='perros' alt="imagen de perro"/>
        </figure> */}
        <h3 className={StyleCategoria.titleCat}>Categoría</h3>
        <h1 className={StyleCategoria.titleName}>{nombre}</h1>
        <div class={StyleCategoria.goCorner}>
          <div class={StyleCategoria.goArrow}> → </div>
        </div>
      </a>
    )
  };
