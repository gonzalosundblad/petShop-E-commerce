
import React, { useState, useEffect } from 'react';
import  axios from 'axios';
// import './product.css'
import Style from '../Estilos/Product.module.css';
import {getProductById} from '../Redux/actions.js'


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
        </div>
    </div>
  )
}
