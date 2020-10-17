import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getUser } from '../Redux/actionsOrden'

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
    <div> {
    productsGuardados && productsGuardados.map(encontrado => {
        return (
          <form key={encontrado.id}>
          <label>Id Usuario:</label>
          <input type="text" value={encontrado.id} />
          <label>Nombre Usuario:</label>
          <input type="text" value={encontrado.name} />
          <label>Email:</label>
          <input type="text" value={encontrado.email} />
        </form>
        )
    })
   }
</div>
  )
}
