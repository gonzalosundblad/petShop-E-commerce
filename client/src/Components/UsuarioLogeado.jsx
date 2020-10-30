import React, { useState } from 'react';
import StyleUsuarioLogeado from '../Estilos/UsuarioLogeado.module.css';
import userLogo from '../imagenes/userLogo.png'
import { logout } from '../Redux/actionsLogin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

function UsuarioLogeado({ user, logout, logged }) {
  //console.log(user);

  function cerrarSesion() {
    logout();
    localStorage.removeItem("user")
  }

  

  return (
    <div id='header'>
      <ul className='lista'>
        <li className={StyleUsuarioLogeado.div}>
          <img className={StyleUsuarioLogeado.logo} src={userLogo} />
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
          </svg>
          <ul>
            <li>
              <a href='/perfil'>Detalles de cuenta</a>
              {/* window.location=`user/${user.id}` */}
            </li>
            <li >
              {user ? <a href={`/user/${user.id}/ordenes`}>Mis compras</a> :
              <a href={`/user/${1}/ordenes`}>Mis compras</a>}
            </li>
            <li>

              {/* Si no esta logueado o si esta */}

              {!logged ? null :  <a href='/' onClick={cerrarSesion} >Cerrar Sesión</a>}
             
            </li>

          </ul>
        </li>
      </ul>
    </div>

  )
}

function mapStateToProps(state) {
  const { user, logged } = state.auth;
  return {
    user, logged
  };
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ logout }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsuarioLogeado);
