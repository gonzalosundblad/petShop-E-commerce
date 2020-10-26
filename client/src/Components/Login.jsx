import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { getUser } from '../Redux/actionsOrden';
import { Link } from 'react-router-dom'
import StyleLogin from '../Estilos/StyleLogin.module.css';
import estilo from '../Estilos/Login.module.css';
import imagen from '../imagenes/PerroYgatito.png';
import candado from '../imagenes/candado.png';
import email from '../imagenes/email.png';
import google from '../imagenes/google.png';
import GitHub from '../imagenes/gitHub.png';
import HenryPet from '../imagenes/HenryPet2.png';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { postLog, postLogin } from '../Redux/actionsLog'

function Login({ dispatch, user, isLoggedIn, postLog }) {
  const [input, setInput] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({});

  console.log(user)


  function validate(input) {
    let errors = {};
    if (!input.email) {
      errors.email = 'Email requerido';
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
      errors.email = 'Email invalido';
    }
    if (!input.password) {
      errors.password = 'Contraseña Requerida';
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
  function handleLogin(e) {
    e.preventDefault();
  }



  function loginUser() {
    postLog(input.email, input.password)
  }

  return (
    <div id='aparecer' className={estilo.divOscuro}>
      <div className={estilo.x}>
        <a href='/'>
          <span className={estilo.cerrar} > X </span>
        </a>
      </div>
      <div className={estilo.divTodo}>
        <div>
          <img src={imagen} className={estilo.imagen} />
        </div>
        <div className={estilo.henryPet}>
          <img src={HenryPet} className={estilo.imgHenryPet} />
        </div>
        <div className={estilo.divCuadro}>
          <div className={estilo.divIzquierda}>
            <h2>Iniciar Sesion</h2>
            <Form.Row className={estilo.formRow}>
              <Form.Group className={estilo.inputYlabel} as={Col} controlId="formGridEmail">
                <img src={email} className={estilo.icono} />
                <Form.Control className={estilo.input} value={input.email} type="email" onChange={handleInputChange} placeholder="Introduzca el email" name="email" />
              </Form.Group>
              {errors.email && (<h4 className="danger"> {errors.email} </h4>)}
              <Form.Group className={estilo.inputYlabel} as={Col} controlId="formGridPassword">
                <img src={candado} className={estilo.icono} />
                <Form.Control className={estilo.input} value={input.password} onChange={handleInputChange} type="password" placeholder="Contraseña" name="password" />
              </Form.Group>
              {errors.password && (<h4 className="danger">{errors.password}</h4>)}
            </Form.Row>
            <Button className={estilo.boton} variant="primary" type="button" onClick={loginUser}> Iniciar </Button>
            <div className={estilo.divAbajo}>
              <h3>¿No tenes cuenta?</h3>
              <a href='/register'>
                <span  >Registrate</span>
              </a>
            </div>
            <a href='/reset'>
              <span >Olvidé mi contraseña</span>
            </a>
          </div>
          <div>
            <hr width="2" size="200" />
          </div>
          <div className={estilo.divDerecha}>
            <h3>Iniciar sesion con:</h3>
            <div className={estilo.google}>
              <img src={google} className={estilo.imgGoogle} />
              <h5>Iniciar con Google</h5>
            </div>
            <div className={estilo.gitHub}>
              <img src={GitHub} className={estilo.imgGitHub} />
              <h5>Iniciar con GitHub</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  console.log(state.auth)
  return {

  }
}
const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    ...bindActionCreators({ postLog }, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
