import React, { useEffect, useState } from 'react';
import Catalogo from '../Components/CatalogoComp';
import { getProductByCategory, getCategories } from '../Redux/actions.js';
import { deleteCategory } from '../Redux/actions';
import { postCategory } from '../Redux/actions';
import { putCategoryId } from '../Redux/actions.js';
import estilo from '../Estilos/forms.module.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';


export function MostrarCategorias() {                  //Muestra las categorias en el home
  const [categorias, setCategoria] = useState([]);

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




export function ListaCategorias({ getCategories, categories }) {                     //lista de categorias en el catalogo
  const [categorias, setCategoria] = useState([]);

  useEffect(() => {
    getCategories()
  }, []);

  console.log(categories, "hola")

  return (
    <div style={{ position: "absolute" }}>
      <div className={estilo.listaCategorias}>
        <div class="list-group" style={{ width: "150px" }}>
          <a href="#" class="list-group-item list-group-item-action bg-white border-warning text-warning" >CATEGORIAS</a>
          <a href='/products' class="list-group-item list-group-item-action">Todas</a>
          {
            categories.map(n => {
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
const mapStateToProps = state => {
  return {
    categories: state.reducer.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ putCategoryId, postCategory, getCategories }, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListaCategorias)

