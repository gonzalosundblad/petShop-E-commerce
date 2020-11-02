import React, { useEffect, useState } from 'react';
import { getProductByCategory, getCategories } from '../Redux/actions.js';
import { deleteCategory } from '../Redux/actions';
import { postCategory } from '../Redux/actions';
import { putCategoryId } from '../Redux/actions.js';
import estilo from '../Estilos/forms.module.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';


function MostrarCategorias({ getCategories, categories }) {                  //Muestra las categorias en el home

  useEffect(() => {
    getCategories()
  }, []);

  return (
    <div class='bg-success'>
      <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
        <button type="button" class="btn btn-success"><h6 class='text-white'>Todas las Categorias</h6></button>
        <div class="btn-group" role="group">
          <button id="btnGroupDrop2" type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
          <div class="dropdown-menu" aria-labelledby="btnGroupDrop2" >
            {
              categories.map(n => {
                if (n.name !== 'Sin Categoria') {
                  return (
                    <NavLink class="dropdown-item" height='30px' to={`/products/category/${n.name}`}>{n.name}</NavLink>)
                }
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
};


function AgregarCategoria({ postCategory }) {                  //agrega categoria
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

    const categoria = {
      name: nueva,
      description: description
    };


    postCategory(categoria)
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




function ListaCategorias({ getCategories, categories }) {                     //lista de categorias en el catalogo
  

  useEffect(() => {
    getCategories()
    
  }, []);

  return (
    <div style={{ position: "absolute" }}>
      <div className={estilo.listaCategorias}>
        <div class="list-group" style={{ width: "150px" }}>
          <a  class="list-group-item list-group-item-action active">CATEGORIAS</a>
          <a href="/products" class="list-group-item list-group-item-action">Todas</a>
          {
            categories.map(c => {
              if (c.name !== 'Sin Categoria') {
                return (
                  <a href={`/products/category/${c.name}`} class="list-group-item list-group-item-action">{c.name}</a>
                )
              }
            })}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    categories: state.reducer.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ putCategoryId, postCategory, getCategories, getProductByCategory }, dispatch)
  }
}

export const agregarCategoria = connect(
  mapStateToProps,
  mapDispatchToProps
)(AgregarCategoria)

export const listaCategorias = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListaCategorias)

export const mostrarCategorias = connect(
  mapStateToProps,
  mapDispatchToProps
)(MostrarCategorias)




