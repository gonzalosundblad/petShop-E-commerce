import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import { deleteCarrito, getCarrito, putCantidadOrden } from '../Redux/actionsCarrito';


export default function Carrito() {
  const [products, setProducts] = useState([])
  const [state, setState] = useState([])


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



  function cambiar(e){
    setState(e.target.value)
    putCantidadOrden(2, state)
    .then(res =>{
      console.log(res)
    })
  }

  function vaciar (){
    deleteCarrito(2).then(resp => {
      console.log(resp)
      reload()
    })
  }
  function handleChange(e){
    setQuantity(parseInt(e.target.value));
    console.log('quantity ' + e.target.value);
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
              <input type="number" value={encontrado.LineaDeOrden.quantity} onChange={cambiar} />
              {/* <button onClick={delet} >X</button> */}
            </div>
            </div>
          )}
          )
        }
        <button onClick={vaciar} >Vaciar Carrito</button>
        <a href="/products">Seguir Comprando</a>
        <a href="/order">Finalizar Compra</a>
    </div>
  )
}
