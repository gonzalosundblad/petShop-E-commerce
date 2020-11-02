import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Estilo from '../Estilos/forms.module.css'
import { getOrder } from '../Redux/actionsOrden'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom'


function OrdenState({ orderStates, order, getOrder }) {
  useEffect(() => {
    getOrder()
  }, [])

  var state = order.filter(o => o.orderState === orderStates)

  return (
    <div>
      <div>
        {state && state.map(o => {
          return (
            <div>
              <form key={o.id} className={Estilo.resultado} >
                <label>Id orden:</label>
                <input type="text" value={o.id} className={Estilo.inputs} />
                <label>Estado de Orden:</label>
                <input type="text" value={o.orderState} className={Estilo.inputs} />
                <label>Id usuario:</label>
                <input type="text" value={o.userId} className={Estilo.inputs} />
                {o.orderState === 'creada' ? <a href={`/admin/ordenes/${o.id}`}>Ver Orden</a> : <a>-----------</a>}
              </form>
            </div>
          )
        })}
      </div>
    </div>
  )

}

const mapStateToProps = state => {
  return {
    order: state.reducer.order
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ getOrder }, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdenState)
