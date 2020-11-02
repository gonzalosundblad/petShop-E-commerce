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
import { loadState } from '../Redux/reducer/localStorage';
import { bindActionCreators } from 'redux';
import { getMe } from '../Redux/actionsLogin';



function NavBar({ user, logged, funcionCatag, carrito, onSearch, getMe }) {
  const [carro, setCarro] = useState([]);
  const [total, setTotal] = useState(0)

  useEffect(() => {
    getMe();
    var precio = [];
    if (logged) {
      getCarrito(user.user_id)

    } else if (localStorage.length > 0) {

      let x = loadState()
      setCarro(x);
      console.log(x)
      precio = x.map(e => {
        return parseInt(e.price) * parseInt(e.quantity)
      })
    }
    else {
      console.log("no hay valores en el local storage ni tampoco usuario");
    }


    setTotal(precio.reduce(function (a, b) {
      return a + b
    }, 0))
  }, [])


  let admin;
  if (user !== null && logged && user.role === 'admin') {
    admin = <ListaDesplegable />
  }

  return (
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top row" style={{ backgroundColor: "orange", height: "100px" }}>
      <div className={StyleNav.nav}>
        <div className={StyleNav.divIzquierda}>
          <NavLink to='/'>
            <img src={HenryPet} className={StyleNav.imagen} />
          </NavLink>
          {admin}
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
          {logged ? <UsuarioLogeado /> : null }
          <div className={StyleNav.iniciarSesion}>

            {/* Condicional en caso de que el usuario exista para iniciar sesion */}

            {!logged ? <a class="nav-link text-white" href='/login' >Iniciar Sesión</a> : <span> {user.email} </span>}

            {/* ---------------------------------------------------------------- */}

          </div>
        </div>
      </div>
    </nav>
  );

};

function mapStateToProps(state) {
  // console.log(state.auth);
  const { user, logged } = state.auth;
  return {
    user,
    logged,
    carrito: state.reducer.carrito
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ getCarrito, getMe }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
