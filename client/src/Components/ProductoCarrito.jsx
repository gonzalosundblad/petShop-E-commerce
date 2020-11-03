import React, { useReducer, useRef } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Estilo from '../Estilos/ProductoCarrito.module.css';
import Basura from '../imagenes/basura.png';
import { deleteCarrito, getCarritoRequest, putCantidadOrdenRequest, deleteCarritoProd } from '../Redux/actionsCarrito';
import { saveState } from '../Redux/reducer/localStorage';

function ProductoCarritocard({ user, logged, putCantidadOrdenRequest, id, image, name, price, quantity, deleteCarritoProd, funcionInput }) {
  const [quantit, setQuantit] = useState(quantity)
  const [ total, setTotal ]= useState(quantity * price)

  function handleChange(e) {
    var quantity2 = e.target.value;
    console.log(quantity2)
    if(logged){
      putCantidadOrdenRequest(user.user_id, {
        product_id: id,
        quantity: quantity2
      })    
    }else{
      saveState({ product_id: id, quantity: quantity2, price, image, name })
    }
    console.log(id)
    setQuantit(quantity2);
    setTotal(price * quantit)

  }



  function onDelete() {

    //Hasta aca, capturo el id del producto pero cuando lo envio no me hace el delete.
    // let id = event.target.value
    if (logged) {
      deleteCarritoProd(user.user_id, id)
    } else {
      let clave = localStorage.key(id);
      localStorage.removeItem(clave)
    }
  }



  function reload() {
    window.location.reload()
  }

  console.log(id, "id");

  return (
    <div className={Estilo.producto}>
      {/* <div key={id}> */}
      <div>
        <img className={Estilo.img} src={image} alt="" />
      </div>
      <div>
        <h1>{name} </h1>
        <h2>${price} </h2>
      </div>
      <div className={Estilo.inputBoton}>
        <h3>Cantidad: </h3>
        {useReducer.logged}
        <h4>{quantit} unidades</h4>
        {/* <input type="text" onChange={handleChange} className={Estilo.Cambio} /> */}
        <label>Unidades</label>
        <input type="number" defaultValue={quantit} value={quantit} onChange={handleChange} />
        <h5>Total: ${quantit*price} </h5>

      </div>
      <div className={Estilo.botonBorrar}>


        <   button onClick={onDelete} value={id} >
          <img className={Estilo.basura} value={id} src={Basura} alt="" />
        </button>
      </div>
      {/* </div> */}
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    ...bindActionCreators({ deleteCarritoProd, putCantidadOrdenRequest }, dispatch)
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    logged: state.auth.logged
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductoCarritocard)
