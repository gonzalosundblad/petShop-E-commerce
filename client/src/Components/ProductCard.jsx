import React from 'react';
import { Link } from 'react-router-dom';
import StyleProductCard from '../Estilos/ProductCard.module.css';
import img from '../imagenes/comida.jpg'
import Carrito from '../Containers/carrito';


export default function ProductCard ({id, name, price, stock, imagen}){
  // const [card, setCard] = useState()

        function guardarCarro(){
          const product = {
            id: id,
            name: name,
            price: price
          }

          console.log(product)
        }


  return(
    <div>
    <a className={StyleProductCard.productCard} href={`/products/${id}`}>
        <div >
          <img className={StyleProductCard.img} src={img} alt="imagen de perro"/>
        </div>
        <div className={StyleProductCard.containerLyrics}>
          <h3>{name}</h3>
          <h1>${price}</h1>
        </div>
        <div className={StyleProductCard.goCorner}>
          <div className={StyleProductCard.goArrow}> → </div>
        </div>
    </a>
        {stock === 0 ? null : <button onClick={guardarCarro} >Agregar al carrito</button>}

      </div>
  )
} 



