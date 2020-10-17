import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Catalogo from '../Components/CatalogoComp'
import {getProducts} from '../Redux/actions'
import { getCategories } from '../Redux/actions';

  export default function MostrarCatalogo () {

    const [products, setProducts] = useState([]);


    useEffect(() => {
      getProducts().payload
      .then(resp => setProducts(resp.data))
    }, []);

    return (
      <div >
        {/* <Nav/> */}
        {/* <Nav catag={buscando}/> */}
        <Catalogo productos = {products} />
      </div>

    );
  };
