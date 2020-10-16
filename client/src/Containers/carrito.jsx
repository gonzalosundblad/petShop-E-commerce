import React, { useState, useEffect } from 'react';
import axios from 'axios'


export default function Carrito({ producto }) {
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [id, setId] = useState();
  const [price, setPrice] = useState();





  console.log(producto)

  return(
    <div>
      <h2>Carrito de compra</h2>
      <div >
          <img src="" alt="imagen de perro"/>
        </div>
        <div>
          <h3>{name} </h3>
          <h1>${price} </h1>
        </div>
        <div>
          <input type="number"/>
        </div>
    </div>
  )
}