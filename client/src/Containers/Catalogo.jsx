import React, { useState, useEffect } from 'react';
import { getProductsRequest } from '../Redux/actions';
import { connect } from 'react-redux'
import ProductCard from '../Components/ProductCard';
import StyleCatalogo from '../Estilos/CatalogoComp.module.css'




function MostrarCatalogo({ products, getProductsRequest }) {

  useEffect(() => {
    getProductsRequest()
    console.log(products)
 
  }, []);

 
  return (
    <div className={StyleCatalogo.display}>
      {products.map(p =>
        <ProductCard
          key={p.id}
          id={p.id}
          image={p.image}
          name={p.name}
          price={p.price}
          stock={p.stock}
        />
      )}
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
