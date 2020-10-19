import React from 'react'
import { useState, useEffect } from 'react'
import { getProdOrder } from '../Redux/actionsCarrito'
import Estilo from '../Estilos/forms.module.css'

export default function OrdenAdmin(id) {
  const [orderUser, setOrderUser] = useState([])

  const id2 = id.id - 1

  console.log(id2)

  useEffect(() => {
    getProdOrder(2).payload
    .then(res => {
      if(!res.data[0]){
        alert('No hay Ordenes')
      }else{
        console.log(res.data)
        setOrderUser(res.data[id2].products)
      }
    })
  }, [])
  
  // console.log(orderUser)

  return(
    <div>
      <div>
        { orderUser && orderUser.map(encontrado =>{
          return(
              <form key={encontrado.id} className={Estilo.resultado} >
              <label>Id Producto:</label>
              <input type="text" value={encontrado.id} className={Estilo.inputs} />
              <label>Estado de Orden:</label>
              <input type="text" value="creada" className={Estilo.inputs} />
              <label>Producto: </label>
              <input type="text" value={encontrado.name} className={Estilo.inputs} />
              <label>Cantidad:</label>
              <input type="text" value={encontrado.LineaDeOrden.quantity} className={Estilo.inputs} />
              <label>Precio:</label>
              <input type="text" value={encontrado.price} className={Estilo.inputs} />
            </form>
            )
        })

        }
      </div>
    </div>
  )
}