import React, { useState } from 'react';
import {Link } from "react-router-dom";
import StyleUsuarioLogeado from '../Estilos/UsuarioLogeado.module.css';
import userLogo from '../imagenes/userLogo.png'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { logout } from "../Redux/actionsLogin";

function UsuarioLogeado ({user}) {
      //console.log(user);
      //const id = user.user.user_id;

      function salir(e){
        e.preventDefault()
        logout();
      }
      return (
          <div id='header'>
      <ul className='lista'>
          <li className={StyleUsuarioLogeado.div}>
               <img className={StyleUsuarioLogeado.logo} src={userLogo} alt="" href=''/>
              <ul>
                  <li>
                      <a href='/user/:id'>Detalles de cuenta</a>
                      {/* window.location=`user/${user.id}` */}
                  </li>
                  <li >
                  <Link to='/user/orden' > some stuff </Link>
                      <a href='/user/orden'>Mis compras</a>
                  </li>
                  <li>
                      <a onClick = {salir}>Salir</a>
                  </li>

              </ul>
          </li>
      </ul>
  </div>

      )
}
function mapStateToProps(state) {
  const { user } = state.auth.user;
  return {
    user,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    ...bindActionCreators({logout}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsuarioLogeado);
