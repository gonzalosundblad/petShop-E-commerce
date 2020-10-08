import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export default function Product ({ product }){
  //{id, name, description, price, stock, imagen }
 const [producto, setProduct] = useState(product)
 
  return (
  <div>
    <figure>
      <img src={product.imagen} alt="imagen de perro"/>
    </figure>
    <h1>Name:{product.name}</h1>
    <p>Description:{product.description}</p>
    <ul> 
      <li>Price:{product.price}</li>
      <li>Stock: {product.stock}</li>
    </ul>
  </div>
  )
}