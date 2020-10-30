import React, { useReducer } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Estilo from '../Estilos/ProductoCarrito.module.css';
import Basura from '../imagenes/basura.png';
import { deleteCarrito, getCarritoRequest, putCantidadOrden, deleteCarritoProd } from '../Redux/actionsCarrito';

function ProductoCarritocard({user, id, image, name, price, LineaDeOrden, funcionDelete, funcionInput}){
    
    var total= price * LineaDeOrden;

  function handleChange(e){
    var quantity =  e.target.value
  }
    // var cambio = {
    //   product_id: id,
    //   quantity: quantity
    // }

    // putCantidadOrden(2, cambio)
    // .then(resp => {
    //   console.log(cambio)
    //   console.log(resp)
    //  reload()
    // })

    

function reload(){
  window.location.reload()
}


    return(
        <div className={Estilo.producto}>
            {/* <div key={id}> */}
                <div>
                    <img className={Estilo.img} src={image} alt=""/>
                </div>
                <div>
                    <h1>{name} </h1>
                    <h2>${price} </h2>
                </div>
                <div className={Estilo.inputBoton}>
                    <h3>Cantidad: </h3>
                    {useReducer.logged}
                    <h4>{LineaDeOrden} unidades</h4>
                    <input type="text" onChange={handleChange} className={Estilo.Cambio} />
                    <label>Unidades</label>
                    <h5>Total: ${total} </h5>
                    {/* <input type="number" value={LineaDeOrden} onChange={funcionInput} /> */}

                </div>
                <div className={Estilo.botonBorrar}>
                    

                    <   button onClick={() => funcionDelete(id)} value={id} >
                        <img className={Estilo.basura} src={Basura} alt=""/>
                    </button>
                </div>
            {/* </div> */}
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
