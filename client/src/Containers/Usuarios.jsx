import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { postUser } from '../Redux/actionsOrden';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import estilo from '../Estilos/Login.module.css';
import imagen from '../imagenes/PerroYgatito.png';
import HenryPet from '../imagenes/HenryPet2.png';

export function AgregarUsuario({ postUser }) {                  //agrega usuario
  const [nombre, setNombre] = useState([]);
  const [apellido, setApellido] = useState([]);
  const [email, setEmail] = useState([])
  const [contraseña, setContraseña] = useState([])
  const [errors, setErrors] = useState({});

  function validate(input) {
    let errors = {};
    if (nombre.length === 0) {
      errors.nombre = 'El nombre es requerido';
    }
    if (apellido.length === 0) {
      errors.nombre = 'El apellido es requerido';
    }
    if (!email) {
      errors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email invalido';
    }
    if (!contraseña) {
      errors.contraseña = 'La contraseña es requerida';
    } else if (!/(?=.*[0-8])/.test(contraseña)) {
      errors.contraseña = 'Contraseña invalida';
    }
    return errors;
  };

  function handleChange(event) {
    setNombre(event.target.value);
    setErrors(validate(nombre));
  }
  function handleChange4(event) {
    setApellido(event.target.value);
    setErrors(validate(apellido));
  }
  function handleChange2(event) {
    setEmail(event.target.value);
    setErrors(validate(email));
  }
  function handleChange3(event) {
    setContraseña(event.target.value);
    setErrors(validate(contraseña));
  }
  
  function handleSubmit(event) {
    event.preventDefault();

    const usuario = {
      name: nombre,
      last_name: apellido,
      email: email,
      password: contraseña
    };


    postUser(usuario)


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
          <div className={estilo.cuadroRegister}>
            <legend>Registrarse:</legend>
            <form id="miForm">
              <div className={estilo.inputsRegister}>
                <label>Nombre: </label>
                <input id="nombre" class="form-control" style={{width: "200px", height: "35px"}} type="text" name="nombre" onChange={handleChange} />
                {errors.nombre && (
                  <h4 className="danger">{errors.nombre}</h4>
                )}
              </div>
              <div className={estilo.inputsRegister}>
                <label>Apellido: </label>
                <input id="apellido" class="form-control" style={{width: "200px", height: "35px"}} type="text" name="apellido" onChange={handleChange4} />
                {errors.apellido && (
                  <h4 className="danger">{errors.apellido}</h4>
                )}
              </div>
              <div className={estilo.inputsRegister}>
                <label>Email: </label>
                <input id="email" class="form-control" style={{width: "200px", height: "35px"}} type="email" description="email" onChange={handleChange2} />
                {errors.email && (
                  <h4 className="danger">{errors.email}</h4>
                )}
              </div>
              <div className={estilo.inputsRegister}>
                <label>Contraseña: </label>
                <input id="password" class="form-control" style={{width: "200px", height: "35px"}} type="password" description="password" onChange={handleChange3} />
                {errors.contraseña && (
                  <h4 className="danger">{errors.contraseña}</h4>
                )}
              </div>
              <button class="btn btn-outline-danger"onClick={handleSubmit} >Agregar</button>
            </form>
          </div>  
        </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    products: state.reducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ postUser }, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgregarUsuario)
