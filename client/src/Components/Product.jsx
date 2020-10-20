import { Link, Redirect } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Style from '../Estilos/Product.module.css';
import {getProductById} from '../Redux/actions.js'
import img from '../imagenes/comida.jpg'
import Carrito from '../Containers/carrito';
import { postCarrito } from '../Redux/actionsCarrito';
import Changuito from '../imagenes/carrito+.png'

export default function Product ({ id2 }){
//  {id, name, description, price, stock, imagen }
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [product_id, setId] = useState();
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [quantity, setQuantity] = useState();

  
        useEffect(() => {
          getProductById(id2).payload
          .then(function(resp){
            setName(resp.data.name);
            setDescription(resp.data.description);
            setImage(resp.data.image);
            setId(resp.data.id);
            setPrice(resp.data.price);
            setStock(resp.data.stock)
          }
        )
      }, []);

      function handleChange(e) {
        setQuantity(e.target.value)
      }



      
    function subirCarrito(){

      postCarrito(2, {
        product_id: id2,
        quantity: quantity,
        price: price}).payload
      .then(function(resp){
        console.log(resp.data)
        window.location.replace("http://localhost:3000/carrito")
      })

 }


   if(stock <= 0){
     return(
      <div className={Style.product}>
        <div className={Style.contenedor}>
          <img className={Style.img} src={image} alt=""/>
          <div className={Style.imgNameCart}>
            <div className={Style.containerLyrics}>
              <h1>{name}</h1>
              <h2>${price}</h2>
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
        <hr/>
        <h4>{description}</h4>
      </div>
    </div>
     )
   } else{

    return(
    <div className={Style.product}>
        <div className={Style.contenedor}>
          <img className={Style.img} src={image} alt=""/>
          <div className={Style.imgNameCart}>
            <div className={Style.containerLyrics}>
              <h1>{name}</h1>
              <h2>${price}</h2>
            </div>
            <div className={Style.cantidadStock}>
              <div className={Style.cantidad}>
                <label>Seleccione Cantidad:</label>
                <input classname={Style.input} type="number" min='0' max={stock} placeholder='Nº' onChange={handleChange} />
                <button className={Style.boton} onClick={subirCarrito }>
                    <img className={Style.changuito} src={Changuito}/>
                </button>
              </div>
              <div className={Style.stock}>
                <h5>Stock diponible: {stock} unidades</h5>
              </div>
            </div>
          </div>
        </div>
      <div className={Style.description}>
        <h3>Descripción:</h3>
        <hr/>
        <h4>{description}</h4>
      </div>
    </div>
  ) 
}
}

