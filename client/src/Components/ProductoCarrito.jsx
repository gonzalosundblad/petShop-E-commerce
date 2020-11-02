import React, { useReducer, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Estilo from '../Estilos/ProductoCarrito.module.css';
import Basura from '../imagenes/basura.png';
import { deleteCarrito, getCarritoRequest, putCantidadOrdenRequest, deleteCarritoProd } from '../Redux/actionsCarrito';

function ProductoCarritocard({user, logged, putCantidadOrdenRequest, id, image, name, price, quantity, deleteCarritoProd, funcionInput}){
    console.log(price + " + " + quantity)
    var total= price * quantity;

  function handleChange(e){
    var quantity =  e.target.value
    putCantidadOrdenRequest(user.user.user_id, {
      product_id: id,
      quantity: quantity
    })
    .then(resp => {
      console.log(resp)
     
    })
  }


  function onDelete() {
    
    //Hasta aca, capturo el id del producto pero cuando lo envio no me hace el delete.
    // let id = event.target.value
    if (logged) {
      deleteCarritoProd(user.user.user_id,id)
    } else {
      let clave = localStorage.key(id);
      localStorage.removeItem(clave)
    }
    reload()
  }


    

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
                    <h4>{quantity} unidades</h4>    
                    <input type="text" onChange={handleChange} className={Estilo.Cambio}  />
                    <label>Unidades</label>
                    <h5>Total: ${total} </h5>
                    <input type="number" defaultValue={quantity}  />

                </div>
                <div className={Estilo.botonBorrar}>
                    

                    <   button onClick={onDelete} value={id} >
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
    ...bindActionCreators({deleteCarritoProd, putCantidadOrdenRequest} , dispatch)
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    logged: state.auth.logged
    // carrito: state.reducer.carrito
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductoCarritocard)

// export total;
