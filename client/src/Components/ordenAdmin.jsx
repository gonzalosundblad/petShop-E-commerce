import React from 'react'
import { useState, useEffect } from 'react'
import { getProdOrder } from '../Redux/actionsCarrito'
import Estilo from '../Estilos/ordenesUsuario.module.css'

export default function OrdenAdmin(id, idUser) {
  const [orderUser, setOrderUser] = useState([])

  const id2 = id.id - 1

  console.log(id2)

  if (!idUser.id) {
    idUser = 1
  }

  useEffect(() => {
    getProdOrder(idUser).payload
      .then(res => {
        if (!res.data[0]) {
          alert('No hay Ordenes')
        } else {
          console.log(res.data)
          setOrderUser(res.data[id2].products)
        }
      })
  }, [])

  var precio = orderUser.map(e => e.price * e.LineaDeOrden.quantity)

  // console.log(precio)
  var total = precio.reduce(function (a, b) {
    return a + b
  }, 0)


  return (
    <div>
      <div  >
        {orderUser && orderUser.map(encontrado => {
          return (
            <form key={encontrado.id} className={Estilo.producto} >
              <label>Id Producto:</label>
              <input type="text" value={encontrado.id} />
              <label>Estado de Orden:</label>
              <input type="text" value="creada" />
              <label>Producto: </label>
              <input type="text" value={encontrado.name} />
              <label>Cantidad:</label>
              <input type="text" value={encontrado.LineaDeOrden.quantity} />
              <label>Precio por unidad:</label>
              <input type="text" value={encontrado.price} />
              <label>Precio Total:</label>
              <input type="text" value={encontrado.price * encontrado.LineaDeOrden.quantity} />
            </form>
          )
        })
        }
        <div>
          <h2>Total de Orden: {total} </h2>
        </div>
      </div>
    </div>
  )
}