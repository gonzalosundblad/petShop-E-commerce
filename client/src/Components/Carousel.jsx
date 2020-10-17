import React, { useState } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import {Carousel} from 'react-responsive-carousel'
import img from '../imagenes/logo.png'
import img2 from '../imagenes/baño.png'
import img3 from '../imagenes/juguetesPortada2.jpg'
import img4 from '../imagenes/cuchasPortada2.jpg'
import './card.css'

 export default function ControlledCarousel() {

  return (
    <div className="contenedor">
      <Carousel > 
      <div className="card">
        <img src={img} alt=""/>
        </div>
      <div className="card" >
      <img src={img2} alt=""/>
        </div>
      <div className="card" >
      <img src={img3} alt=""/>
        </div>
      <div className="card" >
      <img src={img4} alt=""/>
        </div>
      </Carousel>

    </div>
  );
}