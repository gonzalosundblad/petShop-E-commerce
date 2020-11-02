import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux'
import { loadState } from '../Redux/reducer/localStorage';
import { bindActionCreators } from 'redux';
import { useState } from 'react';

import CheckoutProductoCarrito from './CheckoutProductoCarrito';

import { datosEnvio } from '../Redux/actionsCheckout'


var logueado = false// HAY Q PREGUNTARLE AL STORE SI EL USUARIO ESTA LOGUEADO PARA EL RENDERIZADO CONDICIONAL DE ABAJO. PONER FALSE PARA VER EL OTRO RENDERIZADO
// var name = 'usuarioLogueado.nombre'
// var lastname = 'usuarioLogueado.apellido'
// var email = 'usuarioLogueado.email'


function Checkout({ user, logged, carrito, datosEnvio }) {

  const [envio, setEnvio] = useState();
  const [email, setEmail] = useState(user? user.email : null);
  const [name, setName] = useState(user? user.name : null);
  const [lastname, setLastname] = useState(user? user.last_name : null);
  const [adress, setAdress] = useState();
  const [city, setCity] = useState();
  const [prov, setProv] = useState();
  const [pisoDepto, setPisoDepto] = useState();
  const [CP, setCP] = useState();



var precioFinal = 0
for(var i = 0; i < carrito.length; i++) {
  precioFinal = precioFinal + (carrito[i].LineaDeOrden.price)*(carrito[i].LineaDeOrden.quantity)
}


if(envio === 'Envio CABA y alrededores ($180)') precioFinal = precioFinal + 180
if(envio === 'Envio GBA y resto del pais ($450)') precioFinal = precioFinal + 450

var disable = true;
// var prohibir = false;

if(envio && email && name && lastname && adress && city && prov) {
   disable = false
}

var handleClick = (e) => {
  if(disable) {
    e.preventDefault() //OJO ACA SI ROMPE
    alert('Campos requeridos!')
    // prohibir = true
}

datosEnvio({
  name,
  lastname,
  email,
  adress,
  envio,
  city,
  prov,
  pisoDepto,
  CP,
  precioFinal
})

}

  // console.log(prohibir)


  if(user && logged) {
    logueado = true
  }


  return (
    <div style={{ width: 700, margin: 'auto'}} >

      <form>

      {carrito && carrito.map(e => {
          return (
            <div>
              <CheckoutProductoCarrito
                key={e.id}
                id={e.id}
                name={e.name}
                price={e.price}
                image={e.image}
                LineaDeOrden={e.LineaDeOrden.quantity}
                precioFinal={precioFinal}
              />
            </div>
          )
        }
        )
        }
        <hr/>
        <h5>Total a pagar: ${precioFinal}</h5>
        <hr/>
        {logueado && (
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputState">Envio</label>
              <select id="inputState" class="form-control" onChange={e => setEnvio(e.target.value)}>
                <option selected>Elija un metodo de envio</option>
                <option>Envio CABA y alrededores ($180)</option>
                <option>Envio GBA y resto del pais ($450)</option>
                <option>Retiro por sucursal ANDREANI (sin cargo)</option>
              </select>
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword4">Email</label>
              <input type="email" class="form-control" name='email' id="inputPassword4" placeholder={user.email} readOnly />
            </div>
            <div class="form-group col-md-6">
              <label for="inputEmail4">Nombre</label>
              <input type="text" class="form-control" id="inputEmail4" placeholder={user.name} readOnly />
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword4">Apellido</label>
              <input type="text" class="form-control" id="inputPassword4" placeholder={user.last_name} readOnly />
            </div>
          </div>
        )}
        {!logueado && (
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputState">Envio</label>
              <select id="inputState" class="form-control" onChange={e => setEnvio(e.target.value)}>
                <option selected>Elija un metodo de envio</option>
                <option>Envio CABA y alrededores ($180)</option>
                <option>Envio GBA y resto del pais ($450)</option>
                <option>Retiro por sucursal ANDREANI (sin cargo)</option>
              </select>
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword4">Email</label>
              <input type="email" class="form-control" name='email' id="inputPassword4" placeholder='Ingrese su email' onChange={e => setEmail(e.target.value)}/>
            </div>
            <div class="form-group col-md-6">
              <label for="inputEmail4">Nombre</label>
              <input type="text" class="form-control" id="inputEmail4" placeholder='Ingrese su nombre' onChange={e => setName(e.target.value)}/>
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword4">Apellido</label>
              <input type="text" class="form-control" id="inputPassword4" placeholder='Ingrese su apellido' onChange={e => setLastname(e.target.value)}/>
            </div>
          </div>
        )}

        <div class="form-row">

          <div class="form-group col-md-6">
            <label for="inputAddress">Direccion</label>
            <input type="text" class="form-control" id="inputAddress" onChange={e => setAdress(e.target.value)} placeholder="Avenida Siempreviva 742" />
          </div>
          <div class="form-group col-md-2">
            <label for="inputAddress2">Piso y dpto</label>
            <input type="text" class="form-control" id="inputAddress2" onChange={e => setPisoDepto(e.target.value)} placeholder="1A" />
          </div>
          <div class="form-group col-md-2">
            <label for="inputZip">Codigo Postal</label>
            <input type="text" class="form-control" id="inputZip" onChange={e => setCP(e.target.value)}/>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputCity">Ciudad</label>
              <input type="text" class="form-control" id="inputCity" onChange={e => setCity(e.target.value)}/>
            </div>
            <div class="form-group col-md-6">
              <label for="inputState">Provincia</label>
              <select id="inputState" class="form-control" onChange={e => setProv(e.target.value)}>
                <option selected>Ingrese su provincia</option>
                <option>CABA</option>
                <option>Buenos Aires</option>
                <option>Santa Fe</option>
                <option>Cordoba</option>
                <option>Mendoza</option>
                <option>Santiago del Estero</option>
                <option>La Pampa</option>
                <option>Entre Rios</option>
                <option>Corrientes</option>
                <option>Tucuman</option>
                <option>San Luis</option>
                <option>Formosa</option>
                <option>Chaco</option>
                <option>Misiones</option>
                <option>Catamarca</option>
                <option>Jujuy</option>
                <option>Salta</option>
                <option>San Juan</option>
                <option>La Rioja</option>
                <option>Neuquen</option>
                <option>Rio Negro</option>
                <option>Chubut</option>
                <option>Santa Cruz</option>
                <option>Tierra del Fuego</option>
              </select >
            </div>
            <div class="form-group col-md-6">
            </div>
          </div>
        </div>
        <hr />
        <NavLink to='/checkout/pago' onClick={handleClick} type="submit" class="btn btn-primary" disabled='true'>Continuar</NavLink>
        <hr/>
      </form>
      {/* {carrito && carrito.map(e => {
          return (
            <div>
              <ProductoCarrito
                key={e.id}
                id={e.id}
                name={e.name}
                price={e.price}
                image={e.image}
                LineaDeOrden={e.LineaDeOrden.quantity}
              />
            </div>
          )
        }
        )
        } */}

      {/* {prohibir && (
        <div><p>campos requeridos</p></div>
      )} */}
    </div>
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
    // setTaste: taste => dispatch(setTaste(taste)),
    datosEnvio: (payload) => dispatch(datosEnvio(payload))
  }};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
