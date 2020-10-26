import React from 'react'
import { useState, useEffect } from 'react'
import { getProdOrder } from '../Redux/actionsCarrito'
import { putOrder } from '../Redux/actionsOrden'
import StyleOrden from '../Estilos/ordenesUsuario.module.css'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';


function OrdenUsuario(props) {
  const [productOrder, setproductOrder] = useState([])
  console.log('hhhhhhhhhhhhhhhhhh');
  console.log(props);
  const id = 3
  useEffect(() => {
    if (props.user === null) {
      var user = 1
    } else {
      user = props.user.user_id
    }
    getProdOrder(user).payload
      .then(res => {
        if (!res.data[0]) {
          alert('No hay Ordenes')
        } else {
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




  const estado = { orderState: 'creada' }

  function cambioEstado() {

    putOrder(props.id, estado)
      .then(resp => {
        console.log(resp)
        alert('Compra Exitosa')
        window.location = '/'
      })
  }

  const estado2 = { orderState: 'cancelada' }

  function cambioEstado2() {
    putOrder(props.id, estado2)
      .then(resp => {
        console.log(resp)
        alert('Pedido Cancelado')
        window.location = '/'
      })
  }

  if (props.user === null) {
    return (
      <div>
        <h1>Iniciar Sesión o Registrarse para continuar</h1>
        <a href="/login">Iniciar sesión</a>
        <a href="/register">Registrarme</a>
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
  const { user } = state.auth;
  return {
    user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ OrdenUsuario }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdenUsuario);
