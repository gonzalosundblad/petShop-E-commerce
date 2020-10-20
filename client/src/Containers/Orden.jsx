import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Estilo from '../Estilos/forms.module.css'
import { getOrder } from '../Redux/actionsOrden'

export default function Ordenes (){
  const [productGuardados, setProductGuardados] = useState([])


  useEffect(() => {
    getOrder().payload
    .then(res => {
      console.log(res.data)
      setProductGuardados(res.data)
    })
  }, [])

  return(
    <div className={Estilo.forms} > {
    productGuardados && productGuardados.map(encontrado => {
        return (
          <form key={encontrado.id} className={Estilo.resultado} >
          <label>Id orden:</label>
          <input type="text" value={encontrado.id} className={Estilo.inputs} />
          <label>Estado de Orden:</label>
          <input type="text" value={encontrado.orderState} className={Estilo.inputs} />
          <label>Id usuario:</label>
          <input type="text" value={encontrado.userId} className={Estilo.inputs} />
        </form>
        )
    })
   }
</div>
  )
}
