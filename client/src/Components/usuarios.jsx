import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getUser } from '../Redux/actionsOrden'
import Estilo from '../Estilos/forms.module.css'

export default function Usuarios (){
  const [productsGuardados, setProductsGuardados] = useState([])


  useEffect(() => {
    getUser().payload
    .then(res => {
      console.log(res.data)
      setProductsGuardados(res.data)
    })
  }, [])

  return(
    <div className={Estilo.forms} > {
    productsGuardados && productsGuardados.map(encontrado => {
        return (
          <form className={Estilo.resultado} key={encontrado.id}>
          <label>Id Usuario:</label>
          <input type="text" value={encontrado.id} className={Estilo.inputs} />
          <label>Nombre Usuario:</label>
          <input type="text" value={encontrado.name} className={Estilo.inputs}  />
          <label>Email:</label>
          <input type="text" value={encontrado.email} className={Estilo.inputs}  />
        </form>
        )
    })
   }
</div>
  )
}
