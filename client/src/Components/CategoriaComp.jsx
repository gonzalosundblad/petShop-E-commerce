import React  from 'react';
import { Link } from 'react-router-dom';
import  '../Estilos/productCard.css';
import  '../imagenes/perros.jpg';
import axios from 'axios';
import borrarCategoria from '../Containers/BorrarCategoria';

export default function CategoriaCard ({nombre, id}){

    return(
      <div>
      <Link to={`/products/${nombre}`}>
        <div className="card">
            {/* <figure>
                <img className="card-img-top" src='perros' alt="imagen de perro"/>
            </figure> */}
            <h1 className="card-title">Categoria</h1>
            <h1 className="card-title">{nombre}</h1>
            
        </div>
    </Link>
    <button onClick={borrarCategoria(id)}>Borrar</button>
    </div>
    )
      
      
  };


