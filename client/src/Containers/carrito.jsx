
import React, { useState, useEffect, useRef } from 'react';
import { deleteCarrito, getCarritoRequest, putCantidadOrden, deleteCarritoProd, postCarrito } from '../Redux/actionsCarrito';
import Estilo from '../Estilos/ProductoCarrito.module.css';
import ProductoCarrito from '../Components/ProductoCarrito';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearState, CompState, loadState } from '../Redux/reducer/localStorage';
import { NavLink } from 'react-router-dom';


function Carrito({ logged, user, carrito, getCarritoRequest, deleteCarrito }) {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState()
  const [borrado, setBorrado] = useState([])


  useEffect(() => {
    
      if (logged) {
        getCarritoRequest(user.user_id)
      }
      else {
        setProducts(loadState())
  
      }
      
    
    console.log(logged)
  }, [])


  function reload() {
    window.location.reload()
  }

  //------------------------------Funcion Borrar por unidad del carrito



  //---------------------------------Vaciar Carrito

  function vaciar() {

    if (logged) {
      deleteCarrito(user.user_id)
    }
    else {
      localStorage.clear()
    }
    reload();
  }

  //---------------------------------RENDER

    console.log(carrito)
    var orden = carrito && carrito.map(e => {
      return e.LineaDeOrden.order_id
    })
  
  if (carrito.length === 0 && products.length === 0) {
    return (
      <div>
        <h1>Agregar productos al carrito</h1>
        <NavLink to="/products">Ir al Catálogo</NavLink>
      </div>
    )
  }
  else if (logged && carrito.length > 0) {
    const order_id = carrito.map(id => id.order_id)
    console.log("en el render")
    console.log(carrito)
    return (
      <div>
        <div className={Estilo.tusProductos}>
          <h2 >Tus productos</h2>
        </div>
        {carrito && carrito.map(e => {
          return (
            <div>
              <ProductoCarrito
                key={e.id}
                id={e.id}
                name={e.name}
                price={e.LineaDeOrden.price}
                image={e.image}
                quantity={e.LineaDeOrden.quantity}
              />
            </div>
          )
        }
        )
        }
        <div className={Estilo.botonesFinales}>
          <button className={Estilo.botonVaciarCart} onClick={vaciar} >Vaciar Carrito</button>
          <NavLink className={Estilo.botonesFinales} to='/products'>
            <span className={Estilo.botoncitos} >Seguir Comprando</span>
          </NavLink>
          <a className={Estilo.botonesFinales} href={`/order/${orden[0]}`} >
            <span className={Estilo.botoncitos}  >Finalizar Compra</span>
          </a>
        </div>
      </div>
    )
  } else {

    return (
      <div>
        <div className={Estilo.tusProductos}>
          <h2 >Tus productos</h2>
        </div>
        {products && products.map(e => {
          return (
            <div>
              <ProductoCarrito
                key={e.product_id}
                id={e.product_id}
                name={e.name}
                price={e.price}
                image={e.image}
                quantity={e.quantity}
              />
            </div>
          )
        }
        )
        }
        <div className={Estilo.botonesFinales}>
          <button className={Estilo.botonVaciarCart} onClick={vaciar} >Vaciar Carrito</button>
          <a className={Estilo.botonesFinales} href='/products'>
            <span className={Estilo.botoncitos} >Seguir Comprando</span>
          </a>
          {!logged ? <NavLink to="/login" className={Estilo.botoncitos2} >Inicie sesion para finalizar compra</NavLink> : null}
          {/* <a className={Estilo.botonesFinales} href={`/order/${order_id[0]}`} >
              <span className={Estilo.botoncitos}  >Finalizar Compra</span>
            </a> */}
        </div>
      </div>
    )
  }


}

const mapStateToProps = state => {
  const user = state.auth.user;
  const logged = state.auth.logged;
  const carrito = state.reducer.carrito;
  return {
    user,
    logged,
    carrito
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    ...bindActionCreators({ getCarritoRequest, deleteCarrito, deleteCarritoProd, postCarrito }, dispatch)
  }

}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Carrito)
