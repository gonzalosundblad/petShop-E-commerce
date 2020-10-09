
import React, { useState } from 'react';

import './product.css'


export default function Product ({ product }){
  //{id, name, description, price, stock, imagen }
 const [producto, setProduct] = useState(product)
 


  return (
  <div className="producto">
    <figure>

      <img className="producto-img-top" src={product.imagen} alt="imagen de perro"/>
    </figure>
    <h1 className="producto-title">{product.name}</h1>
    <p className="producto-texto">Description: {product.description}</p>
    <ul> 
      <li className="producto-text">Precio: {product.price}</li>
      <li className="producto-text">Stock: {product.stock}</li>
    </ul>
  </div>
  )
}