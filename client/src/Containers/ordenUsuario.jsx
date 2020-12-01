import React from 'react'
import { useState, useEffect } from 'react'
import { getProdOrder, getCarritoRequest } from '../Redux/actionsCarrito'
import { putOrder, getOrderId } from '../Redux/actionsOrden'
import StyleOrden from '../Estilos/ordenesUsuario.module.css'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';


function OrdenUsuario({ id2, user, order, carrito, putOrder, getCarritoRequest }) {
  const [productOrder, setproductOrder] = useState([])

  useEffect(() => {
    getCarritoRequest(user.user_id)
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
        <div style={{display: "flex", alignItems:"center", margin: "7%"}}>
          <svg width="30px" viewBox="0 0 16 16" class="bi bi-file-earmark-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 0h5.5v1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h1V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"/>
            <path d="M9.5 3V0L14 4.5h-3A1.5 1.5 0 0 1 9.5 3z"/>
            <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
          </svg>
          <h3>Tu Orden</h3>
        </div>
        {carrito && carrito.map(e => {
          return (
            <div className={StyleOrden.todo}>
              <div class="row" >
                <h2 class="col-4">{e.name}</h2>
                <h2 class="col-4">${e.price * e.LineaDeOrden.quantity}</h2>
                <h3 class="col-4"> Cantidad:{e.LineaDeOrden.quantity}</h3>
              </div>
            </div>
          )
        }
        )
        }
        <div className={StyleOrden.inputBoton}>
          <h2 >Total: </h2>
        </div>
        <div className={StyleOrden.botonesFinales} >
          <NavLink to='/cancel' onClick={cambioEstado2} className={StyleOrden.botoncitos} >Cancelar Pedido</NavLink>
          <NavLink to='/checkout' onClick={cambioEstado} className={StyleOrden.botoncitos} >Realizar Pedido</NavLink>
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
    ...bindActionCreators({ putOrder, getCarritoRequest }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdenUsuario);
