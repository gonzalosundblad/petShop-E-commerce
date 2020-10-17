import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import { getCarrito, putCantidadOrden } from '../Redux/actionsCarrito';


export default function Carrito() {
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [product_id, setId] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [cantidad, setCantidad] = useState();


    useEffect(() => {
      getCarrito(2).payload
      //axios.get(`http://localhost:3001/users/${2}/cart`)
      .then(resp => {
        console.log('data' + resp.data[0].products)
        setName(resp.data[0].products[0].name)
        setImage(resp.data[0].products[0].image)
        setId(resp.data[0].products[0].id)
        setPrice(resp.data[0].products[0].price)
        setCantidad(resp.data[0].products[0].LineaDeOrden.quantity)
        console.log(resp.data[0].products[0].LineaDeOrden.quantity)
      })
      .catch(error => 'error')
    })


    function handleChange(e){
      setQuantity(e.target.value)
      console.log('cantidad ' + cantidad);
    }

  return(
    <div>
      <h2>Carrito de compra</h2>
      <div >
          <img src={image} alt="imagen de perro"/>
        </div>
        <div>
          <h3>{name} </h3>
          <h1>${price} </h1>
          <input type="number" defaultValue= "1" onChange={handleChange} />

        </div>
    </div>
  )
}
