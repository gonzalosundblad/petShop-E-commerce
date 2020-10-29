
import React, { useState, useEffect, useRef } from 'react';
import { deleteCarrito, getCarrito, putCantidadOrden, deleteCarritoUno } from '../Redux/actionsCarrito';
import Estilo from '../Estilos/ProductoCarrito.module.css';
import ProductoCarrito from '../Components/ProductoCarrito';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadState } from '../Redux/reducer/localStorage';
import { NavLink } from 'react-router-dom';

function Carrito({user, carrito, getCarrito, deleteCarrito, deleteCarritoUno}) {
  const [products, setProducts] = useState([])
  const [state, setState] = useState()
  const [borrado, setBorrado] = useState([])

  console.log(user, "hola")

  useEffect(() => {
      // si el usuario esta logueado
      console.log(user.logged)
    if (user.logged) {
      getCarrito(user.user.user_id).payload
        .then(res => {
          if (!res.data[0]) {
            console.log("agregar")
          }
          else {
            setProducts(res.data[0].products)
          }
        })
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
      .then (resp => console.log(resp))
      
    } 
    else{
      localStorage.clear()
      
    }
    reload()
  }
  function onDelete(id) {
    // console.log(e)
    // const f = (element) => element.id == e.target.value
    // let index =  products.findIndex(f)
    // // setBorrado(products.splice(index, 1))
    // var borrado = products.splice(index, 1)


    //Hasta aca, capturo el id del producto pero cuando lo envio no me hace el delete.
    if (user.logged) {
      console.log(user.user.id)
      deleteCarritoUno(user.user.user_id, id)
        .then(resp => {
          console.log(resp)
        })
     } else {
      console.log(id)
      localStorage.removeItem(id)
    }
    reload()
  }


  if (!products || products.length === 0) {
    return (
      <div>
        <h1>Agregar productos al carrito</h1>
        <NavLink to="/products">Ir al Catálogo</NavLink>
      </div>
    )
  } else if(user.logged){
    const order_id = products.map(id => id.LineaDeOrden.order_id)
    console.log('hay productos')

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
            <NavLink className={Estilo.botonesFinales} href={`/order/${order_id[0]}`} >
              <span className={Estilo.botoncitos}  >Finalizar Compra</span>
            </NavLink>
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
              funcionDelete={onDelete}
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
    ...bindActionCreators({getCarrito, deleteCarrito,deleteCarritoUno} , dispatch)
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    carrito: state.reducer
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Carrito)