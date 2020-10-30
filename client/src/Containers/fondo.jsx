import React from 'react';
import fondo from '../imagenes/fondoColores.png';
import perrito from '../imagenes/perritoo.png';
import estilo from '../Estilos/fondo.module.css';
import perroBlanco from '../imagenes/perroBlanco.png';
import PerroIcono from '../imagenes/perritoIcono.png';
import GatoIcono from '../imagenes/gatitoIcono.png';
import AveIcono from '../imagenes/aveIcono.png';
import peces from '../imagenes/pecesPrincipal.png';
import perroYgato from '../imagenes/perroYgato.png';
import conejo from '../imagenes/conejoPrincipal.png';
import { NavLink } from 'react-router-dom';

export function Fondo() {
  return (
    <div style={{ marginTop: "-10px" }}>
      <div className={estilo.fondo} >
        <img src={fondo} width='100%' height="600px"></img>
      </div>
      <div className={estilo.perrito}>

        <img className={estilo.imgPerrito} src={perrito} />

        <div className={estilo.divCatalogo}>
          <h1>Los mejores productos para tu mascota!</h1>
          <h3>¡Hecha un vistazo!</h3>
          <NavLink to="/products"><button type="button" class="btn btn-danger btn-lg">CATALOGO</button></NavLink>
        </div>

      </div>
      <div className={estilo.icono}>
        <div className={estilo.categoria}>
          <NavLink to='/products/category/Perros' style={{ textDecoration: 'none' }}>
            <img src={PerroIcono} className={estilo.imgIcono} />
            <h2>Perros</h2>
          </NavLink>
        </div>
        <div className={estilo.categoria}>
          <NavLink to='/products/category/Gatos' style={{ textDecoration: 'none' }}>
            <img src={GatoIcono} className={estilo.imgIcono} />
            <h2>Gatos</h2>
          </NavLink>
        </div>
        <div className={estilo.categoria}>
          <NavLink to='/products/category/Aves' style={{ textDecoration: 'none' }}>
            <img src={AveIcono} className={estilo.imgIcono} />
            <h2>Aves</h2>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export function Animales() {
  return (
    <div className={estilo.divImagenes} >
      <div className={estilo.divImagenTexto}>
        <img src={peces} width='500px' height='550px' />
        <h1>Variedad de productos!</h1>
      </div>
      <div className={estilo.divImagenDerecha}>
        <h1>Compra seguro desde tu casa!</h1>
        <img src={perroYgato} width='560px' height="550px" />
      </div>
      <div className={estilo.divImagenTexto}>
        <img src={conejo} width='520px' height='550px' />
        <h1>Miles de productos disponibles!</h1>
      </div>
    </div>
  )
};

export function PieDePagina() {
  return (
    <div>
      <div className={estilo.pieDePagina} >
        <div className={estilo.grilla}>
          <div >
            <h6 class="text-secondary">Sobre nosotros</h6>
          </div>
          <div >
            <h6 class="text-secondary">Contacto</h6>
          </div>
          <div >
            <h6 class="text-secondary">Redes Sociales</h6>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "orange", opacity: "70%" }} height="50px" width="100%">.</div>
    </div>
  )
}
