import React, { useState } from 'react';
import Misy from '../imagenes/misyGatos.jpg';
import Pedigree from '../imagenes/pedigree.jpg';
import Antipulgas from '../imagenes/antipulgas.jpg';
import img4 from '../imagenes/juguetesPortada2.jpg';
import banner1 from '../imagenes/envioExpress.png';
import banner2 from '../imagenes/banner2.png';
import banner3 from '../imagenes/banner3.png';

export default function ControlledCarousel() {

  return (
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src={banner1} class="d-block w-100" alt="..."/>
        </div>
        <div class="carousel-item">
          <img src={banner2} class="d-block w-100" alt="..."/>
        </div>
        <div class="carousel-item">
          <img src={banner3} class="d-block w-100" alt="..."/>
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  );
}