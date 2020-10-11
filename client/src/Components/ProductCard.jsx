
import React from 'react';
import { Link } from 'react-router-dom';
import './productCard.css'

export default function ProductCard ({id, name, price, imagen}){
  // const [card, setCard] = useState()
  return(
    <Link to={`/products/:${id}`}>
    

    <div className="card">

      <figure>
        <img className="card-img-top" src={imagen} alt="imagen de perro"/>
      </figure>
      <h1 className="card-title">{name}</h1>
      <ul>
        <li className="card-text">Precio:{price}</li>
      </ul>
  </div>
  </Link>
  )
} 