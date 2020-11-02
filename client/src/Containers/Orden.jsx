import React from 'react';
import { useEffect } from 'react';
import Estilo from '../Estilos/forms.module.css';
import { getOrder } from '../Redux/actionsOrden';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom'


function Ordenes({ getOrder, order }) {


  useEffect(() => {
    getOrder()
  }, [])

  console.log(order, "holuis")


  return (
    <div>
      <div class='bg-success'>
        <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
          <button type="button" class="btn btn-success"><h6 class='text-white'>Todas las Ordenes</h6></button>
          <div class="btn-group" role="group">
            <button id="btnGroupDrop2" type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
            <div class="dropdown-menu" aria-labelledby="btnGroupDrop2" >
              {
                order.map(n => {
                  if (n.orderState !== 'Sin Ordenes') {
                    return (
                      <NavLink class="dropdown-item" height='30px' to={`/admin/ordenes/${n.orderState}`}>{n.orderState}</NavLink>)
                  }
                })
              }
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className={Estilo.forms} > {
          order && order.map(encontrado => {
            return (
              <form key={encontrado.id} className={Estilo.resultado} >
                <label>Id orden:</label>
                <input type="text" value={encontrado.id} className={Estilo.inputs} />
                <label>Estado de Orden:</label>
                <input type="text" value={encontrado.orderState} className={Estilo.inputs} />
                <label>Id usuario:</label>
                <input type="text" value={encontrado.userId} className={Estilo.inputs} />
                {encontrado.orderState === 'creada' ? <a href={`/admin/ordenes/${encontrado.id}`}>Ver Orden</a> : <a>-----------</a>}
              </form>
            )
          })
        }
        </div>
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
