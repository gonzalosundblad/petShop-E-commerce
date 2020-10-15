
import React, { useState, useEffect } from 'react';
import  axios from 'axios';
// import './product.css'
import StyleProductCard from '../Estilos/Product.module.css';


export default function Product ({ id2 }){
//  {id, name, description, price, stock, imagen }
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [id, setId] = useState(produc);
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();;




  useEffect(() => {
    async function detProd() {
      const response = await axios.get(`http://localhost:3001/products/${id2}`)
      const json = await response.data;
      console.log(json)
      setName(json.name);
      setDescription(json.description);
      setImage(json.image);
      setId(json.id);
      setPrice(json.price);
      setStock(json.stock);
    }
    detProd();
    }, []);







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
    </div>
  )
}
