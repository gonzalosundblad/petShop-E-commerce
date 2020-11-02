import React, { useReducer } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Estilo from '../Estilos/ProductoCarrito.module.css';
import Basura from '../imagenes/basura.png';
import { deleteCarrito, getCarritoRequest, putCantidadOrdenRequest, deleteCarritoProd } from '../Redux/actionsCarrito';
import Contador from './Contador';

function ProductoCarritocard({user, id, image, name, price, LineaDeOrden, funcionDelete, funcionInput, putCantidadOrdenRequest}){
    const [quantity, setQuantity] = useState(LineaDeOrden)

    var total= price * LineaDeOrden;
  console.log(LineaDeOrden)

  function handleChange(e){
   setQuantity(e.target.value)
    
  }

  function funcionInput(e){
    var cambio = {
      product_id: id,
      quantity: quantity
    }
   
    putCantidadOrdenRequest(user.user.user_id, cambio)
    .then(resp => {
      console.log(cambio)
      console.log(resp)
     window.location.reload()
    })
  }

    return(
        <div className={Estilo.todo}>
          <div class="row">
                <div class="col-3">
                    <img width="140px" src={image} alt=""/>
                </div>
                <div class="col-3" style={{display: "flex", flexDirection: "column", alignItems: "end", marginTop: "15px"}}>
                    <h3>{name} </h3>
                    <h2>${price} </h2>
                </div>
                <div class="col-3" style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                    <h6>Cantidad: </h6>
                    {useReducer.logged}
                    <Contador funcion={handleChange}  valor={LineaDeOrden}/>
                    {/* <input type="text" onChange={handleChange} className={Estilo.Cambio} /> */}
                    
                    {/* <input type="number" value={LineaDeOrden} /> */}
                </div>
                <div class= "col-2" style={{display: "flex", alignItems: "center"}}>
          
                    <h3>${total}</h3>
                </div>
                <div class= "col-1" style={{display: "flex", alignItems: "flex-end"}}>
                      <button onClick={() => funcionDelete(id)} value={id} style={{border: "0"}}>
                        <svg width="25px"  viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                        </svg>
                      </button>
                    
                </div>
            </div>
        </div>
        )
}

const mapDispatchToProps =  dispatch => {
  return {
    dispatch,
    ...bindActionCreators({deleteCarritoProd} , dispatch)
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    // carrito: state.reducer.carrito
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductoCarritocard)

// export total;
