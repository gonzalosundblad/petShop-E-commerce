import React, { useEffect, useState } from 'react';
import Catalogo from '../Components/CatalogoComp';
import { getCategories } from '../Redux/actions.js';
import { deleteCategory } from '../Redux/actions';
import { putCategoryId } from '../Redux/actions.js';
import estilo from '../Estilos/forms.module.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

function ModificaCategoria({ categories, putCategoryId, getCategories }) {                   //modifica categoria y borra categoria
  const [state, setState] = useState({
    id: "",
    name: ""
  });

  useEffect(() => {
    getCategories()
  }, []);

  console.log(categories, "hola")

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

    putCategoryId(state.id, cambios)

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
              categories.map(c => {
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

function mapStateToProps(state) {
  console.log(state.auth);
  const { user } = state.auth.user;
  const { categories } = state.reducer
  return {
    user,
    categories
  };
}



function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ putCategoryId, getCategories }, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModificaCategoria)