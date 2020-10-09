<<<<<<< HEAD
import React from 'react';
import './product.css'

export default function Product ( { product } ){
=======

import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export default function Product ({ product }){
  //{id, name, description, price, stock, imagen }
 const [producto, setProduct] = useState(product)
 
>>>>>>> ad6d63aa01503dc9a76c1a1a75aafa6c5abcabd1
  return (
  <div className="producto">
    <figure>
<<<<<<< HEAD
      <img className="producto-img-top" src={product.imagen} alt="imagen de perro"/>
    </figure>
    <h1 className="producto-title">{product.name}</h1>
    <p className="producto-texto">Description: {product.description}</p>
    <ul> 
      <li className="producto-text">Precio: {product.price}</li>
      <li className="producto-text">Stock: {product.stock}</li>
=======
      <img src={product.imagen} alt="imagen de perro"/>
    </figure>
    <h1>Name:{product.name}</h1>
    <p>Description:{product.description}</p>
    <ul> 
      <li>Price:{product.price}</li>
      <li>Stock: {product.stock}</li>
>>>>>>> ad6d63aa01503dc9a76c1a1a75aafa6c5abcabd1
    </ul>
  </div>
  )
}