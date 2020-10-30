
import React, { useState, useEffect, useRef } from 'react';
import { deleteCarrito, getCarritoRequest, putCantidadOrden, deleteCarritoProd } from '../Redux/actionsCarrito';
import Estilo from '../Estilos/ProductoCarrito.module.css';
import ProductoCarrito from '../Components/ProductoCarrito';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadState } from '../Redux/reducer/localStorage';
import { NavLink } from 'react-router-dom';

function Carrito({ logged, user, carrito, getCarritoRequest, deleteCarrito, deleteCarritoProd }) {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState()
  const [borrado, setBorrado] = useState([])

  // console.log(carrito[0], "chau")
  // console.log(user.user.user_id, "chawqadwu")

  useEffect(() => {
    // si el usuario esta logueado
    if (logged) {
      getCarritoRequest(user.user.user_id)
    }
    else {
      setProducts(loadState())

    }
  }, [])


  function reload() {
    window.location.reload()
  }

  //------------------------------Funcion Borrar por unidad del carrito

  function onDelete(product_id) {
    console.log(product_id)
    var valor = {
      product_id: product_id
    }

    //Hasta aca, capturo el id del producto pero cuando lo envio no me hace el delete.
    // let id = event.target.value
    if (logged) {
      deleteCarritoProd(user.user.user_id, valor)
    } else {
      localStorage.removeItem(product_id)
    }
  }

  //---------------------------------Vaciar Carrito

  function vaciar() {

    if (logged) {
      deleteCarrito(user.user.user_id)
    }
    else {
      localStorage.clear()
    }
  }

  //---------------------------------RENDER


  var orden = carrito.map(e => {
    return e.LineaDeOrden.order_id
  })
  console.log(orden, "djkwah")

  if (carrito.length === 0 && products.length === 0) {
    return (
      <div>
        <h1>Agregar productos al carrito</h1>
        <NavLink to="/products">Ir al Catálogo</NavLink>
      </div>
    )
  }
  else if (logged && carrito.length > 0) {

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
                price={e.price}
                image={e.image}
                LineaDeOrden={e.LineaDeOrden.quantity}
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
                key={e.id}
                id={e.id}
                name={e.name}
                price={e.price}
                image={e.image}
                LineaDeOrden={e.quantity}
              // funcionDelete={onDelete}
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
          {/* <a className={Estilo.botonesFinales} href={`/order/${order_id[0]}`} >
              <span className={Estilo.botoncitos}  >Finalizar Compra</span>
            </a> */}
        </div>
      </div>
    )
  }


}
const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    ...bindActionCreators({ getCarritoRequest, deleteCarrito, deleteCarritoProd }, dispatch)
  }
}

const mapStateToProps = state => {
  const { user, logged } = state.auth
  return {
    user,
    logged,
    carrito: state.reducer.carrito
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Carrito)
