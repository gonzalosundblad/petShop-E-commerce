import React, { useState, useEffect } from 'react';
import Catalogo from '../Components/CatalogoComp'
import { getProductsRequest } from '../Redux/actions';
import { connect } from 'react-redux'
import store from '../Redux/store'
import { ModificayBorra } from './Productos';



function MostrarCatalogo({ products, getProductsRequest }) {

  useEffect(() => {
    getProductsRequest()
  }, []);

  console.log(products)
  return (
    <div >
      <Catalogo productos={products} />
    </div>
  );
};
const mapStateToProps = state => {
  return {
    products: state.reducer.products
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
)(MostrarCatalogo)
