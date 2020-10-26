import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import estilo from '../Estilos/ProductCard.module.css';
import img from '../imagenes/comida.jpg'
import Carrito from '../Containers/carrito';
import Changuito from '../imagenes/carrito+.png';

export default function ProductCard ({id, name, price, image, stock}){
  // const [card, setCard] = useState()
  console.log(stock)
if(stock === 0){
  return (
    <div className={estilo.productCard}>
      <a href={`/producto/${id}`} style={{textDecoration: 'none'}}>
        <div class="card" style={{width: "250px", height: "320px", alignItems: "center"}} >
          <img src={image} style={{width: "200px", height: "200px"}} class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title text-dark">{name}</h5>
            <p class="card-text text-dark">${price}</p>
          </div>
          <ul class="list-group list-group-flush bg-danger" style={{width: "250px", height: "48px"}}>
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
        <div class="card" style={{width: "250px", height: "320px", alignItems: "center"}}  >
          <img src={image} style={{width: "200px", height: "200px"}} class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title text-dark">{name}</h5>
            <p class="card-text text-dark">${price}</p>
          </div>
          <ul class="list-group list-group-flush bg-success" style={{width: "250px", height: "48px"}}>
            {/* <li class="list-group-item bg-success" > */}
            
                    <img className={estilo.changuito} src={Changuito}/>
                
            {/* <svg width="20px" height="20px" viewBox="0 0 16 16" class="bi bi-cart-plus-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM4 14a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm7 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
              </svg> */}
              {/* <h6>Agregar al carrito</h6> */}
            {/* </li> */}
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