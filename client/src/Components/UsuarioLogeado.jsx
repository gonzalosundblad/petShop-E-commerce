import React, { useState } from 'react';
import { Link } from "react-router-dom";
import StyleUsuarioLogeado from '../Estilos/UsuarioLogeado.module.css';
import userLogo from '../imagenes/userLogo.png'
import { logout } from '../Redux/actionsLogin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

function UsuarioLogeado({ user, logout }) {
  //console.log(user);

  function cerrarSesion() {
    logout()
  }

  var id = user.user.user_id

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
              <a href={`/user/${id}/ordenes`}>Mis compras</a>
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

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ logout }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsuarioLogeado);
