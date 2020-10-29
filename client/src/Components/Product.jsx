import React, { useState, useEffect } from 'react';
import Style from '../Estilos/Product.module.css';
import { getProductById } from '../Redux/actions.js'
import Carrito from '../Containers/carrito';
import { postCarrito } from '../Redux/actionsCarrito';
import Changuito from '../imagenes/carrito+.png'
import Reviews from './reviews.jsx'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';



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
    const {image, name, price} = products.products
    if (user.logged) {
      postCarrito(user.user.user.user_id, {
        product_id: id2,
        quantity: quantity,
        price,
        image
      }).payload
        .then(function (resp) {
          console.log(resp.data)
          window.location.replace("http://localhost:3000/products")
        })
    }
    else {
        
        localStorage.setItem(id2, JSON.stringify({product_id: id2, quantity, price, image, name, }))
          window.location.replace("http://localhost:3000/products")
        }
    
  }

  if (products.products.stock <= 0) {
    return (
      <div className={Style.product}>
        <div className={Style.contenedor}>
          <img className={Style.img} src={products.products.image} alt="" />
          <div className={Style.imgNameCart}>
            <div className={Style.containerLyrics}>
              <h1>{products.products.name}</h1>
              <h2>${products.products.price}</h2>
            </div>
            <div className={Style.cantidadStock}>
              <div className={Style.stock}>
                <h6>No hay Stock</h6>
              </div>
            </div>
          </div>
        </div>
        <div className={Style.description}>
          <h3>Descripción:</h3>
          <hr />
          <h4>{products.products.description}</h4>
        </div>
      </div>
    )
  } else {

    return (
      <div className={Style.product}>
        <div className={Style.contenedor}>
          <img className={Style.img} src={products.products.image} alt="" />
          <div className={Style.imgNameCart}>
            <div className={Style.containerLyrics}>
              <h1>{products.products.name}</h1>
              <h2>${products.products.price}</h2>
            </div>
            <div className={Style.cantidadStock}>
              <div className={Style.cantidad}>
                <label>Seleccione Cantidad:</label>
                <input classname={Style.input} type="number" min='0' max={products.products.stock} placeholder='Nº' onChange={handleChange} />
                <button className={Style.boton} onClick={subirCarrito}>
                  <img className={Style.changuito} src={Changuito} />
                </button>
              </div>
              <div className={Style.stock}>
                <h5>Stock diponible: {products.products.stock} unidades</h5>
              </div>
            </div>
          </div>
        </div>
        <div className={Style.description}>
          <h3>Descripción:</h3>
          <hr />
          <h4>{products.products.description}</h4>
        </div>
        <Reviews id={id2} />
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
    ...bindActionCreators({ getProductById, postCarrito }, dispatch)
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product)