import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import  axios from 'axios';
// import './product.css'
import StyleProductCard from '../Estilos/Product.module.css';
import {getProductById} from '../Redux/actions.js'
import img from '../imagenes/comida.jpg'
import Carrito from '../Containers/carrito';

export default function Product ({ id2 }){
//  {id, name, description, price, stock, imagen }
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [id, setId] = useState();
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();;


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





  const [producto, setProducto] = useState()
  
    function guardarCarro(){
      setProducto({
        id: id2,
        name: name,
        price: price,
      })
 }
 console.log(producto)

   if(stock <= 0){
     return(
      <div className={StyleProductCard.productCard}>
      <div>
        <img className={StyleProductCard.img} src={img} alt="imagen de perro"/>
      </div>
      <div className={StyleProductCard.containerLyrics}>
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
    <div className={StyleProductCard.productCard}>
        <div>

          <img className={StyleProductCard.img} src={image} alt="imagen de perro"/>
        </div>
        <div className={StyleProductCard.containerLyrics}>
          <h3>{name}</h3>
          <h1>{description}</h1>
          <h1>${price}</h1>
          <h1>Stock: {stock}</h1>
        </div>
        <button onClick={guardarCarro} >Agregar al carrito</button>

    </div>
  ) 
}
}

