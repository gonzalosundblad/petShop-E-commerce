import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Estilo from '../Estilos/forms.module.css'
import { getOrder } from '../Redux/actionsOrden'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

function Ordenes({ getOrder, order }) {


  useEffect(() => {
    getOrder()
  }, [])




  // return (
  //   <div>
  //     <div className={Estilo.forms} > {
  //       order && order.map(encontrado => {
  //         return (
  //           <form key={encontrado.id} className={Estilo.resultado} >
  //             <label>Id orden:</label>
  //             <input type="text" value={encontrado.id} className={Estilo.inputs} />
  //             <label>Estado de Orden:</label>
  //             <input type="text" value={encontrado.orderState} className={Estilo.inputs} />
  //             <label>Id usuario:</label>
  //             <input type="text" value={encontrado.userId} className={Estilo.inputs} />
  //             {encontrado.orderState === 'creada' ? <a href={`/admin/ordenes/${encontrado.id}`}>Ver Orden</a> : <a>-----------</a>}
  //           </form>
  //         )
  //       })
  //     }
  //     </div>
  //   </div>
  // )
  return (
    <div>
      <div className={Estilo.forms} >
        {order && order.filter(e => order.orderState)}
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
)(Ordenes)
