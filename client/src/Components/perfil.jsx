import React from 'react';
import { useState, useEffect } from 'react';
import OrdenUsuario from '../Containers/ordenUsuario';
import {getUser, deleteUser, putUser} from '../Redux/actionsOrden'
import Estilo from '../Estilos/Perfil.module.css'

export default function Perfil (id, user){
  const [state, setState] = useState({
      name: "",
      email: "",
      password: "",
      oldPassword: ""
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
      password: state.password,
      oldPassword: state.oldPassword
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
    <div className={Estilo.productoGrande} >
        <h1 className={Estilo.bienvenido} >Bienvenido {datos.name} ! </h1>
        <h2 className={Estilo.producto} >Tu email : {datos.email}  </h2>
            <div>
                <form onSubmit={handleSubmit}>
                  <div>
                    <div  className={Estilo.nombre}>
                      <label >Nombre:</label>
                      <input type="text" placeholder={datos.name} name="name" onChange={handleChange} className={Estilo.nombre2}/>
                    </div>
                    <div className={Estilo.email}>
                      <label>Email:</label>
                      <input type="email" placeholder={datos.email} name="email" onChange={handleChange} className={Estilo.email2}/>
                    </div>
                    <div className={Estilo.password}>
                      <label>Contraseña vieja(tenga en cuenta que si no es correcta la vieja contraseña, esta no se modificara):</label>
                      <input type="text" placeholder="Ingrese antigua contraseña" name="oldPassword" onChange={handleChange} className={Estilo.password2} />
                    </div>
                    <div>
                      <label>Nueva Contraseña:</label>
                      <input type="text" placeholder="Ingrese nueva contraseña"  name="password" onChange={handleChange} className={Estilo.password2} />
                    </div>

                    <div className={Estilo.botonesFinales} >
                      <button type="submit" value="Actualizar" className={Estilo.botoncitos} >
                        Modificar datos
                      </button>
                      <button type="submit" onClick={onDelete} className={Estilo.botoncitos2}  >
                        Eliminar Cuenta
                      </button>
                    </div>
                  </div>
                </form>
          </div>
    </div>
  )
  }
 }
