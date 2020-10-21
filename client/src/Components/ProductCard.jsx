import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import StyleProductCard from '../Estilos/ProductCard.module.css';
import img from '../imagenes/comida.jpg'
import Carrito from '../Containers/carrito';

export default function ProductCard ({id, name, price, image, stock}){
  // const [card, setCard] = useState()
  console.log(stock)
if(stock === 0){
  return (
    <div className={StyleProductCard.divSinStock}>
      <a className={StyleProductCard.productCard} href={`/producto/${id}`}>
        <div >
          <img className={StyleProductCard.img} src={image} alt="imagen de perro"/>
        </div>
        <div className={StyleProductCard.containerLyrics}>
          <h3 className={StyleProductCard.name}>{name}</h3>
          <h2 className={StyleProductCard.precio}>${price}</h2>
        </div>
        <div class={StyleProductCard.goCorner}>
          <div class={StyleProductCard.goArrow}> → </div>
        </div>
        <div >
          <h1 >Sin Stock</h1>
        </div>
      </a>
    </div>
  )
}
  else return(
    <div className={StyleProductCard.divConStock} >
    <a className={StyleProductCard.productCard} href={`/producto/${id}`}>
        <div >
          <img className={StyleProductCard.img} src={image} alt="imagen de perro"/>
        </div>
        <div className={StyleProductCard.containerLyrics}>
          <h3>{name}</h3>
          <h2>${price}</h2>
        </div>
        <div className={StyleProductCard.goCorner}>
          <div className={StyleProductCard.goArrow}> → </div>
        </div>
    </a>
    </div>
  )
}
