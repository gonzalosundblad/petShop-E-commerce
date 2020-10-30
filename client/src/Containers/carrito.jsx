
import React, { useState, useEffect, useRef } from 'react';
import { deleteCarrito, getCarrito, putCantidadOrden, deleteCarritoUno } from '../Redux/actionsCarrito';
import Estilo from '../Estilos/ProductoCarrito.module.css';
import ProductoCarrito from '../Components/ProductoCarrito';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';



function Carrito({ user, getCarrito }) {
  const [products, setProducts] = useState([])
  const [state, setState] = useState()
  const [borrado, setBorrado] = useState([])

  console.log(user)

  useEffect(() => {
    if (user.logged) {
      getCarrito(user.user.user_id)
    }
    if (user.logged === false) {
      getCarrito(2)
    }
  }, [])


  function reload() {
    window.location.reload()
  }

  function vaciar() {
    if (user.logged) {
      deleteCarrito(user.user.user_id).then(resp => {
        reload()
      })
    }
    if (user.logged === false) {
      deleteCarrito(2).then(resp => {
        reload()
      })
    }
  }
  // function onDelete() {
  //   // console.log(e)
  //   // const f = (element) => element.id == e.target.value
  //   // let index =  products.findIndex(f)
  //   // // setBorrado(products.splice(index, 1))
  //   // var borrado = products.splice(index, 1)

  //   var product_id = 2

  //   //Hasta aca, capturo el id del producto pero cuando lo envio no me hace el delete.
  //   deleteCarritoUno(2, product_id)
  //     .then(resp => {
  //       console.log(resp)
  //     })
  // }


  const order_id = products.map(id => id.LineaDeOrden.order_id)

  console.log(order_id);


  if (!products || products.length === 0) {
    return (
      <div>
        <h1>Agregar productos al carrito</h1>
        <NavLink to="/products">Ir al Catálogo</NavLink>
      </div>
    )
  } else {
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
          <NavLink className={Estilo.botonesFinales} to={`/order/${order_id[0]}`} >
            <span className={Estilo.botoncitos}  >Finalizar Compra</span>
          </NavLink>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    user: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ getCarrito }, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Carrito)
