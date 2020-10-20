import React from 'react'
import { useState, useEffect } from 'react'
import { getProdOrder } from '../Redux/actionsCarrito'
import Estilo from '../Estilos/ordenesUsuario.module.css'

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
  

  return(
    <div>
      <div  >
        { orderUser && orderUser.map(encontrado =>{
          return(
              <form key={encontrado.id} className={Estilo.producto} >
              <label>Id Producto:</label>
              <input type="text" value={encontrado.id}/>
              <label>Estado de Orden:</label>
              <input type="text" value="creada"/>
              <label>Producto: </label>
              <input type="text" value={encontrado.name}/>
              <label>Cantidad:</label>
              <input type="text" value={encontrado.LineaDeOrden.quantity} />
              <label>Precio:</label>
              <input type="text" value={encontrado.price}/>
            </form>
            )
        })

        }
      </div>
    </div>
  )
}