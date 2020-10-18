import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import { deleteCarrito, getCarrito, putCantidadOrden, deleteCarritoUno } from '../Redux/actionsCarrito';


export default function Carrito() {
  const [products, setProducts] = useState([])
  const [state, setState] = useState([])
  const [borrado, setBorrado] = useState([])


  useEffect(() => {
    getCarrito(2).payload
    .then(res => {
      setProducts(res.data[0].products)
    })
  }, [])


  function reload(){
    window.location.reload()
  }



  function cambiar(e){
    setState(parseInt(e.target.value))
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
  function onDelete (e){
    const f = (element) => element.id == e.target.value
    let index =  products.findIndex(f)
    var borrado = products.splice(index, 1)
    var product_id = borrado[0].id

    deleteCarritoUno(2, 1).payload
    .then(resp => {
      console.log(resp)
    })



  }

  if(products.length <= 0){
    return(
      <div>
        <h1>Agregar productos al carrito</h1>
        <a href="/products">Ir al Catálogo</a>
      </div>
    )
  }else{
    console.log(products)

  return(
    <div>
      <h2>Tus productos</h2>
      {products && products.map(encontrado => {
        return(
          <div key={encontrado.id}>
            <div>
              <img src={encontrado.image} alt="imagen de perro"/>
            </div>
            <div>
              <h3>{encontrado.name} </h3>
              <h1>${encontrado.price} </h1>
              <input type="number" value={encontrado.LineaDeOrden.quantity} onChange={cambiar} />
              <button onClick={onDelete} value={encontrado.id} >X</button>
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
}
