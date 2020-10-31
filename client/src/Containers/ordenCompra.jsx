import React from 'react'
import { useState, useEffect } from 'react'
import { getProdOrder } from '../Redux/actionsCarrito'
import { putOrder, getOrder } from '../Redux/actionsOrden'
import StyleOrden from '../Estilos/ordenesUsuario.module.css'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom'
import Estilo from '../Estilos/forms.module.css'



function OrdenCompra({ user, logged, putOrder, order, getOrder }) {
  const [productOrder, setproductOrder] = useState([])
  const [id2, setId2] = useState([])
  console.log('hhhhhhhhhhhhhhhhhh');
  console.log(user, "hola");


  useEffect(() => {
    if (logged) {
      var user2 = user.user.user_id
    } else {
      var user2 = 1
    }
    getOrder()
  }, [])
  var total = 0


  var precio = productOrder.map(e => e.price * e.LineaDeOrden.quantity)

  var total = precio.reduce(function (a, b) {
    return a + b
  }, 0)

  console.log(order);


  function handleChange(e) {
    setId2(e.target.value)
  }


  const estado2 = { orderState: 'cancelada' }

  function cambioEstado2() {
    putOrder(id2, estado2)
    alert('Pedido Cancelado')
  }

  if (logged === false) {
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
        <div>
          <div className={Estilo.forms} > {
            order && order.map(encontrado => {
              return (
                <form key={encontrado.id} className={Estilo.resultado} >
                  <label>Id orden:</label>
                  <input type="text" value={encontrado.id} className={Estilo.inputs} />
                  <label>Estado de Orden:</label>
                  <input type="text" value={encontrado.orderState} className={Estilo.inputs} />
                  {encontrado.orderState === 'creada' ? <a href={`/user/ordenes/${encontrado.id}`}>Ver Orden</a> : <a>-----------</a>}
                </form>
              )
            })
          }
          </div>
          <div className={StyleOrden.botonesFinales} >
            <label>Id orden</label>
            <input type="number" onChange={handleChange} />
            <button onClick={cambioEstado2} className={StyleOrden.botoncitos} >Cancelar Pedido</button>
          </div>
        </div>
      </div>
    )
  }
}




function mapStateToProps(state) {
  const { user, logged } = state.auth
  return {
    user,
    logged,
    order: state.reducer.order
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ putOrder, getOrder }, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdenCompra)

