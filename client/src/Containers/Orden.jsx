import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
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
    <div> {
    productGuardados && productGuardados.map(encontrado => {
        return (
          <form key={encontrado.id}>
          <label>Id orden:</label>
          <input type="text" value={encontrado.id} />
          <label>Estado de Orden:</label>
          <input type="text" value={encontrado.orderState} />
          <label>Id usuario:</label>
          <input type="text" value={encontrado.userId} />
        </form>
        )
    })
   }
</div>
  )
}
