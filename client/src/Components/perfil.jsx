import React from 'react';
import { useState, useEffect } from 'react';
import { getUser, deleteUser, putUser } from '../Redux/actionsOrden'
import { connect } from 'react-redux'
import { getMe } from '../Redux/actionsLogin'
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../Redux/actionsLogin';
import { postCarrito } from '../Redux/actionsCarrito';
import { clearState, loadState } from '../Redux/reducer/localStorage';

function Perfil({ putUser, deleteUser, getMe, user, users, getUser, postCarrito, logged}) {
  const [state, setState] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
    oldPassword: ""
  });
  
  function addProducts(){
    var local = loadState()
    if (local.length > 0) {
      local.map(prod => {
      const { product_id, quantity, price } = prod
      console.log(user)
      if(user){
         postCarrito(user.user_id, {
          product_id,
          quantity,
          price
        })

      }
      clearState()  
    })

  }
}
  useEffect(() => {
    getMe();
    addProducts();
  }, [])



  // var userN;
  // if(user){
  //   userN = user.user
  // }

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
      last_name: state.last_name,
      email: state.email,
      newPassword: state.password,
      password: state.oldPassword
    }
    if (cambios.name.length === 0) { cambios.name = user.name }
    if (cambios.email.length === 0) { cambios.email = user.email }
    if (cambios.last_name.length === 0) { cambios.last_name = user.last_name }

    putUser(user.user_id, cambios)

  }

  function onDelete() {
    const id = user.user_id
    deleteUser(id)
  }

  if (!user) {
    return (
      <div>
        <h1>Debes iniciar sesión o registrarte para ver tu perfil</h1>
        <NavLink href="/register">Registrarme</NavLink>
        <NavLink href="/login">Iniciar Sesión</NavLink>
      </div>
    )
  } else {
    return (
      <div>
        <h1 style={{ margin: "40px", display: "flex" }}>Bienvenido {user.name} ! </h1>
        <div class="row" style={{ margin: "40px" }}>
          <div class="col-3" >
            <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical" style={{ width: "180px" }}>
              <a class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Perfil</a>
              <a class="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Modificar Datos</a>
              <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Cambiar Contraseña</a>
              <a class="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Salir</a>
            </div>
          </div>
          <div class="col-9">
            <div class="tab-content" id="v-pills-tabContent">

              <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                <table class="table table-hover" style={{ width: "500px", border: "1px solid gray" }}>
                  <tbody>
                    <tr class="table-default">
                      <th scope="row">Nombre:</th>
                      <td>{user.name}</td>
                    </tr>
                    <tr class="table-default">
                      <th scope="row">Apellido:</th>
                      <td>{user.last_name}</td>
                    </tr>
                    <tr class="table-default">
                      <th scope="row">Tu email:</th>
                      <td>{user.email}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                <form style={{ width: "500px" }}>
                  <fieldset>
                    <legend>Modifica tus datos:</legend>
                    <div class="form-group" style={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
                      <label for="exampleInputEmail1">Nombre</label>
                      <input type="text" class="form-control" name="name" onChange={handleChange} aria-describedby="emailHelp" placeholder="Nuevo Nombre" />
                    </div>
                    <div class="form-group" style={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
                      <label for="exampleInputEmail1">Apellido</label>
                      <input type="text" class="form-control" name="lastName" onChange={handleChange} aria-describedby="emailHelp" placeholder="Nuevo Apellido" />
                    </div>
                    <div class="form-group" style={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
                      <label for="exampleInputEmail1">Email</label>
                      <input type="email" class="form-control" name="email" onChange={handleChange} aria-describedby="emailHelp" placeholder="Nuevo email" />
                    </div>
                    <button onClick={handleSubmit} class="btn btn-success"> Modificar datos </button>
                  </fieldset>
                </form>
              </div>

              <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                <form style={{ width: "500px" }}>
                  <fieldset>
                    <legend>Cambiar Contraseña:</legend>
                    <div class="form-group" style={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
                      <label for="exampleInputEmail1">Contraseña:</label>
                      <input type="password" class="form-control" name="oldPassword" onChange={handleChange} aria-describedby="emailHelp" placeholder="Contraseña Actual" />
                    </div>
                    <div class="form-group" style={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
                      <label for="exampleInputEmail1">Nueva Contraseña:</label>
                      <input type="password" class="form-control" name="password" onChange={handleChange} aria-describedby="emailHelp" placeholder="Nueva Contraseña" />
                    </div>
                    <button onClick={handleSubmit} class="btn btn-success"> Cambiar Contraseña </button>
                  </fieldset>
                </form>
              </div>

              <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab" style={{ width: "500px" }}>
                <button onClick={onDelete} class="btn btn-danger" style={{ margin: "30px" }} > Eliminar Cuenta </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    users: state.reducer.users,
    logged: state.reducer.logged
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ putUser, deleteUser, getMe, postCarrito }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);