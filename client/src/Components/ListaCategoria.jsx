import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import React, { useEffect, useState } from 'react';
import { getCategories } from '../Redux/actions.js';
import estilo from '../Estilos/forms.module.css';

function ListaCategorias({ getCategories, categories }) {                     //lista de categorias en el catalogo
    const [categorias, setCategorias]= useState(categories)

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
              categorias.map(c => {
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
      ...bindActionCreators({ getCategories}, dispatch)
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ListaCategorias)
  