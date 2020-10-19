import React, {useState} from 'react';
import {postUser} from '../Redux/actions';



export function AgregarUsuario() {                  //agrega usuario
    const [ nombre, setNombre] = useState([]);
    const [ email, setEmail] = useState([])
    const [ contraseña, setContraseña] = useState([])
    const [errors, setErrors] = useState({});

function validate(input) {
  console.log(input);
      let errors = {};
      if (nombre.length === 0) {
        errors.nombre = 'Username is required';
      }
      if (!email) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Email is invalid';
      }
      if (!contraseña) {
        errors.contraseña = 'Password is required';
      } else if (!/(?=.*[0-8])/.test(contraseña)) {
        errors.contraseña = 'Password is invalid';
      }
      return errors;
    };

    function handleChange (event){
      console.log(event.target.value);
      setNombre( event.target.value );
      setErrors(validate( nombre )
      );
      }
    function handleChange2 (event){
      console.log(event.target.value);
      setEmail( event.target.value );
      setErrors(validate(email ));
      }
    function handleChange3 (event){
      console.log(event.target.value);
        setContraseña( event.target.value );
        setErrors(validate(contraseña));
        }
    function handleSubmit (event){
      event.preventDefault();

       const usuario = {
         name: nombre,
         email: email,
         password: contraseña
      };


      postUser(usuario).payload
      .then(function(resp){
        borrarInput()
      })


    }
    function borrarInput(){
      document.getElementById("nombre").value = "";
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
    }


  return (
    <div>
      <form id="miForm">
        <label>Nombre: </label>
          <input id="nombre" type="text" name="nombre" onChange={handleChange} />
          {errors.nombre && (
          <h4 className="danger">{errors.nombre}</h4>
         )}
          <label>Email: </label>
          <input id="email" type="email" description="email" onChange={handleChange2} />
          {errors.email && (
          <h4 className="danger">{errors.email}</h4>
         )}
          <label>Contraseña: </label>
          <input id="password" type="password" description="password" onChange={handleChange3} />
          {errors.contraseña && (
          <h4 className="danger">{errors.contraseña}</h4>
         )}
        <button onClick={handleSubmit} >Agregar</button>
      </form>
    </div>
  )
  }