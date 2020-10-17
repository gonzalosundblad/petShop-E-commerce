
import React, { useState, useEffect } from 'react';
import  axios from 'axios';
// import './product.css'
import StyleProductCard from '../Estilos/Product.module.css';
import { Link } from "react-router-dom"
import img from '../imagenes/comida.jpg'
import { getProductById } from '../Redux/actions'

export default function Product ({ id2 }){
//  {id, name, description, price, stock, imagen }
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [id, setId] = useState(id2);
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
      
  

    
    
  
    return (
    <div className={StyleProductCard.productCard}>
        <div>
          <img className={StyleProductCard.img} src={img} alt="imagen de perro"/>
        </div>
        <div className={StyleProductCard.containerLyrics}>
          <h3>{name}</h3>
          <h1>{description}</h1>
          <h1>${price}</h1>
          <h1>{stock}</h1>
        </div>
        <Link to={`/products/crud/${id2}`}>
          <span>Modificar</span>
        </Link>
    </div>
  )
} 

