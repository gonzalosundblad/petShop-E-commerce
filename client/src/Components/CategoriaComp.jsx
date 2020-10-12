import React  from 'react';
import { Link } from 'react-router-dom';
import  '../Estilos/productCard.css';
import  '../imagenes/perros.jpg';

export default function CategoriaCard ({nombre}){
    // const [card, setCard] = useState()
    return(
      <Link to={`/products/${nombre}`}>
        <div className="card">
            {/* <figure>
                <img className="card-img-top" src='perros' alt="imagen de perro"/>
            </figure> */}
            <h1 className="card-title">Categoria</h1>
            <h1 className="card-title">{nombre}</h1>
        </div>
    </Link>
    )
  };