import React, { useState } from 'react';
import { Link } from "react-router-dom";
import StyleUsuarioLogeado from '../Estilos/UsuarioLogeado.module.css';
import userLogo from '../imagenes/userLogo.png'
import { postLogo } from '../Redux/actionsLog'


export default function UsuarioLogeado({ id }) {

  function cerrarSesion() {
    postLogo()
  }

  return (
    <div id='header'>
      <ul className='lista'>
        <li className={StyleUsuarioLogeado.div}>
          <img className={StyleUsuarioLogeado.logo} src={userLogo} />
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
</svg>
          <ul>
            <li>
              <a href='/perfil'>Detalles de cuenta</a>
              {/* window.location=`user/${user.id}` */}
            </li>
            <li >
              <a href='/user/:id/ordenes'>Mis compras</a>
            </li>
            <li>
              <a href='/' onClick={cerrarSesion} >Cerrar Sesión</a>
            </li>

          </ul>
        </li>
      </ul>
    </div>

  )
}


// logeado como 'nombre apellido'
// mis compras
// detalles de cuenta -> redirigir a ./perfil
// salir de mi cuenta