import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import { deleteCarrito, getCarrito, putCantidadOrden } from '../Redux/actionsCarrito';


export default function Carrito() {
  const [products, setProducts] = useState([])


  useEffect(() => {
    getCarrito(2).payload
    .then(res => {
      console.log(res.data[0].products)
      setProducts(res.data[0].products)

    })
  }, [])


  function reload(){
    window.location.reload()
  }

  function vaciar (){
    deleteCarrito(2).then(resp => {
      console.log(resp)
      reload()
    })
  }

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
              {/* <button onClick={delet} >X</button> */}
            </div>
            </div>
          )}
          )
        }
        <button onClick={vaciar} >Vaciar Carrito</button>
    </div>
  )
}
