
import React, { useState, useEffect, useRef } from 'react';
import { deleteCarrito, getCarrito, putCantidadOrden, deleteCarritoUno } from '../Redux/actionsCarrito';
import Estilo from '../Estilos/ProductoCarrito.module.css';
import ProductoCarrito from '../Components/ProductoCarrito';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function Carrito(user) {
  const [products, setProducts] = useState([])
  const [state, setState] = useState()
  const [borrado, setBorrado] = useState([])


  useEffect(() => {
      // si el usuario esta logueado
    if (user.user.logged) {
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
      const request = [];
      for(var i = 0; i < localStorage.length; i++){
        let clave = localStorage.key(i);
        console.log(clave);
        if(typeof(JSON.parse(localStorage.getItem(clave))) !== "string"){
          let prod = JSON.parse(localStorage.getItem(clave));
              if(typeof(parseInt(clave)) === "number" ){
                  request.push(prod)
              }     
              console.log(request);
        }
      }
      setProducts(request)
    }
  }, [])


  function reload() {
    window.location.reload()
  }

  function vaciar() {
    if (user.user.isLoggedIn) {
      deleteCarrito(user.useruser_id).then(resp => {
        
      })
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
    if (user.user.logged) {
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
        <a href="/products">Ir al Catálogo</a>
      </div>
    )
  } else if(user.user.isLoggedIn){
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
                id={e.id}
                name={e.name}
                price={e.price}
                image={e.image}
                LineaDeOrden={e.LineaDeOrden.quantity}
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
    ...bindActionCreators({getCarrito, deleteCarrito}, dispatch)
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth,
    
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Carrito)