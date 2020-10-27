import React, { useEffect, useState } from 'react';
import Catalogo from '../Components/CatalogoComp';
import { getProductByCategory, getCategories } from '../Redux/actions.js';
import { deleteCategory } from '../Redux/actions';
import { postCategory } from '../Redux/actions';
import { putCategoryId } from '../Redux/actions.js';
import estilo from '../Estilos/forms.module.css';
import { connect } from 'react-redux'

export function MostrarCategorias() {                  //Muestra las categorias en el home
  const [categorias, setCategoria] = useState([]);

  useEffect(() => {
    getCategories().payload
      .then(resp => setCategoria(resp.data))
  }, []);

  return (
    <div class='bg-success'>
      <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
        <button type="button" class="btn btn-success"><h6 class='text-white'>Todas las Categorias</h6></button>
        <div class="btn-group" role="group">
          <button id="btnGroupDrop2" type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
          <div class="dropdown-menu" aria-labelledby="btnGroupDrop2" >
            {
              categorias.map(n => {
                if (n.name !== 'Sin Categoria') {
                  return (
                    <a class="dropdown-item" height='30px' href={`/products/category/${n.name}`}>{n.name}</a>)
                }
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
};

export function ProductosPorCategoria({ name }) {         //Muestra los productos segun la categoria

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductByCategory(name).payload
      .then(resp => setProducts(resp.data))
  }, []);

  return (
    <div >
      <Catalogo productos={products} />
    </div>
  )
};

export function AgregarCategoria() {                  //agrega categoria
  const [nueva, setNueva] = useState([]);
  const [description, setDescription] = useState([])

  function handleChange(event) {
    setNueva(event.target.value);
  }

  function handleChange2(event) {
    setDescription(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault();

    const usuario = {
      name: nueva,
      description: description
    };


    postCategory(usuario).payload
      .then(function (resp) {
        console.log(resp.data);
        borrarInput()
      })


  }
  function borrarInput() {
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
  }


  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit} style={{ width: "50%", border: "solid 1px" }}>
        <fieldset>
          <legend>Agregar Categoria</legend>
          <div class="form-group" style={{ display: "flex", flexDirection: "column", margin: "10px" }}>
            <label style={{ textDecoration: 'none' }} for="exampleInputEmail1">Nombre</label>
            <input type="texto" class="form-control" aria-describedby="emailHelp" placeholder="Nombre de la categoria" id="name" name="name" onChange={handleChange} />
          </div>
          <div class="form-group" style={{ display: "flex", flexDirection: "column", margin: "10px" }}>
            <label style={{ textDecoration: 'none' }} for="exampleInputPassword1">Description</label>
            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Ingrese una descripcion" id="description" description="description" onChange={handleChange2} />
          </div>
          <button type="submit" class="btn btn-outline-success" style={{ margin: "10px" }}>Agregar</button>
        </fieldset>
      </form>
    </div>
  )
};

export function ModificaCategoria() {                   //modifica categoria y borra categoria
  const [state, setState] = useState({
    id: "",
    name: ""
  });
  const [CategGuardada, setCategGuardada] = useState([])

  useEffect(() => {
    getCategories().payload
      .then(resp => setCategGuardada(resp.data))
  }, []);

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const cambios = {
      key: state.id,
      name: state.name
    }
    const headers = {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }
    const id = state.id
    putCategoryId(id, cambios)
      .then(resp => {
        console.log(resp)
        borrarInput()
        reload()
      })

  }
  function borrarInput() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
  }
  function reload() {
    window.location.reload()
  }

  function delet() {
    deleteCategory(state.id).then(resp => {
      console.log(resp)
      reload()
    })
  }

  return (
    <div >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "50%", border: "solid 1px" }}>
          <div>
            <legend>Lista de categorias disponibles para modificar/eliminar</legend>
          </div>
          <div className={estilo.grillaCategorias}>
            <h4>ID</h4>
            <h4>Nombre</h4>
          </div>
          <div>
            {
              CategGuardada.map(c => {
                return (
                  <div >
                    <form key={c.id} >
                      <fieldset style={{ height: "32px" }}>
                        <div >
                          <table class="table table-hover">
                            <tbody>
                              <tr class="table-secondary">
                                <div className={estilo.grillaCategorias}>
                                  <td >{c.id}</td>
                                  <td>{c.name}</td>
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
      </div>
      <hr />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form onSubmit={handleSubmit} style={{ width: "50%", border: "solid 1px" }}>
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

            <div>
              <button onClick={handleSubmit} type="submit" value="Actualizar" class="btn btn-outline-success" style={{ margin: "10px" }}>Modificar</button>
              <button onClick={delet} class="btn btn-outline-danger" style={{ margin: "10px" }}>Borrar</button>
            </div>

          </fieldset>
        </form>
      </div>
    </div>
  )
}


export function ListaCategorias() {                     //lista de categorias en el catalogo
  const [categorias, setCategoria] = useState([]);

  useEffect(() => {
    getCategories().payload
      .then(resp => setCategoria(resp.data))
  }, []);

  return (
    <div style={{ position: "absolute" }}>
      <div className={estilo.listaCategorias}>
        <div class="list-group" style={{ width: "150px" }}>
          <a href="#" class="list-group-item list-group-item-action bg-white border-warning text-warning" >CATEGORIAS</a>
          <a href='/products' class="list-group-item list-group-item-action">Todas</a>
          {
            categorias.map(n => {
              if (n.name !== 'Sin Categoria') {
                return (
                  <a href={`/products/category/${n.name}`} class="list-group-item list-group-item-action">{n.name}</a>
                )
              }
            })}
        </div>
      </div>
    </div>
  )
}
export function mapStateToProps(state) {
  console.log(state.auth);
  const { user } = state.auth.user;
  return {
    user,
  };
}
