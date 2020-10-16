import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Catalogo from '../Components/CatalogoComp'
import {getProducts} from '../redux/actions.js'
import {connect} from 'react-redux';
import store from '../redux/store';


  function MostrarCatalogo ({getProducts}) {

    const [products, setProducts] = useState([]);
    // useEffect(() => { async function detProd() {
    //       const response = await axios.get(`http://localhost:3001/products`)
    //       const json = await response.data;
    //       setProducts(json); }
    //     detProd();}, []);
    console.log(store.getState());

        useEffect(() => {
      getProducts().payload
      .then(resp => {
        setProducts(resp.data);
      })
    }, []);

    return (
      <div >
        <Catalogo productos = {products} />
      </div>

    );
  };

  const mapStateToProps = (state) => ({
    products : state.products
  })
  // const mapDispatchToProps = dispatch => {
  //   return {
  //     getProducts: () => dispatch(getProducts())
  //   }
  // }

export default connect(
  mapStateToProps,
  {getProducts})
  (MostrarCatalogo);
