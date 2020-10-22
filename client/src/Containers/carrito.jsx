import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { deleteCarrito, getCarrito, putCantidadOrden, deleteCarritoUno } from '../Redux/actionsCarrito';
import Estilo from '../Estilos/ProductoCarrito.module.css';
import ProductoCarrito from '../Components/ProductoCarrito';

export default function Carrito() {
  const [products, setProducts] = useState([])
  const [state, setState] = useState()
  const [borrado, setBorrado] = useState([])


  useEffect(() => {
    getCarrito(2).payload
      .then(res => {
        if (!res.data[0]) {
          console.log("agregar")
        }
        else {
          setProducts(res.data[0].products)
        }
      })
  }, [])


  function reload() {
    window.location.reload()
  }

  function vaciar() {
    deleteCarrito(2).then(resp => {
      reload()
    })
  }
  function onDelete() {
    // console.log(e)
    // const f = (element) => element.id == e.target.value
    // let index =  products.findIndex(f)
    // // setBorrado(products.splice(index, 1))
    // var borrado = products.splice(index, 1)

    var product_id = 2

    //Hasta aca, capturo el id del producto pero cuando lo envio no me hace el delete.
    deleteCarritoUno(2, product_id)
      .then(resp => {
        console.log(resp)
      })
  }


  const order_id = products.map(id => id.LineaDeOrden.order_id)


  if (!products || products.length === 0) {
    return (
      <div>
        <h1>Agregar productos al carrito</h1>
        <a href="/products">Ir al Catálogo</a>
      </div>
    )
  } else {
    console.log('hay productos')

    return (
      <div>
        <div className={Estilo.tusProductos}>
          <h2 >Tus productos</h2>
        </div>
        {products && products.map(e => {
          console.log(products)
          return (
            <div>
              <ProductoCarrito
                id={e.id}
                name={e.name}
                price={e.price}
                image={e.image}
                LineaDeOrden={e.LineaDeOrden.quantity}
                funcionDelete={onDelete}
              />
            </div>
          )
        }
        )
        }
        <div className={Estilo.botonesFinales}>
          <button className={Estilo.botonVaciarCart} onClick={vaciar} >Vaciar Carrito</button>
          <a className={Estilo.botonesFinales} href='/products'>
            <span className={Estilo.botoncitos} >Seguir Comprando</span>
          </a>
          <a className={Estilo.botonesFinales} href={`/order/${order_id[0]}`} >
            <span className={Estilo.botoncitos}  >Finalizar Compra</span>
          </a>
        </div>
      </div>
    )
  }
}
