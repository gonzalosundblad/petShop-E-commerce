<<<<<<< HEAD
<<<<<<< HEAD
import React from 'react';
import './productCard.css'
=======
=======

>>>>>>> 1394c187fde51c90a834f9a0d33ac9053a22071c
import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import './productCard.css'

<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> ad6d63aa01503dc9a76c1a1a75aafa6c5abcabd1
=======
>>>>>>> 1394c187fde51c90a834f9a0d33ac9053a22071c

=======
>>>>>>> 133698546ac9ea8ed27aa7ae5adff2bfe6a0ada9
export default function ProductCard ({id, name, price, imagen}){
  const [card, setCard] = useState()
  return(
<<<<<<< HEAD
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
=======
    <Link to={`/products/:${id}`}>
    

    <div className="card">

      <figure>
        <img className="card-img-top" src={imagen} alt="imagen de perro"/>
      </figure>
      <h1 className="card-title">{name}</h1>
>>>>>>> 1394c187fde51c90a834f9a0d33ac9053a22071c
      <ul>
        <li className="card-text">Precio:{price}</li>
      </ul>
  </div>
  </Link>
  )
} 