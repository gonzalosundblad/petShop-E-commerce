import React from 'react';
//import { name }  from '../../../api/src/models/Product'

// const Product = ({ titulo, descripcion, precio, stock}) => {

// }

export default function Product ({ name, description, price, stock, imagen }){
  return (
  <div>
    <figure>
      <img src={imagen} alt="imagen de perro"/>
    </figure>
    <h1>Name:{name}</h1>
    <p>Description:{description}</p>
    <ul> 
      <li>Price:{price}</li>
      <li>Stock: {stock}</li>
    </ul>
  </div>
  )
}