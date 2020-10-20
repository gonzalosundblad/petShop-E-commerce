import React, { useState, useEffect } from 'react';
import Catalogo from '../Components/CatalogoComp'
import {getProductsRequest} from '../Redux/actions';
import {connect} from 'react-redux'

function MostrarCatalogo ({products, getProductsRequest}) {

  useEffect(() => {
    console.log('useEffect');
    console.log(products);
    getProductsRequest()
  }, []);

  return (
    <div >
      <Catalogo productos = {products} />
    </div>
  );
};
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
)(MostrarCatalogo)
