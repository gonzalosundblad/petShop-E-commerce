import React from 'react'
import { useState, useEffect } from 'react'
import {getProdOrder} from '../Redux/actionsCarrito'
import { putOrder } from '../Redux/actionsOrden'
import StyleOrden from '../Estilos/ordenesUsuario.module.css'
import { connect } from "react-redux";

function OrdenUsuario(props){
  const [productOrder, setproductOrder] = useState([])
  console.log('hhhhhhhhhhhhhhhhhh');
console.log(props);
const id = 3
  useEffect(() => {
    getProdOrder(2).payload
    .then(res => {
      if(!res.data[0]){
        alert('No hay Ordenes')
      }else{
        console.log(res.data[0].products)
        setproductOrder(res.data[0].products)
      }
    })
  }, [])
  // var total = 0


  // var precio = productOrder.map(e => e.price * e.LineaDeOrden.quantity)

  // var total = precio.reduce(function(a, b){
  //   return a + b
  // }, 0)


  var id2 = id.id
  console.log(id2)

  const estado = {orderState:'creada'}

  function cambioEstado(){

    putOrder(id2, estado)
    .then(resp => {
      console.log(resp)
      alert('Compra Exitosa')
      window.location='/'
    })
  }

  const estado2 = {orderState:'cancelada'}

  function cambioEstado2(){
    putOrder(id2, estado2)
    .then(resp => {
      console.log(resp)
      alert('Pedido Cancelado')
      window.location='/'
    })
  }

  return(
    <div>
      <h1 className={StyleOrden.tuOrden} >Tu Orden</h1>
      {productOrder && productOrder.map(e => {
        return(
          <div className={StyleOrden.producto} >
            <h2>{e.name}</h2>
            <h2>${e.price * e.LineaDeOrden.quantity}</h2>
            <h3> Cantidad:{e.LineaDeOrden.quantity}</h3>
          </div>
          )}
          )
        }
        <div  className={StyleOrden.inputBoton}>
         <h2 >Total: </h2>
         </div>
         <div className={StyleOrden.botonesFinales} >
    <button onClick={cambioEstado} className={StyleOrden.botoncitos} >Realizar Pedido</button>
    <button onClick={cambioEstado2} className={StyleOrden.botoncitos} >Cancelar Pedido</button>
         </div>
    </div>
  )
}

function mapStateToProps(state) {
  const { user } = state.auth.user;
  return {
    user,
  };
}

export default connect(mapStateToProps)(OrdenUsuario);
