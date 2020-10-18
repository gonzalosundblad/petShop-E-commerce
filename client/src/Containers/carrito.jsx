import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { getCarrito } from '../Redux/actionsCarrito';


export default function Carrito() {
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [id, setId] = useState();
  const [price, setPrice] = useState();

    useEffect(() => {
      getCarrito(1).payload
      .then(resp => {
        console.log(resp.data)
        setName(resp.data.name)
        setImage(resp.data.image)
        setId(resp.data.id)
        setPrice(resp.data.price)
      })
    })




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