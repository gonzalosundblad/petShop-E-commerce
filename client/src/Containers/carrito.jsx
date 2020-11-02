
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

  // function changeCartProducts(){
  //   var local = loadState()
  //   console.log("hoooooooooooooooooooola")
    
  //   pr.map(prod => {
  //     console.log(prod)
  //     postCarrito(user.user.user_id, {
  //       product_id: prod.prod_id,
  //       quantity: prod.quantity,
  //       price: prod.quantity
  //     })
  //   })
  //   .then(clearState())
       
  // } 

  useEffect(() => {
    // si el usuario esta logueado
    
    if (logged) {
      var local = loadState()
  //   console.log("hoooooooooo")
  if (local.length > 0) {
      local.map(prod => {
      const { product_id, quantity, price } = prod
      console.log(prod)
      postCarrito(user.user.user_id, {
        product_id,
        quantity,
        price 
      })
    })
    
    clearState()
  }
  getCarritoRequest(user.user.user_id)
  

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

  function onDelete(product_id) {
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
    console.log(carrito)
    const order_id = carrito.map(id => id.LineaDeOrden.order_id)
    console.log('hay productos')

    return (
      <div>
        
        <div style={{display: "flex", marginLeft: "7%"}}>
        <svg width="30px"  viewBox="0 0 16 16" class="bi bi-cart-check-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM4 14a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm7 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm.354-7.646a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
        </svg>
          <h3 style={{margin: "10px"}}>Mi carrito</h3>
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
          <button type="button" class="btn btn-outline-danger" onClick={vaciar} style={{margin: "10px"}}>Vaciar Carrito</button>
          <NavLink className={Estilo.botonesFinales} to='/products'>
            <button type="button" class="btn btn-outline-warning" style={{margin: "10px"}}>Seguir Comprando</button>
          </NavLink>
          <a className={Estilo.botonesFinales} to={`/order/${orden[0]}`} >
            <button type="button" class="btn btn-outline-success" style={{margin: "10px"}}>Finalizar Compra</button>
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
