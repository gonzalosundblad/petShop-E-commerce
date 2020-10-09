<<<<<<< HEAD
import React from 'react';
import './productCard.css'
=======
import React, { useState} from 'react';
import { Link } from 'react-router-dom';

>>>>>>> ad6d63aa01503dc9a76c1a1a75aafa6c5abcabd1

export default function ProductCard ({id, name, price, imagen}){
  const [card, setCard] = useState()
  return(
<<<<<<< HEAD
    <div className="card">
=======
    <Link to={`/products/:${id}`}>
    <div>
      <hr/>
>>>>>>> ad6d63aa01503dc9a76c1a1a75aafa6c5abcabd1
      <figure>
        <img className="card-img-top" src={imagen} alt="imagen de perro"/>
      </figure>
<<<<<<< HEAD
      <h1 className="card-title">{name}</h1>
=======
      
      <h1>Name:{name}</h1>
     
>>>>>>> ad6d63aa01503dc9a76c1a1a75aafa6c5abcabd1
      <ul>
        <li className="card-text">Precio:{price}</li>
      </ul>
  </div>
  </Link>
  )
} 