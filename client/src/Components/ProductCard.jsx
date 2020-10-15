import React from 'react';
import { Link } from 'react-router-dom';
import StyleProductCard from '../Estilos/ProductCard.module.css';
import img from '../imagenes/comida.jpg'

export default function ProductCard ({id, name, price, image}){
  // const [card, setCard] = useState()
  return(
    <a className={StyleProductCard.productCard} href={`/producto/${id}`}>
        <div >
          <img className={StyleProductCard.img} src={image} alt="imagen de perro"/>
        </div>
        <div className={StyleProductCard.containerLyrics}>
          <h3>{name}</h3>
          <h1>${price}</h1>
        </div>
        <div class={StyleProductCard.goCorner}>
          <div class={StyleProductCard.goArrow}> → </div>
        </div>
    </a>
  )
} 



