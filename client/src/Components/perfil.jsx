import React from 'react';
import { useState, useEffect } from 'react';
import OrdenUsuario from '../Containers/ordenUsuario';
import { getMe, getUser } from '../Redux/actionsLog'
import { putUser, deleteUser } from '../Redux/actionsOrden'
import Estilo from '../Estilos/Perfil.module.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function Perfil({ user }) {
  const [state, setState] = useState({
    id: "",
    name: "",
    email: "",
    newPassword: "",
    password: "",
    last_name: ""
  });
  const [users, setUsers] = useState([])


  useEffect(() => {
    getMe()
  }, [])

  console.log(getMe())
  console.log(user)


  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }
  //name, email, password, newPassword, last_name

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const cambios = {
      name: state.name,
      email: state.email,
      password: state.password,
      newPassword: state.newPassword
    }
    if (cambios.name.length === 0) { cambios.name = users.name }
    if (cambios.email.length === 0) { cambios.email = users.email }
    if (cambios.password.length === 0) { cambios.password = users.password }
    putUser(users.user_id, cambios).payload
      .then(resp => {
        console.log(resp)
        reload()
      })
  }
  function reload() {
    window.location.reload()
  }
  function onDelete() {
    const id = users.user_id
    deleteUser(id)
      .then(resp => {
        console.log(resp)
        reload()
      })
  }



  return (
    <div className={Estilo.productoGrande} >
      <h1 className={Estilo.bienvenido} >Bienvenido {users.name}  </h1>
      <h2 className={Estilo.producto} >Tu email : {users.email}  </h2>
      <div>
        <form>
          <div>
            <div className={Estilo.nombre}>
              <label >Nombre:</label>
              <input type="text" name="name" className={Estilo.nombre2} placeholder={users.name} onChange={handleChange} />
            </div>
            <div className={Estilo.nombre}>
              <label >Apellido:</label>
              <input type="text" name="name" className={Estilo.nombre2} placeholder={users.last_name} onChange={handleChange} />
            </div>
            <div className={Estilo.email}>
              <label>Email:</label>
              <input type="email" name="email" className={Estilo.email2} placeholder={users.email} onChange={handleChange} />
            </div>
            <div className={Estilo.password}>
              <label>Contraseña:</label>
              <input type="password" placeholder="Ingrese antigua contraseña" name="oldPassword" className={Estilo.password2} placeholder="*******" onChange={handleChange} />
            </div>
            <div>
              <label>Nueva Contraseña:</label>
              <input type="password" placeholder="Ingrese nueva contraseña" name="password" className={Estilo.password2} placeholder="*******" onChange={handleChange} />
            </div>

            <div className={Estilo.botonesFinales} >
              <button type="submit" value="Actualizar" className={Estilo.botoncitos} onClick={handleSubmit} >
                Modificar datos
                      </button>
              <button type="submit" className={Estilo.botoncitos2} onClick={onDelete} >
                Eliminar Cuenta
                      </button>
            </div>
          </div>
        </form>
      </div>
    </div >
  )
}

const mapStateToProps = state => {
  console.log(state.auth.user);
  return {
    user: state.reducer.users
  }
}
// const mapDispatchToProps = dispatch => {
//   return {
//     dispatch,
//     ...bindActionCreators({getAllReviewsRequest}, dispatch)
//   }
// }

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ getMe }, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Perfil)