import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import logo from '../imagenes/logo.png';
import '../Estilos/SearchBar.module.css';
import StyleNav from '../Estilos/Nav.module.css';
import Search from '../Components/SearchComp';
import { ListaDesplegable } from '../Components/ListaDesplegable';
import Changito from '../imagenes/changuito2.png';
import { getCarrito } from '../Redux/actionsCarrito';
import UsuarioLogeado from '../Components/UsuarioLogeado';
import { connect } from 'react-redux'

function NavBar({ user, funcionCatag, onSearch }) {
  //console.log(user.user.role);
  const [carro, setCarro] = useState([]);
  const [precio , setPrecio] =useState ([]);
  useEffect(() => {
    var pre = [];
    if (user === null) {
      let x = []
      //recorro el local storage
      for(var i = 0; i < localStorage.length; i++){
        let clave = localStorage.key(i);
        let prod = JSON.parse(localStorage.getItem(clave));
            if(typeof(parseInt(clave)) === "number" ){
                x.push(prod)
            }     
             
              
      }
      setCarro(x);
      pre = x.map(e => {
        return parseInt(e.price) * parseInt(e.quantity)
      })   
    } else {
      user = user.user.user_id;
      getCarrito(user).payload
      .then(res => {
        if (!res.data[0]) {
          console.log('no hay productos')
        } else {
          setCarro(res.data[0].products)
          pre = carro.map(e => e.price * e.LineaDeOrden.quantity)
        }
        
      })
    }
    var total = pre.reduce(function (a, b) {
      return a + b
  }, 0)
    setPrecio(total)
    }, [])
  
  
    

  function recargar() {
    window.location.reload()
  }

  let admin;
  if (user !== null && user.user.role === 'admin') {
    admin = <ListaDesplegable />
  }

  return (
    <div className={StyleNav.nav}>
      <div className={StyleNav.divFixed}>
        <div>
          <Link to='/'>
            <img className={StyleNav.logo} src={logo} alt="" />
          </Link>
        </div>
        <div>
          <Search funcion={onSearch} />
        </div>
        <a className={StyleNav.botonCarrito} href='/carrito'>
          <img className={StyleNav.img} src={Changito} />
          <h5>${precio}</h5>
        </a>

        <div className={StyleNav.botones}>
          {user !== null ? <UsuarioLogeado /> : null}

          {user === null ? <a className={StyleNav.botones} href='/login'>
            <span className={StyleNav.botonCatalogo} >Iniciar Sesión</span>
          </a> : null}

        </div>
      </div>
      <div className={StyleNav.divBotones}>
        <div className={StyleNav.botones}>
          <a className={StyleNav.botones} href='/products'>
            <span className={StyleNav.botonCatalogo} >Catálogo</span>
          </a>
          {admin}

        </div>
      </div>

    </div>
  );

};

function mapStateToProps(state) {
  // console.log(state.auth);
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(NavBar);
