import { Link, Redirect } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import  axios from 'axios';
// import './product.css'
import Style from '../Estilos/Product.module.css';
import {getProductById} from '../Redux/actions.js'
import img from '../imagenes/comida.jpg'
import Carrito from '../Containers/carrito';
import { postCarrito } from '../Redux/actionsCarrito';

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
        setQuantity(e.target.value);
      }



  const [producto, setProducto] = useState()

    function subirCarrito(){
      setProducto({
        product_id: id2,
        quantity: quantity,
        price: price
      })

      postCarrito(2, producto).payload
      .then(function(resp){
        console.log(resp.data)
        window.location.replace("http://localhost:3000/carrito")
      })

 }


   if(stock <= 0){
     return(
      <div className={Style.productCard}>
      <div>
        <img className={Style.img} src={img} alt="imagen de perro"/>
      </div>
      <div className={Style.containerLyrics}>
        <h3>{name}</h3>
        <h1>{description}</h1>
        <h1>${price}</h1>
        <h1>Sin Stock</h1>
        <a href="/products">Volver al Catálogo</a>
      </div>
    </div>
     )
   } else{

    return(
    <div className={Style.product}>
        <div>
          <img className={Style.img} src={image} alt="imagen de perro"/>
        </div>
        <div className={Style.containerLyrics}>
          <h1>{name}</h1>
          <h3>{description}</h3>
          <h4>${price}</h4>
          <h5>Stock: {stock}</h5>
           <input type="number" defaultValue= "1" onChange={handleChange} />
        <button className={Style.boton} onClick={subirCarrito} >Agregar al carrito</button>
        </div>

    </div>
  )
}
}
