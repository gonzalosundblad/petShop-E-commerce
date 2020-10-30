import React, { useState, useEffect } from 'react';
import Style from '../Estilos/Product.module.css';
import { getProductById } from '../Redux/actions.js'
import Carrito from '../Containers/carrito';
import { postCarrito } from '../Redux/actionsCarrito';
import Changuito from '../imagenes/carrito+.png'
import Reviews from './reviews.jsx'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Contador from './Contador';


function Product({ user, id2, products, getProductById }) {

  const [quantity, setQuantity] = useState();

  useEffect(() => {
    getProductById(id2)
  }, []);

  console.log(products.products.name, "hola")

  function handleChange(e) {
    setQuantity(e.target.value);
  }
  function subirCarrito() {
    if (user.isLoggedIn) {
      postCarrito(user.user.user.user_id, {
        product_id: id2,
        quantity: quantity,
        price: products.products.price
      }).payload
        .then(function (resp) {
          console.log(resp.data)
          window.location.replace("http://localhost:3000/carrito")
        })
    }
    if (user.isLoggedIn === false) {
      postCarrito(2, {
        product_id: id2,
        quantity: quantity,
        price: products.products.price
      }).payload
        .then(function (resp) {
          console.log(resp.data)
          window.location.replace("http://localhost:3000/carrito")
        })
    }
  }

  if (products.products.stock <= 0) {
    return (
      <div >
        <div className={Style.contenedor}>
          <div className={Style.imagen}>
            <img src={products.products.image} width= "450px" height= "450px" alt="" />
          </div>
          <div className={Style.divDerecha}>
            <div className={Style.nombreYprecio}>
              <h1>{products.products.name}</h1>
              <h2>${products.products.price}</h2>
            </div>
            <hr/>
            <div>
              <h3 class="text-gray">No hay Stock</h3>
            </div>
          </div>
        </div>
        <div className= {Style.description}>
          <ul class="nav nav-tabs" style={{display: "flex", justifyContent: "end", width: "100%"}}>
            <li>
              <a class="nav-link active" data-toggle="tab"><h5>Descripcion</h5></a>
            </li> 
          </ul>
          <h5 style={{marginTop: "10px"}}>{products.products.description}</h5>
          <hr />
        </div>
        <div>
          <Reviews id={id2} />
        </div>
      </div>
    )
  } else {

    return (
      <div >
        <div className={Style.contenedor}>
          <div className={Style.imagen}>
            <img src={products.products.image} width= "450px" height= "450px" alt="" />
          </div>
          <div className={Style.divDerecha}>
            <div className={Style.nombreYprecio}>
              <h1>{products.products.name}</h1>
              <h2>${products.products.price}</h2>
            </div>
            <hr/>
            <div>
              <div style={{display: "flex", flexDirection: "column", marginTop: "40px"}}>
                <h6 style={{display: "flex", justifyContent: "end"}}>Seleccione Cantidad:</h6>
                <Contador funcion={handleChange}/>
                {/* <input classname={Style.input} type="number" min='0' max={products.products.stock} placeholder='Nº' onChange={handleChange} /> */}
                <button class="btn btn-success" onClick={subirCarrito} style={{width: "150px", marginTop: "10px"}}>
                  Agregar
                  <img className={Style.changuito} src={Changuito} />
                </button>
              </div>
              <div style={{display: "flex", justifyContent: "end", marginTop: "10px"}}>
                <h6 style={{fontSize: "12px"}}>Stock diponible: {products.products.stock} unidades</h6>
                {/* <p>{products.products.stock} unidades</p> */}
              </div>
            </div>
          </div>
        </div>
        <div className= {Style.description}>
          <ul class="nav nav-tabs" style={{display: "flex", justifyContent: "end", width: "100%"}}>
            <li>
              <a class="nav-link active" data-toggle="tab"><h5>Descripcion</h5></a>
            </li> 
          </ul>
          <h5 style={{marginTop: "10px"}}>{products.products.description}</h5>
          <hr />
        </div>
        <div>
          <Reviews id={id2} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth,
    products: state.reducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ getProductById }, dispatch)
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product)