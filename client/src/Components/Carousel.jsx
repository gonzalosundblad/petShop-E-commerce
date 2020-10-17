import React, { useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Carousel} from 'react-responsive-carousel';
import Misy from '../imagenes/misyGatos.jpg';
import Pedigree from '../imagenes/pedigree.jpg';
import Antipulgas from '../imagenes/antipulgas.jpg';
import '../Estilos/card.css';

 export default function ControlledCarousel() {

  return (
    <div className="contenedor">
      <Carousel > 
      <div className="card">
        <img src={Pedigree} alt=""/>
        </div>
      <div className="card" >
      <img src={Misy} alt=""/>
        </div>
      <div className="card" >
      <img src={Antipulgas} alt=""/>
        </div>
      </Carousel>

    </div>
  );
}