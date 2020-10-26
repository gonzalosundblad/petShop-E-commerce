import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getUser } from '../Redux/actionsOrden';
import Estilo from '../Estilos/forms.module.css';
import { postAdmin } from '../Redux/actionsLog';

export default function Usuarios() {
  const [productsGuardados, setProductsGuardados] = useState([])


  useEffect(() => {
    getUser().payload
      .then(res => {
        console.log(res.data)
        setProductsGuardados(res.data)
      })
  }, [])

  function admin(e) {
    const id = e.target.value;
    postAdmin(id)
  }

  return (
    <div className={Estilo.forms} > {
      productsGuardados && productsGuardados.map(encontrado => {
        return (
          <form className={Estilo.resultado} key={encontrado.user_id}>
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
