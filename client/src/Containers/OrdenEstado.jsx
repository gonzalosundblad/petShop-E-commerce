import React from 'react'
import { useEffect } from 'react'
import { getOrder } from '../Redux/actionsOrden'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';


function OrdenState({ orderStates, order, getOrder }) {
  useEffect(() => {
    getOrder()
  }, [])

  console.log(orderStates)

  return (
    <div>
      Hola
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
