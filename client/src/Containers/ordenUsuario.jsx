import React from 'react'
import { useState, useEffect } from 'react'
import {getCarrito} from '../Redux/actionsCarrito'
import { putOrder } from '../Redux/actionsOrden'

export default function OrdenUsuario(id){
  const [orden, setOrden] = useState({})
  const [productOrder, setproductOrder] = useState([])

  useEffect(() => {
    getCarrito(2).payload
    .then(res => {
      if(!res.data[0]){
        alert('No hay Ordenes')
      }else{
        setproductOrder(res.data[0].products)
      }
    })
  }, [])

  // var total = 0


  var precio = productOrder.map(e => e.price * e.LineaDeOrden.quantity)

  // console.log(precio)
  var total = precio.reduce(function(a, b){
    return a + b
  }, 0)

  console.log(total)

  var id2 = id.id
  console.log(id2)

  const estado = {orderState:'creada'}

  function cambioEstado(){
    putOrder(id2, estado).payload
    .then(resp => {
      console.log(resp)
      alert('Compra Exitosa')
      window.location='/'
    })
  }

  const estado2 = {orderState:'cancelada'}

  function cambioEstado2(){
    putOrder(id2, estado2).payload
    .then(resp => {
      console.log(resp)
      alert('Pedido Cancelado')
      window.location='/'
    })
  }

  return(
    <div>
      <h1>Tu Orden</h1>
      {productOrder && productOrder.map(e => {
        console.log(productOrder)
        return(
          <div>
            <h2>{e.name}</h2>
            <h2>${e.price * e.LineaDeOrden.quantity}</h2>
            <h3> Cantidad:{e.LineaDeOrden.quantity}</h3>
          </div>
          )}
          )
        }
        <h2>Total:{total} </h2>
    <button onClick={cambioEstado} >Realizar Pedido</button>
    <button onClick={cambioEstado2} >Cancelar Pedido</button>
    </div>
  )
}