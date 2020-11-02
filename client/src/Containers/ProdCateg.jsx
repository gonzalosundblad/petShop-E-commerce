import React, { useEffect, useState } from 'react';
import Catalogo from '../Components/CatalogoComp';
import { getProductByCategory, getCategories } from '../Redux/actions.js';
import { postCategory } from '../Redux/actions';
import { putCategoryId } from '../Redux/actions.js';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

function ProductosPorCategoria({ name, getProductByCategory, categories }) {         //Muestra los productos segun la categoria

  useEffect(() => {
    getProductByCategory(name)
  }, []);

  return (
    <div >
      <Catalogo productos={categories} />
    </div>
  )
};

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductosPorCategoria)
