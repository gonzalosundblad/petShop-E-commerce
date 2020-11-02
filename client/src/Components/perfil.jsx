import React from 'react';
import { useState, useEffect } from 'react';
import OrdenUsuario from '../Containers/ordenUsuario';
import { getUser, deleteUser, putUser } from '../Redux/actionsOrden'
import Estilo from '../Estilos/Perfil.module.css'
import { connect } from 'react-redux'
import { getMe } from '../Redux/actionsLogin'
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';

function Perfil({ putUser, deleteUser, getMe, user, users, getUser }) {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    oldPassword: ""
  });

  useEffect(() => {
    getMe();
  }, [])


  function handle() {
    // users.map((user) => {
    //   if(user.id === id2){
    //     datos = user;
    //   }});
  }
  handle()

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }
  //name, email, password, newPassword, last_name


  function handleSubmit(e) {
    e.preventDefault();
    const cambios = {
      name: state.name,
      email: state.email,
      newPassword: state.password,
      password: state.oldPassword
    }
    if (cambios.name.length === 0) { cambios.name = user.name }
    if (cambios.email.length === 0) { cambios.email = user.email }



    putUser(user.user_id, cambios)

  }

  function onDelete() {
    const id = user.user_id
    deleteUser(id)
  }
  if (user === null) {
    return (
      <div>
        <h1>Debes iniciar sesión o registrarte para ver tu perfil</h1>
        <NavLink href="/register">Registrarme</NavLink>
        <NavLink href="/login">Iniciar Sesión</NavLink>
      </div>
    )
  } else {
    return (
      <div className={Estilo.productoGrande} >
        <h1 className={Estilo.bienvenido} >Bienvenido {user.name} ! </h1>
        <h2 className={Estilo.producto} >Tu email : {user.email}  </h2>
        <div>
          <form >
            <div>
              <div className={Estilo.nombre}>
                <label >Nombre:</label>
                <input type="text" placeholder={user.name} name="name" onChange={handleChange} className={Estilo.nombre2} />
              </div>
              <div className={Estilo.email}>
                <label>Email:</label>
                <input type="email" placeholder={user.email} name="email" onChange={handleChange} className={Estilo.email2} />
              </div>
              <div className={Estilo.password}>
                <label>Contraseña vieja(tenga en cuenta que si no es correcta la vieja contraseña, esta no se modificara):</label>
                <input type="password" placeholder="Ingrese antigua contraseña" name="oldPassword" onChange={handleChange} className={Estilo.password2} />
              </div>
              <div>
                <label>Nueva Contraseña:</label>
                <input type="password" placeholder="Ingrese nueva contraseña" name="password" onChange={handleChange} className={Estilo.password2} />
              </div>

              <div className={Estilo.botonesFinales} >
                <button onClick={handleSubmit} className={Estilo.botoncitos} >
                  Modificar datos
                      </button>
                <button onClick={onDelete} className={Estilo.botoncitos2}  >
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
function mapStateToProps(state) {
  return {
    user: state.auth.user,
    users: state.reducer.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ putUser, deleteUser, getMe }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);
