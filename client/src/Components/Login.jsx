import React, { useState, useEffect } from 'react';
import estilo from '../Estilos/Login.module.css';
import imagen from '../imagenes/PerroYgatito.png';
import candado from '../imagenes/candado.png';
import email from '../imagenes/email.png';
import google from '../imagenes/google.png';
import GitHub from '../imagenes/gitHub.png';
import HenryPet from '../imagenes/HenryPet2.png';
import { loginRequest, getGoogle, getGithub, getMe } from '../Redux/actionsLogin';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { deleteCarrito, postCarrito, putCantidadOrden, deleteCarritoProd } from '../Redux/actionsCarrito';
import { clearState, loadState } from '../Redux/reducer/localStorage';

// function Login({ user, isLoggedIn, loginRequest, users, getGoogle, getGithub }) {
function Login({ user, carrito, isLoggedIn, logged, loginRequest, getGoogle, users, getGithub, getCarritoRequest, getMe }) {
  const [input, setInput] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({});
  var x = false;

  function validate(input) {
    let errors = {};
    if (!input.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
      errors.email = 'Email is invalid';
    }
    if (!input.password) {
      errors.password = 'Password is required';
    } else if (input.password.length < 4) {
      errors.password = 'Password is invalid';
    }
    return errors;
  };
  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));
  }

  function addProducts(){
    var local = loadState()
    if (local.length > 0) {
      local.map(prod => {
      const { product_id, quantity, price } = prod
      console.log(prod)
      postCarrito(user.user.user_id, {
        product_id,
        quantity,
        price
      })
    })

    clearState()
  }
}

  function handleLogin(e) {
    e.preventDefault();
  }
   function loginUser() {
    loginRequest(input)
    setTimeout(() => {
     if (logged){
       addProducts()
     }

    }, 500);
  }

  function loginGoogle() {
    getGoogle()
    window.location.replace("http://localhost:3001/auth/google")
  }
  function loginGithub() {
    getGithub()
    window.location.replace("http://localhost:3001/auth/github")


  }

  return (
    <div className={estilo.divOscuro}>

      <div className={estilo.divTodo}>
        <div>
          <img src={imagen} className={estilo.imagen} />
        </div>
        <div className={estilo.henryPet}>
          <img src={HenryPet} className={estilo.imgHenryPet} />
            <NavLink to="/">
              <button type="button" style={{marginRight: "10px"}} class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </NavLink>
        </div>
        <div className={estilo.divCuadro}>
          <div className={estilo.divIzquierda}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <form  >
                <fieldset>
                  <legend>Iniciar sesion:</legend>
                  <div class="form-group" style={{ display: "flex", alignItems: "center", margin: "10px" }}>
                    <svg width="23px" viewBox="0 0 16 16" class="bi bi-envelope-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                    </svg>
                    <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Ingrese su email" id="name" name="email" value={input.email} onChange={handleInputChange} />
                  </div>
                  <div class="form-group" style={{ display: "flex", alignItems: "center", margin: "10px" }}>
                    <svg width="23px" viewBox="0 0 16 16" class="bi bi-lock-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 9a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V9z" />
                      <path fill-rule="evenodd" d="M4.5 4a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z" />
                    </svg>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Contraseña" id="description" name="password" value={input.password} onChange={handleInputChange} />
                  </div>
                  {!logged ? <button type="button" onClick={loginUser} class="btn btn-outline-danger" style={{ margin: "10px" }}>Iniciar</button> : <Redirect to="/perfil" />}
                  {/* <button type="button" onClick={loginUser} class="btn btn-outline-danger" style={{ margin: "10px" }}>Iniciar</button> */}
                  <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}>
                    <a>¿No tiene cuenta?</a>
                    <NavLink to='/register'  style={{ margin: "10px" }}>Registrarse</NavLink>
                  </div>
                  <NavLink to='/forgot'  style={{ margin: "10px" }}>¿Olvidó su contraseña?</NavLink>
                </fieldset>
              </form>
            </div>
          </div>
          <div>
            <hr width="2" size="200" />
          </div>
          <div className={estilo.divDerecha}>
            <h3>Iniciar sesion con:</h3>
            <div >
              <button type="button" onClick={loginGoogle} class="btn btn-danger" style={{ margin: "10px" }}>
                <div style={{ display: "flex", width: "90px", justifyContent: "space-around", alignItems: "center" }}>
                  <img src={google} className={estilo.imgGoogle} />
                  <a>Google</a>
                </div>
              </button>

            </div>
            <div >
              <button type="button" onClick={loginGithub} class="btn btn-secondary" style={{ margin: "10px" }}>
                <div style={{ display: "flex", width: "90px", justifyContent: "space-around", alignItems: "center" }}>
                  <img src={GitHub} className={estilo.imgGoogle} />
                  <a>GitHub</a>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  // console.log(state.auth);
  const { user, logged } = state.auth;
  return {
    user, logged,
    carrito: state.reducer.carrito
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    // ...bindActionCreators({ loginRequest, getGithub, getGoogle }, dispatch)
    ...bindActionCreators({ loginRequest, getGithub, postCarrito, getGoogle, getMe }, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
