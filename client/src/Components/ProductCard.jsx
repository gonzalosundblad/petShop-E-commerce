import React from 'react';
import './productCard.css'

export default function ProductCard ({name, price, imagen}){
  return(
    <div className="card">
      <figure>
        <img className="card-img-top" src={imagen} alt="imagen de perro"/>
      </figure>
      <h1 className="card-title">{name}</h1>
      <ul>
        <li className="card-text">Precio:{price}</li>
      </ul>
  </div>
  )
} 