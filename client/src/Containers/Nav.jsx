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
import 'bootstrap/dist/css/bootstrap.min.css';
import HenryPet from '../imagenes/HenryPet2.png';


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
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top " style={{backgroundColor: "orange"}}>
      <Link to='/'>
        <img src={HenryPet} className={StyleNav.imagen}/>
      </Link>
  {/* <a class="navbar-brand" href="#">Navbar</a> */}
  {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button> */}

  <div class="collapse navbar-collapse" id="navbarColor01">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" href="/products">Catalogo</a>
      </li>
      <ListaDesplegable/> 
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <Search funcion={onSearch}/>
    </form>
    <a className={StyleNav.botonCarrito} href='/carrito' style={{textDecoration: 'none'}}>
      <img className={StyleNav.img} src={Changito}/>
      <h5>${total}</h5>
    </a>
  </div>
</nav>

    
   /* <div className={StyleNav.nav}>
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
          <ListaDesplegable/> 
        </div>   
      </div>
    </div>
  </nav>  */
  );
};
