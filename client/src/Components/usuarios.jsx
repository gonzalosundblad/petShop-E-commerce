import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getUser } from '../Redux/actionsOrden';
import Estilo from '../Estilos/forms.module.css';
import { postAdmin } from '../Redux/actionsLog';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

function Usuarios({ getUser, users }) {



  useEffect(() => {
    getUser()
  }, [])

  console.log(users)
  function handleSubmit(e) {
    e.preventDefault()
  }

  function admin(e) {
    const id = e.target.value;
    postAdmin(id)
    window.location.reload()
  }

  return (
    <div className={Estilo.forms} > {
      users && users.map(encontrado => {
        return (
          <form className={Estilo.resultado} key={encontrado.user_id} onSubmit={handleSubmit}>
            <label>Id Usuario:</label>
            <input type="text" value={encontrado.user_id} className={Estilo.inputs} />
            <label>Nombre Usuario:</label>
            <input type="text" value={encontrado.name} className={Estilo.inputs} />
            <label>Email:</label>
            <input type="text" value={encontrado.email} className={Estilo.inputs} />
            <label>Rol:</label>
            <input type="text" value={encontrado.role} className={Estilo.inputs} />
            <button value={encontrado.user_id} onClick={admin} >Admin</button>
          </form>
        )
      })
    }
    </div>
  )
}


const mapStateToProps = state => {
  return {
    users: state.reducer.users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ getUser }, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Usuarios)
