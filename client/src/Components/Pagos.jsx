import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import { connect } from 'react-redux'

import CheckoutProductoCarrito from './CheckoutProductoCarrito';
import { NavLink } from 'react-router-dom';

// import { editarUno } from '../Redux/actionsCheckout'



function Pagos({ user, logged, carrito, datosEnvio, editarUno }) {


  const [showError, setShowError] = useState(false);
  const [messageFromServer, setMessage] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [editar, setEditar] = useState(false);

  const [cambio, setCambio] = useState();
  const [nuevoDato, setNuevoDato] = useState();

  var editarDatos = () => {
    console.log('heloo')
    if (!editar) setEditar(true);
    if (editar) setEditar(false)
    // editarUno({
    //   [cambio]: nuevoDato
    // })
    datosEnvio[cambio] = nuevoDato
  }



  var email; // defino los datos para enviar al servidor y q este mande el mail de confirmacion y resumen de compra
  var nombre;
  var apellido;
  var direccion = datosEnvio.adress;
  var pisoDepto = datosEnvio.pisoDepto
  var CP = datosEnvio.CP;
  var ciudad = datosEnvio.city;
  var provincia = datosEnvio.prov;
  var precioFinal = datosEnvio.precioFinal;


  if (user && logged) { //estos datos dependen de si la compra la hace un usuario logueado o fantasma
    email = user.email;
    nombre = user.name;
    apellido = user.last_name;
  } else {
    email = datosEnvio.email; // necesito tomarlo del componente checkout porq este comprador no tiene cuenta
    nombre = datosEnvio.name;
    apellido = datosEnvio.lastname;
  }

  var years = []
  for (var i = 2020; i < 2050; i++) {
    years.push(i)
  }

  async function pedirPago(e) {
    e.preventDefault();

    setWaiting(true);
    setShowError(false);

    try {
      const response = await axios.post(
        'http://localhost:3001/checkout',
        {
          email, // agregar resumen de compra: precio final, productos, direccion de envio, tarjeta con la q se pago, tipo de envio
          nombre,
          apellido,
          direccion,
          pisoDepto,
          CP,
          ciudad,
          provincia,
          precioFinal,
          carrito
        }
      );
      console.log(response.data);
      if (response.data === 'checkout email sent') {
        setShowError(false);
        setMessage('checkout email sent');
        setWaiting(false);
        setSuccess(true);
      } else {
        setTimeout(() => setShowError(true), 3000); // le pongo setTimeout para simular q tarda en recibir el error del banco en el pago
        setTimeout(() => setWaiting(false), 3000);
      }
    } catch (error) {
      console.error(error.response.data);
      if (error.response.data === 'email not in db') {
        setShowError(true);
        setMessage('');
        setWaiting(false);
        setSuccess(false)
      }
    }

  }


  return (

    <div style={{ width: 700, margin: 'auto' }} >
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
            />
          </div>
        )
      }
      )}
      <div class="card" style={{ width: '18rem' }}>

        <div class="card-body">
          <h5 class="card-title">{datosEnvio.name} {datosEnvio.lastname}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{datosEnvio.email}</h6>
          <hr />
          <h6 className="card-title">Enviando a:  {datosEnvio.adress}, {datosEnvio.pisoDepto}</h6>
          <h6 className="card-title">{datosEnvio.city}, {datosEnvio.prov}, {datosEnvio.CP} </h6>
          <hr />
          <button onClick={() => editarDatos()} class="card-link">Editar datos</button>
        </div>

        {editar && (
          <div>
            <form >
              <div class="form-group">
                <label for="inputAddress">Que dato desea editar?</label>
                <div class="form-group">
                  <select id="inputState" class="form-control" onChange={e => setCambio(e.target.value)} >
                    <option selected></option>
                    <option>name</option>
                    <option>lastname</option>
                    <option>email</option>
                    <option>adress</option>
                    <option>pisoDepto</option>
                    <option>city</option>
                  </select>
                </div>
                <input type="text" class="form-control" id="inputAddress" onChange={e => setNuevoDato(e.target.value)} placeholder="Ingrese el dato corregido" />
              </div>
              <button type='submit' onClick={() => editarDatos()}>Confirmar</button>
            </form>
          </div>
        )

        }
      </div>
      <hr />
      <h5>Total: ${datosEnvio.precioFinal}</h5>
      <hr />

      {!success &&
        <form onSubmit={pedirPago}>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Su tarjeta de credito</label>
            <select class="form-control" id="exampleFormControlSelect1">
              <option>Visa</option>
              <option>Mastercard</option>
              <option>American Express</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Nro de tarjeta</label>
            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="xxxx xxxx xxxx xxxx" />
          </div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="exampleFormControlSelect1">Fecha de vencimiento</label>
              <select class="form-control" id="exampleFormControlSelect1">
                <option>Enero</option>
                <option>Febrero</option>
                <option>Marzo</option>
                <option>Abril</option>
                <option>Mayonesa</option>
                <option>Junio</option>
                <option>Julio</option>
                <option>Agosto</option>
                <option>Septiembre</option>
                <option>Octubre</option>
                <option>Noviembre</option>
                <option>Diciembre</option>
              </select>
            </div>
            <div class="form-group col-md-2">
              <label for="exampleFormControlSelect1">Año</label>
              <select class="form-control" id="exampleFormControlSelect1">
                {years.map(year => (
                  <option>{year}</option>
                ))}
              </select>
            </div>
            <div class="form-group col-md-2">
              <label for="exampleFormControlInput1">CVV</label>
              <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="xxx" />
            </div>

          </div>
          <hr />
          {!waiting &&
            <button type="submit" class="btn btn-success">Pagar</button>
          }{
            waiting &&
            <div>

              <p>Procesando el pago...</p>
            </div>
          }
          <hr></hr>
        </form>
      }

      { showError &&
        <div>
          <hr />
          <h4>
            Hubo un error!
            </h4>
          <hr />
          <p>El pago no pudo ser procesado</p>
          <p>Puede intentar de nuevo o probar otro metodo de pago</p>
        </div>
      }
      { success &&
        <div>
          <hr />
          <h2>
            Compra exitosa!
            </h2>
          <hr />
          <p>Un mail le ha sido enviado con los detalles de su compra</p>
        </div>
      }
    </div>
  );



};


function mapStateToProps(state) {
  // console.log(state.auth);
  const { user, logged } = state.auth;
  return {
    user,
    logged,
    carrito: state.reducer.carrito,
    // precioFINAL: state.reducer.precioFINAL,
    datosEnvio: state.reducer.datosEnvio
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     // setTaste: taste => dispatch(setTaste(taste)),
//     editarUno: (payload) => dispatch(editarUno(payload))
//   }};


export default connect(mapStateToProps, null)(Pagos);


