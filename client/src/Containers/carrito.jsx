
import React, { useState, useEffect, useRef } from 'react';
import { deleteCarrito, getCarritoRequest, putCantidadOrden, deleteCarritoProd } from '../Redux/actionsCarrito';
import Estilo from '../Estilos/ProductoCarrito.module.css';
import ProductoCarrito from '../Components/ProductoCarrito';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadState } from '../Redux/reducer/localStorage';
import { NavLink } from 'react-router-dom';

function Carrito({user, carrito, getCarritoRequest, deleteCarrito, deleteCarritoProd}) {
  const [products, setProducts] = useState([])
  const [state, setState] = useState()
  const [borrado, setBorrado] = useState([])


  useEffect(() => {
      // si el usuario esta logueado
      console.log(carrito)
    if (user.logged) {
      getCarritoRequest(user.user.user_id)
    }
    else{
    
      setProducts(loadState())
    }
  }, [])


  function reload() {
    window.location.reload()
  }

  function vaciar() {
    // Todavia no anda
    if (user.logged) {
      deleteCarrito(user.user.user_id)
      
    } 
    else{
      localStorage.clear()
      
    }
    reload()
  }
  


  if (!carrito || carrito.length === 0) {
    return (
      <div>
        <h1>Agregar productos al carrito</h1>
        <a href="/products">Ir al Catálogo</a>
      </div>
    )
  } else if(user.logged){
    const order_id = carrito.map(id => id.LineaDeOrden.order_id)
    console.log('hay productos')

    return (
      <div>
        <div className={Estilo.tusProductos}>
          <h2 >Tus productos</h2>
        </div>
        {carrito && carrito.map(e => {
          return (
            <div>
              <ProductoCarrito
                key = {e.id}
                id={e.id}
                name={e.name}
                price={e.price}
                image={e.image}
                LineaDeOrden={e.LineaDeOrden.quantity}
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
            <a className={Estilo.botonesFinales} href={`/order/${order_id[0]}`} >
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
              key = {e.id}
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
const mapDispatchToProps =  dispatch => {
  return {
    dispatch,
    ...bindActionCreators({getCarritoRequest, deleteCarrito, deleteCarritoProd} , dispatch)
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    carrito: state.reducer.carrito
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Carrito)