import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Estilo from '../Estilos/forms.module.css'
import { getOrder } from '../Redux/actionsOrden'
import {getCarrito} from '../Redux/actionsCarrito'

export default function Ordenes (){
  const [orderGuardada, setOrderGuardada] = useState([])
  const [productOrder, setProductOrder] = useState([])


  useEffect(() => {
    getOrder().payload
    .then(res => {
      console.log(res.data)
      setOrderGuardada(res.data)
    })
  }, [])


  

  return(
    <div>
      <div className={Estilo.forms} > {
      orderGuardada && orderGuardada.map(encontrado => {
          return (
            <form key={encontrado.id} className={Estilo.resultado} >
            <label>Id orden:</label>
            <input type="text" value={encontrado.id} className={Estilo.inputs} />
            <label>Estado de Orden:</label>
            <input type="text" value={encontrado.orderState} className={Estilo.inputs} />
            <label>Id usuario:</label>
            <input type="text" value={encontrado.userId} className={Estilo.inputs} />
            {encontrado.orderState === 'creada' ? <a href={`/admin/ordenes/${encontrado.id}`}>Ver Orden</a> : null }
          </form>
          )
      })
     }
    </div>
</div>
  )
}
