import React, { useState, useEffect } from 'react';
import { Link, NavLink } from "react-router-dom";
import '../Estilos/SearchBar.module.css';
import StyleNav from '../Estilos/Nav.module.css';
import Search from '../Components/SearchComp';
import { ListaDesplegable } from '../Components/ListaDesplegable';
import Changito from '../imagenes/changuito2.png';
import { getCarrito } from '../Redux/actionsCarrito';
import UsuarioLogeado from '../Components/UsuarioLogeado';
import 'bootstrap/dist/css/bootstrap.min.css';
import HenryPet from '../imagenes/HenryPet2.png';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';


function NavBar({ user, funcionCatag, onSearch, getCarrito }) {
  //console.log(user.user.role);
  const [carro, setCarro] = useState([])
  useEffect(() => {
    if (user === null) {
      user = 1
    } else {
      user = user.user.user_id
      // .user.user_id
    }
    getCarrito(user)

  }, [])
  var precio = carro.map(e => e.price * e.LineaDeOrden.quantity)
  var total = precio.reduce(function (a, b) {
    return a + b
  }, 0)

  // let admin;
  // if (user !== null && user.user.role === 'admin') {
  //   admin = <ListaDesplegable />
  // }

  return (
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top row" style={{ backgroundColor: "orange", height: "100px" }}>
      <div className={StyleNav.nav}>
        <div className={StyleNav.divIzquierda}>
          <NavLink to='/'>
            <img src={HenryPet} className={StyleNav.imagen} />
          </NavLink>
          <ListaDesplegable />
        </div>
        <div className={StyleNav.divMedio}>
          <form class="form-inline my-2 my-lg-0">
            <Search funcion={onSearch} />
          </form>

        </div>
        <div className={StyleNav.divDerecho}>
          <NavLink className={StyleNav.botonCarrito} to='/carrito' style={{ textDecoration: 'none' }}>
            <img className={StyleNav.img} src={Changito} />
            <h5>${total}</h5>
          </NavLink>
          <UsuarioLogeado />
          <div className={StyleNav.iniciarSesion}>
            <NavLink class="nav-link text-white" to='/login' >Iniciar Sesión</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );

};

function mapStateToProps(state) {
  // console.log(state.auth);

  return {
    user: state.auth.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ getCarrito }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);


// export const Nav = connect(mapStateToProps)(NavBar)


