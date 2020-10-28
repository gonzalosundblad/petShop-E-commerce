import React from 'react'
import { useState, useEffect } from 'react'
import { getProdOrder, getCarro } from '../Redux/actionsCarrito'
import { putOrder, getOrderId } from '../Redux/actionsOrden'
import StyleOrden from '../Estilos/ordenesUsuario.module.css'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom'


function OrdenUsuario({ id2, user, order, carrito, putOrder, getCarro }) {
  const [productOrder, setproductOrder] = useState([])
  console.log('hhhhhhhhhhhhhhhhhh');
  // console.log(user.user.user_id);
  // console.log(id2);


  useEffect(() => {
    getCarro(user.user.user_id)
  }, [])

  // var total = 0


  // var precio = productOrder.map(e => e.price * e.LineaDeOrden.quantity)

  // var total = precio.reduce(function(a, b){
  //   return a + b
  // }, 0)

  // const orders = order[0]

  console.log(carrito, "hola");


  const estado = { orderState: 'creada' }

  function cambioEstado() {
    putOrder(id2, estado)
  }

  const estado2 = { orderState: 'cancelada' }

  function cambioEstado2() {
    putOrder(id2, estado2)
    alert('Pedido Cancelado')
  }

  if (user.user === null) {
    return (
      <div>
        <h1>Iniciar Sesión o Registrarse para continuar</h1>
        <NavLink href="/login">Iniciar sesión</NavLink>
        <NavLink href="/register">Registrarme</NavLink>
      </div>
    )
  } else {
    return (
      <div>
        <h1 className={StyleOrden.tuOrden} >Tu Orden</h1>
        {carrito && carrito.map(e => {
          return (
            <div className={StyleOrden.producto} >
              <h2>{e.name}</h2>
              <h2>${e.price * e.LineaDeOrden.quantity}</h2>
              <h3> Cantidad:{e.LineaDeOrden.quantity}</h3>
            </div>
          )
        }
        )
        }
        <div className={StyleOrden.inputBoton}>
          <h2 >Total: </h2>
        </div>
        <div className={StyleOrden.botonesFinales} >
          <button onClick={cambioEstado} className={StyleOrden.botoncitos} >Realizar Pedido</button>
          <button onClick={cambioEstado2} className={StyleOrden.botoncitos} >Cancelar Pedido</button>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {

  return {
    user: state.auth.user,
    carrito: state.reducer.carrito
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ putOrder, getCarro }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdenUsuario);