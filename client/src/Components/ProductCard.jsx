import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import estilo from '../Estilos/ProductCard.module.css';
import img from '../imagenes/comida.jpg'
import Carrito from '../Containers/carrito';

export default function ProductCard ({id, name, price, image, stock}){
  // const [card, setCard] = useState()
  console.log(stock)
if(stock === 0){
  return (
    <div className={estilo.productCard}>
      <a href={`/producto/${id}`} style={{textDecoration: 'none'}}>
        <div class="card" height="300px" width="250px"  >
          <img src={image} style={{width: "250px", height: "250px"}} class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title text-dark">{name}</h5>
            <p class="card-text text-dark">${price}</p>
          </div>
          <ul class="list-group list-group-flush bg-danger" height="10px">
            <li class="list-group-item bg-danger text-white">Sin Stock</li>
          </ul>
        </div>
      </a>
    </div>
  )
}
  else return(
    <div className={estilo.productCard}>
      <a href={`/producto/${id}`} style={{textDecoration: 'none'}}>
        <div class="card" height="300px" width="250px"  >
          <img src={image} style={{width: "250px", height: "250px"}} class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title text-dark">{name}</h5>
            <p class="card-text text-dark">${price}</p>
          </div>
          <ul class="list-group list-group-flush bg-success" height="10px">
            <li class="list-group-item bg-success">
              
              <h6>Agregar al carrito</h6>
            </li>
          </ul>
        </div>
      </a>
    </div>
  
  )
}


{/* <div className={StyleProductCard.divConStock}>
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
     </div>  */}