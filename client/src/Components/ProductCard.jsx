import React from 'react';


export default function ProductCard ({name, price, imagen}){
  return(
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
  )
} 