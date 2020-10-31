import React from 'react'
import { useState, useEffect } from 'react'
import { getProdOrder } from '../Redux/actionsCarrito'
import { putOrder } from '../Redux/actionsOrden'
import StyleOrden from '../Estilos/ordenesUsuario.module.css'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom'


function OrdenCompra({ id, user, putOrder, order, getProdOrder }) {
  const [productOrder, setproductOrder] = useState([])
  console.log('hhhhhhhhhhhhhhhhhh');
  console.log(user, "hola");


  useEffect(() => {
    if (user === null) {
      var user2 = 1
    } else {
      var user2 = user.user.user.user_id
    }
    getProdOrder(user2)
  }, [])
  var total = 0


  var precio = productOrder.map(e => e.price * e.LineaDeOrden.quantity)

  var total = precio.reduce(function (a, b) {
    return a + b
  }, 0)

  console.log(productOrder);




  const estado2 = { orderState: 'cancelada' }

  function cambioEstado2() {
    putOrder(id, estado2)
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
        {productOrder && productOrder.map(e => {
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
          <h2 >Total: {total} </h2>
        </div>
        <div className={StyleOrden.botonesFinales} >
          <button onClick={cambioEstado2} className={StyleOrden.botoncitos} >Cancelar Pedido</button>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    user: state.auth,
    order: state.reducer.order
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ putOrder, getProdOrder }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdenCompra);
