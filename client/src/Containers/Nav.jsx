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


function NavBar({ user, logged, funcionCatag, onSearch }) {
  //console.log(user.user.role);
  const [carro, setCarro] = useState([]);
  const [total, setTotal] = useState(0)

  const idUser = () => {
  if(!user){
    idUser= 0
  }
  else idUser= user.user.user_id
}

  useEffect(() => {
    var precio = [];
    if (logged) {
      getCarrito(idUser)

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

  var inicio;
    if(!user){
      inicio= <a class="nav-link text-white" href='/login' >Iniciar Sesión</a> 
    }
    else if(user && !logged){
      inicio = <a class="nav-link text-white" href='/login' >Iniciar Sesión</a>
    }
    else inicio= <a class="nav-link text-white"> Hola {user.user.name}! </a>
  
  console.log(inicio)
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

            {/* Condicional en caso de que el usuario exista para iniciar sesion */}
            {inicio}
            {/* {!logged ? <a class="nav-link text-white" href='/login' >Iniciar Sesión</a> : <a class="nav-link text-white" href='/login' > {user.user.email} </a>} */}

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
    logged
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ getCarrito }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
