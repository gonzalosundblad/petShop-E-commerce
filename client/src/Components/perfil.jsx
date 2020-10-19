import React from 'react';
import { useState, useEffect } from 'react';
import OrdenUsuario from '../Containers/ordenUsuario';
import {getUser, deleteUser, putUser} from '../Redux/actionsOrden'

export default function Perfil (id){
  const [state, setState] = useState({
      name: "",
      email: "",
      password: ""
  });
  const [users, setUsers] = useState([])

  const id2 = parseInt(id.id)
  var datos = []

  useEffect(() => {
    getUser().payload
    .then((resp) => {
      setUsers(resp.data)
    })
  }, [])

  function handle(){
    users.map((user) => {
      if(user.id === id2){
        datos = user;
      }});
  }
  handle()

  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e){
    e.preventDefault();
    const cambios =  {
      name: state.name,
      email: state.email,
      password: state.password
    }
    if(cambios.name.length === 0){cambios.name = datos.name}
    if(cambios.email.length === 0){cambios.email = datos.email}
    if(cambios.password.length === 0){cambios.password = datos.password}

    const id = datos.id
    putUser(id, cambios).payload
    .then(resp => {
      console.log(resp)
      reload()
    })
    }
    function reload(){
      window.location.reload()
    }

    function onDelete(){
      const id = datos.id
      deleteUser(id)
      .then(resp => {
        console.log(resp)
        reload()
      })
    }
    if(!datos.id){
      return(
        <div>
          <h1>Debes iniciar sesión o registrarte para ver tu perfil</h1>
          <a href="/register">Registrarme</a>
          <a href="/login">Iniciar Sesión</a>
        </div>
      )
    }else{
  return(
    <div>
        <h1>Bienvenido {datos.name} ! </h1>
        <h2>Tu email : {datos.email}  </h2>
            <div>
                <form onSubmit={handleSubmit}>
                  <div>
                <label>Nombre</label>
                  <input type="text" placeholder={datos.name} name="name" onChange={handleChange}/>
                <label>Email</label>
                  <input type="email" placeholder={datos.email} name="email" onChange={handleChange}/>
                <label>Password</label>
                  <input type="password" placeholder={datos.password} name="password" onChange={handleChange}/>
                <button type="submit" value="Actualizar">
                    Modificar datos
                </button>
                  </div>
              </form>
          </div>
          <button type="submit" onClick={onDelete} >
                    Eliminar Cuenta
          </button>
    </div>
  )
  }
 }
