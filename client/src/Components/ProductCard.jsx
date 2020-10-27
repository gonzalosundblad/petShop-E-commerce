import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import estilo from '../Estilos/ProductCard.module.css';
import img from '../imagenes/comida.jpg'
import Carrito from '../Containers/carrito';
import Changuito from '../imagenes/carrito+.png';

export default function ProductCard ({id, name, price, image, stock}){
  // const [card, setCard] = useState()
  //console.log(stock)
if(stock === 0){
  return (
    <div className={estilo.productCard}>
      
        <div class="card" style={{width: "250px", height: "320px", alignItems: "center"}} >
        <a href={`/producto/${id}`} style={{textDecoration: 'none'}}>
          <img src={image} style={{width: "200px", height: "200px"}} class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title" style={{color: "black"}}>{name}</h5>
            <p class="card-text" style={{color: "black"}}>${price}</p>
          </div>
          </a>
          <div style={{width: "250px", height: "42px"}}>
          <ul class="list-group list-group-flush bg-danger"  style={{height: "32px"}}>
            <li class="list-group-item bg-danger text-white" style={{padding:"1px"}}>Sin Stock</li>
          </ul>
          </div>
        </div>
      
    </div>
  )
}
  else return(
    <div className={estilo.productCard}>
      
        <div class="card" style={{width: "250px", height: "320px", alignItems: "center"}} >
        <a href={`/producto/${id}`} style={{textDecoration: 'none'}}>
          <img src={image} style={{width: "200px", height: "200px"}} class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title" style={{color: "black"}}>{name}</h5>
            <p class="card-text" style={{color: "black"}}>${price}</p>
          </div>
        </a>
        <div style={{width: "250px", height: "42px"}}>
          <ul class="list-group list-group-flush bg-success" style={{width: "250px", height: "32px"}} > 
            <img className={estilo.changuito} style={{padding:"1px"}} src={Changuito}/>
          </ul>
        </div>
        </div>
      
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