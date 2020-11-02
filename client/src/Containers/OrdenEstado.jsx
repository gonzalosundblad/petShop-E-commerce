import React from 'react'
import { useEffect } from 'react'
import { getOrder } from '../Redux/actionsOrden'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';


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
              <form key={o.id} >
                <label>Id orden:</label>
                <input type="text" value={o.id} />
                <label>Estado de Orden:</label>
                <input type="text" value={o.orderState} />
                <label>Id usuario:</label>
                <input type="text" value={o.userId}  />
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
