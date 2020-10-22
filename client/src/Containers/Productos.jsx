import React, { useState, useEffect } from "react";
import axios from 'axios';
import {putId, getProductsRequest, deleteProduct, getCategories } from '../Redux/actions.js'
import { Form, Col, Row, Button, Carousel } from 'react-bootstrap';
import Estilo from '../Estilos/ModificarProd.module.css'
import Estilos from '../Estilos/AgregarProd.module.css'
import firebase, { storage } from 'firebase';
import {connect} from 'react-redux'


export function ModificayBorra({products}) {    //modifica y borra producto
  const [state, setState] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    stock: ""
  });
  const [prodGuardados, setProdGuardados] = useState([])

  useEffect(() => {
    getProductsRequest()
    console.log('useEffect');
    setProdGuardados(products)
  }, []);

 function handleChange(e){
     setState({
         ...state,
         [e.target.name]: e.target.value,
     });
 }


 function handleSubmit (event) {
   event.preventDefault();
   const cambios =  {
     key: state.id,
     name: state.name,
     description: state.description,
     price: state.price,
     stock: state.stock
       }
       }
   function modificar(e){
        const id = parseInt(state.id)
        var cambio = {
          description: state.description,
          id: state.id,
          name: state.name,
          price: state.price,
          stock: state.stock
        }
     putId(id, cambio)
     .then( resp => {
       console.log(resp)
       reload()
   })}

  function borrarInput(){
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
    document.getElementById("stock").value = "";
  }
  function reload() {
    window.location.reload()
  }


  function delet() {
    deleteProduct(state.id).then(resp => {
      console.log(resp)
      reload()
    })
  }

 return (
   <div>
     <div className={Estilo.forms}>
        <div>
            <h3>Lista de productos disponibles para modificar/eliminar</h3>
        </div>
        <div className={Estilo.titulos}>
          <h1>ID</h1>
          <h1>Nombre</h1>
          <h1>Descripcion</h1>
          <h1>Precio</h1>
          <h1>Stock</h1>
        </div>
        <div>
            {
            prodGuardados && prodGuardados.map(encontrado => {
              return (
                <div >
                  <form key={encontrado.id} >
                    <div className={Estilo.labelInput}>
                      <div >
                        <input className={Estilo.inputId} type="text" value={encontrado.id}  />
                      </div>
                      <div >
                        <input className={Estilo.inputNombre} type="text" value={encontrado.name}  />
                      </div>
                      <div>
                        <input className={Estilo.inputNombre}  type="text" value={encontrado.description} />
                      </div>
                      <div>
                        <input className={Estilo.inputPrecio} type="text" value={`$ ${encontrado.price}`}/>
                      </div>
                      <div>
                        <input className={Estilo.inputPrecio} type="text" value={encontrado.stock} />
                      </div>
                    </div>
                  </form>
                  <hr/>
                </div>
                )
              })
            }
          </div>
      </div>

      <div className={Estilo.formsModificar}>
        <div>
          <h3>Ingrese los datos que desea modificar/eliminar</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={Estilo.labelInputModificar}>
                <label>Id:</label>
                <input
                    type="number" id="id" name="id"
                    placeholder="Nº"
                    onChange={handleChange}
                    className={Estilo.id2}
                />
          </div>
          <div className={Estilo.labelInputModificar}>
            <label> Nombre: </label>
            <input
                type="text" id="name" name="name"
                placeholder="Ingrese nombre del producto"
                onChange={handleChange}
            />
          </div>
            <div className={Estilo.labelInputModificar}>
              <label>Descripcion:</label>
                <input
                    type="text" id="description" name="description"
                    placeholder="Ingrese una descripción"
                    onChange={handleChange}
                />
            </div>
            <div className={Estilo.labelInputModificar}>
              <label>Precio: </label>
              <input
                  type="number" id="price" name="price"
                  placeholder="Ingrese Precio"
                  onChange={handleChange}
              />
            </div>
            <div className={Estilo.labelInputModificar}>
              <label> Stock:</label>
              <input
                  type="number" id="stock" name="stock"
                  placeholder="Ingrese cantidad"
                  onChange={handleChange}
              />
            </div>
          </form>
          <div className={Estilo.botones} >
            <button onClick={modificar} type="submit" value="Actualizar" className={Estilo.botonModificar}> Modificar</button>
            <button onClick={delet} className={Estilo.botonBorrar} >Eliminar</button>
          </div>
      </div>
    </div>
  );
}

var firebaseConfig = {                                        //agrega productos
    apiKey: "AIzaSyBE3Y03cTrnOwM9DkcGpUklWYkjESBaH3A",
    authDomain: "petshopfiles.firebaseapp.com",
    databaseURL: "https://petshopfiles.firebaseio.com",
    projectId: "petshopfiles",
    storageBucket: "petshopfiles.appspot.com",
    messagingSenderId: "332756429714",
    appId: "1:332756429714:web:fbfb632f36b580b7682f4b",
    measurementId: "G-Q2NHZVYZ1F"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const mapStateToProps = state => {
    return {
      products: state.products
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
      getProductsRequest: () => dispatch(getProductsRequest())
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ModificayBorra)
