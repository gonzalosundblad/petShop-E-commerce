import React, { useState, useEffect } from 'react';
import StyleUsuarioLogeado from '../Estilos/UsuarioLogeado.module.css';
import userLogo from '../imagenes/userLogo.png'
import { logout } from '../Redux/actionsLogin'
import { connect } from 'react-redux'
import { getMe } from '../Redux/actionsLogin'
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';

function UsuarioLogeado({ user, logout, logged, getMe }) {

  useEffect(() => {
    getMe();
  }, [])

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
              <NavLink to='/perfil'>Detalles de cuenta</NavLink>
              {/* window.location=`user/${user.id}` */}
            </li>
            <li >
              <NavLink to={`/user/id/ordenes`}>Mis compras</NavLink>
            </li>
            <li>
              <NavLink to='/' onClick={cerrarSesion} >Cerrar Sesión</NavLink>
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
    ...bindActionCreators({ logout, getMe }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsuarioLogeado);
