import React, { useState} from 'react';
import { Link } from 'react-router-dom';


export default function ProductCard ({id, name, price, imagen}){
  const [card, setCard] = useState()
  return(
    <div>
      <hr/>
      <figure>
        <img src={imagen} alt="imagen de perro"/>
      </figure>
      <Link to={`/products/:${id}`}>
      <h1>Name:{name}</h1>
      </Link>
      <ul>
        <li>Price:{price}</li>
      </ul>
      <hr/>
  </div>
  )
} 