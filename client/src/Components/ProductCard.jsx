import React, { useState} from 'react';
import { Link } from 'react-router-dom';


export default function ProductCard ({id, name, price, imagen}){
  const [card, setCard] = useState()
  return(
    <Link to={`/products/:${id}`}>
    <div>
      <hr/>
      <figure>
        <img src={imagen} alt="imagen de perro"/>
      </figure>
      
      <h1>Name:{name}</h1>
     
      <ul>
        <li>Price:{price}</li>
      </ul>
      <hr/>
  </div>
  </Link>
  )
} 