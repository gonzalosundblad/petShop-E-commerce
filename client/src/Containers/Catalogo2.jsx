import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Catalogo from '../Components/CatalogoComp'
import { getCategories } from '../Redux/actions';
import { getProducts } from '../Redux/actions';

  export default function MostrarCatalogo () {

    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      getProducts().payload
      .then(resp => setProducts(resp.data))
        }, []);
  
  
    // function onClose(id){
    //   setCities(oldCities => oldCities.filter(c => c.id !== id));
    // }
  
    return (
      <div >
        {/* <Nav/> */}
        {/* <Nav catag={buscando}/> */}
        <Catalogo productos = {products} />
      </div>
  
    );
  }