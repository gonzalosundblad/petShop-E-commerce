import React from 'react'
import { useState, useEffect } from 'react'
import { getProdOrder } from '../Redux/actionsCarrito'
import { putOrder, getOrder } from '../Redux/actionsOrden'
import StyleOrden from '../Estilos/ordenesUsuario.module.css'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom'
import Estilo from '../Estilos/forms.module.css'


function OrdenCreada({ id, user, order, getProdOrder }) {

  var id2 = id - 1
  console.log(order, "chau")

  var idUser = user.user.user_id

  var ordenes = order

  useEffect(() => {
    getProdOrder(idUser, id2)
  }, [])

  var precio = ordenes.map(e => e.price * e.LineaDeOrden.quantity)

  // console.log(precio)
  var total = precio.reduce(function (a, b) {
    return a + b
  }, 0)

  var ordenId = ordenes.map(o => o.id)




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
    ...bindActionCreators({ putOrder, getProdOrder, getOrder }, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdenCreada)