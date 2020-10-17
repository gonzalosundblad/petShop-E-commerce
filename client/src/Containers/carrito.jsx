import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import { getCarrito, putCantidadOrden } from '../Redux/actionsCarrito';


export default function Carrito() {
  const [products, setProducts] = useState([])


  useEffect(() => {
    getCarrito(2).payload
    .then(res => {
      console.log(res.data[0].products)
      setProducts(res.data[0].products)

    })
  }, [])





  return(
    <div>
      <h2>Carrito de compra</h2>
      {products && products.map(encontrado => {
        return(
          <div>
            <div >
              <img src={encontrado.image} alt="imagen de perro"/>
            </div>
            <div>
              <h3>{encontrado.name} </h3>
              <h1>${encontrado.price} </h1>
              <input type="number" value={encontrado.LineaDeOrden.quantity} />
            </div>
            </div>
          )}
          )
        }
    </div>
  )
}