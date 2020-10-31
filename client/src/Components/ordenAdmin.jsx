import React from 'react'
import { useState, useEffect } from 'react'
import { getProdOrder } from '../Redux/actionsCarrito'
import Estilo from '../Estilos/ordenesUsuario.module.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

function OrdenAdmin({ id, user, getProdOrder, order }) {
  const [orderUser, setOrderUser] = useState([])

  const id2 = id.id - 2

  console.log(id2)


  console.log(order, "hola")
  var idUser = user.user.user.user_id

  var ordenes = order

  useEffect(() => {
    getProdOrder(idUser)
  }, [])

  var precio = ordenes.map(e => e.price * e.LineaDeOrden.quantity)

  // console.log(precio)
  var total = precio.reduce(function (a, b) {
    return a + b
  }, 0)


  return (
    <div>
      <div  >
        {ordenes && ordenes.map(encontrado => {
          return (
            <form key={encontrado.id} className={Estilo.producto} >
              <label>Id Producto:</label>
              <input type="text" value={encontrado.id} />
              <label>Estado de Orden:</label>
              <input type="text" value="creada" />
              <label>Producto: </label>
              <input type="text" value={encontrado.name} />
              <label>Cantidad:</label>
              <input type="text" value={encontrado.LineaDeOrden.quantity} />
              <label>Precio por unidad:</label>
              <input type="text" value={encontrado.price} />
              <label>Precio Total:</label>
              <input type="text" value={encontrado.price * encontrado.LineaDeOrden.quantity} />
            </form>
          )
        })
        }
        <div>
          <h2>Total de Orden: {total} </h2>
        </div>
      </div>
    </div>
  )
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
    ...bindActionCreators({ getProdOrder }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdenAdmin);