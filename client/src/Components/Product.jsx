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
import { saveState } from '../Redux/reducer/localStorage';
import Camioneta from '../imagenes/EnvioExpress2.png';


function Product({ logged, user, id2, products, postCarrito, getProductById }) {

  const [quantity, setQuantity] = useState();

  useEffect(() => {
    getProductById(id2)
  }, []);

  function handleChange(e) {
    setQuantity(e.target.value);
  }


  var idUser;
  if(!user){
    idUser= 0;
  }
  else idUser= user.user.user_id;


  function subirCarrito() {
    const { image, name, price } = products.products
    
      postCarrito(idUser, {
        product_id: id2,
        quantity: quantity,
        price: products.products.price
      
      // window.location.replace("http://localhost:3000/products")
      // .catch(err => "Error al cargar producto")
    })
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
                <Contador funcion={handleChange} valor={1}/>
                <input style={{width: "150px"}} type="number" min='0' max={products.products.stock} placeholder='Nº' onChange={handleChange} />
                <button class="btn btn-success" onClick={subirCarrito} style={{width: "150px", marginTop: "10px"}}>
                  Agregar
                  <img className={Style.changuito} src={Changuito} />
                </button>
              </div>
              <div style={{display: "flex", justifyContent: "end", marginTop: "10px"}}>
                <h6 style={{fontSize: "12px"}}>Stock diponible: {products.products.stock} unidades</h6>
              </div>
            </div>
            <div style={{display: "flex", flexDirection: "column", marginTop: "40px"}}>
              <img src={Camioneta} style={{width: "80px"}}/>
              <h6  style={{display: "flex", justifyContent: "end"}}>Envio Express</h6>
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
  const { user, logged } = state.auth;

  return {
    user,
    logged,
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
