
import React, { useState, useEffect, useRef } from 'react';
import { deleteCarrito, getCarritoRequest, putCantidadOrden, deleteCarritoProd,postCarrito } from '../Redux/actionsCarrito';
import Estilo from '../Estilos/ProductoCarrito.module.css';
import ProductoCarrito from '../Components/ProductoCarrito';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearState, CompState, loadState } from '../Redux/reducer/localStorage';
import { NavLink } from 'react-router-dom';


function Carrito({ logged, user, carrito, getCarritoRequest, deleteCarrito, deleteCarritoProd, postCarrito }) {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState()
  const [borrado, setBorrado] = useState([])


  useEffect(() => {

    if (logged) {
      var local = loadState()
  if (local.length > 0) {
      local.map(prod => {
      const { product_id, quantity, price } = prod
      console.log(prod)
      postCarrito(user.user_id, {
        product_id,
        quantity,
        price
      })
    })

  }
  setTimeout(() => {
    getCarritoRequest(user.user.user_id)
    clearState()

  }, 500);


      // changeCartProducts()
    //   var local = (loadState())
    //   console.log(local)
    //   if (local.length > 0){
    //     console.log(carrito)
    //     var nuevoarray = carrito.map((carr => {
    //       let i = carr.product_id
    //       console.log(i)
    //       if (i === localStorage.key(i)){
    //         console.log("hola")
    //         return localStorage.getItem(i)
    //       }
    //     }))
    //     console.log(nuevoarray)
    //   }

    }
    else {
      setProducts(loadState())

    }
  }, [])


  function reload() {
    window.location.reload()
  }

  //------------------------------Funcion Borrar por unidad del carrito

  // function onDelete(product_id) {
  //   var valor = {
  //     product_id: product_id
  //   }

  //   //Hasta aca, capturo el id del producto pero cuando lo envio no me hace el delete.
  //   // let id = event.target.value
  //   if (logged) {
  //     deleteCarritoProd(user.user.user_id, valor)
  //   } else {
  //     localStorage.removeItem(product_id)
  //   }
  //   reload
  // }




  //---------------------------------Vaciar Carrito

  function vaciar() {

    if (logged) {
      deleteCarrito(user.user.user_id)
    }
    else {
      localStorage.clear()
    }
    reload();
  }

  //---------------------------------RENDER


  var orden = carrito.map(e => {
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
    console.log(carrito)
    const order_id = carrito.map(id => id.order_id)
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
                key={e.id}
                id={e.id}
                name={e.name}
                price={e.price}
                image={e.image}
                quantity={e.LineaDeOrden.quantity}
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
      ...bindActionCreators({ getCarritoRequest, deleteCarrito, deleteCarritoProd, postCarrito }, dispatch)
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
