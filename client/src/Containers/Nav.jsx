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


export default function NavBar({ funcionCatag, onSearch, idUser }) {

  const [carro, setCarro] = useState([])

  if (!idUser) {
    idUser = 1
  }

  useEffect(() => {
    getCarrito(idUser).payload
      .then(res => {
        if (!res.data[0]) {
          console.log('no hay productos')
        } else {
          setCarro(res.data[0].products)
        }
      })
  }, [])
  var precio = carro.map(e => e.price * e.LineaDeOrden.quantity)
  var total = precio.reduce(function (a, b) {
    return a + b
  }, 0)

  function recargar() {
    window.location.reload()
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
          <h5>${total}</h5>
        </a>
        <div className={StyleNav.botones}>
          <UsuarioLogeado />
          <a className={StyleNav.botones} href='/login'>
            <span className={StyleNav.botonCatalogo} >Iniciar Sesión</span>
          </a>
        </div>
      </div>
      <div className={StyleNav.divBotones}>
        <div className={StyleNav.botones}>
          <a className={StyleNav.botones} href='/products'>
            <span className={StyleNav.botonCatalogo} >Catálogo</span>
          </a>
          {/* <a className={StyleNav.botones} href='/register'>
            <span className={StyleNav.botonCatalogo} >Registrarse</span>
          </a> */}
          {/* <a className={StyleNav.botones} href='/login'>
            <span className={StyleNav.botonCatalogo} >Iniciar Sesión</span>
          </a>  */}
          <ListaDesplegable />
        </div>
      </div>

      {/* // <SearchBar2 onSearch={onSearch} productos={resultados} /> */}
    </div>
  );
};
