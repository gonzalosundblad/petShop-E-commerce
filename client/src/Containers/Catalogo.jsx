import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Catalogo from '../Components/CatalogoComp'
import {getProducts} from '../Redux/actions';
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
        <Catalogo productos = {products} />
      </div>
  
    );
  };