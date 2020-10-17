import React, {useState} from 'react';
import {postUser} from '../Redux/actions';

export function AgregarUsuario() {                  //agrega usuario
    const [ nombre, setNombre] = useState([]);
    const [ email, setEmail] = useState([])
    const [ contraseña, setContraseña] = useState([])
  
    function handleChange (event){
      setNombre( event.target.value );
    }
   
    function handleChange2 (event){
      setEmail( event.target.value )
    }

    function handleChange3 (event){
        setContraseña( event.target.value )
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
        console.log(resp.data);
        borrarInput()
      })
  
      
    }
    function borrarInput(){
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
    }
    
   
  return (
    <div>
      <form id="miForm" onSubmit={handleSubmit}>
        <label>Nombre: </label>
          <input id="name" type="text" name="name" onChange={handleChange} />
          <label>Email: </label>
          <input id="description" type="text" description="email" onChange={handleChange2} />
          <label>Contraseña: </label>
          <input id="description" type="text" description="password" onChange={handleChange3} />
        <button type="submit">Agregar</button>
      </form>
    </div>
  )
  };
  
  
  