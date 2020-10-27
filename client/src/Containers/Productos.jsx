import React, { useState, useEffect } from "react";
import { putId, getProductsRequest, deleteProduct, getCategories, getProducts } from '../Redux/actions.js'
import Estilo from '../Estilos/Modificar.module.css'
import { connect } from 'react-redux'
import store from '../Redux/store'


export function ModificayBorra({ products, getProductsRequest }) {    //modifica y borra producto
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
    console.log(products)
  }, []);


  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }


  function reload() {
    window.location.reload()
  }

  function modificar() {
    const id = state.id

    putId(id, {
      description: state.description,
      id: state.id,
      name: state.name,
      price: state.price,
      stock: state.stock
    })
      .then(resp => {
        console.log(resp.data)
      })
  }

  function borrarInput() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
    document.getElementById("stock").value = "";
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
          <legend>Lista de productos disponibles para modificar/eliminar</legend>
        </div>
        <div className={Estilo.grillaProductos}>
          <h4>ID</h4>
          <h4>Nombre</h4>
          <h4>Descripcion</h4>
          <h4>Precio</h4>
          <h4>Stock</h4>
        </div>
        <div>
          {
            prodGuardados && prodGuardados.map(encontrado => {
              return (
                <div >
                  <form key={encontrado.id} >
                    <fieldset style={{ height: "32px" }}>
                      <div >
                        <table class="table table-hover">
                          <tbody>
                            <tr class="table-secondary">
                              <div className={Estilo.grillaProductos}>
                                <td >{encontrado.id}</td>
                                <td>{encontrado.name}</td>
                                <td>{encontrado.description}</td>
                                <td>${encontrado.price}</td>
                                <td>{encontrado.stock}</td>
                              </div>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </fieldset>
                  </form>
                  <hr />
                </div>
              )
            })
          }
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form style={{ width: "50%", border: "solid 1px" }}>
          <fieldset>
            <legend>Ingrese los datos que desea modificar/eliminar</legend>

            <div class="form-group" style={{ display: "flex", flexDirection: "column", margin: "10px" }}>
              <label style={{ textDecoration: 'none' }} for="exampleInputEmail1">Id</label>
              <input type="number" class="form-control" aria-describedby="emailHelp" placeholder="Id del producto" id="id" name="id" onChange={handleChange} />
            </div>

            <div class="form-group" style={{ display: "flex", flexDirection: "column", margin: "10px" }}>
              <label style={{ textDecoration: 'none' }} for="exampleInputPassword1">Nombre</label>
              <input type="text" class="form-control" placeholder="Nombre del producto" id="name" name="name" onChange={handleChange} />
            </div>

            <div class="form-group" style={{ display: "flex", flexDirection: "column", margin: "10px" }}>
              <label style={{ textDecoration: 'none' }} for="exampleTextarea">Descripcion</label>
              <textarea class="form-control" rows="3" id="description" name="description" placeholder="Ingrese una descripción" onChange={handleChange} />
            </div>

            <div class="form-group" style={{ display: "flex", flexDirection: "column", margin: "10px" }} >
              <label style={{ textDecoration: 'none' }} class="control-label">Precio</label>
              <div class="form-group">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">$</span>
                  </div>
                  <input type="number" class="form-control" aria-label="Amount (to the nearest dollar)" id="price" name="price" placeholder="Ingrese Precio" onChange={handleChange} />
                </div>
              </div>
            </div>

            <div class="form-group" style={{ display: "flex", flexDirection: "column", margin: "10px" }}>
              <label style={{ textDecoration: 'none' }} for="exampleInputPassword1">Stock</label>
              <input type="number" class="form-control" placeholder="Ingrese cantidad" id="stock" name="stock" onChange={handleChange} />
            </div>
            <div>
              <button onClick={modificar} type="submit" value="Actualizar" class="btn btn-outline-success" style={{ margin: "10px" }}>Modificar</button>
              <button onClick={delet} class="btn btn-outline-danger" style={{ margin: "10px" }}>Borrar</button>
            </div>

          </fieldset>
        </form>
      </div>
      {/* <div className={Estilo.formsModificar}>
        <div>
          <h3>Ingrese los datos que desea modificar/eliminar</h3>
        </div>
        <form>
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
          <button onClick={modificar} className={Estilo.botonModificar}> Modificar</button>
          <button onClick={delet} className={Estilo.botonBorrar} >Eliminar</button>
        </div>
      </div>
    </div> */}
    </div>
  );
}


const mapStateToProps = state => {
  return {
    products: state.reducer
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getProductsRequest: () => dispatch(getProductsRequest()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModificayBorra)
