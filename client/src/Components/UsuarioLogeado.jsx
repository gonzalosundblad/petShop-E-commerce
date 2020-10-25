import React, { useState } from 'react';
import { Link } from "react-router-dom";
import StyleUsuarioLogeado from '../Estilos/UsuarioLogeado.module.css';
import userLogo from '../imagenes/userLogo.png'
import { logout } from '../Redux/actionsLogin'


export default function UsuarioLogeado({ id }) {

  function cerrarSesion() {
    logout()
  }

  return (
    <div id='header'>
      <ul className='lista'>
        <li className={StyleUsuarioLogeado.div}>
          <img className={StyleUsuarioLogeado.logo} src={userLogo} alt="" href='' />
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