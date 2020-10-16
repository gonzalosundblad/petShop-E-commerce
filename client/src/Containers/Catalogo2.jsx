import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Catalogo from '../Components/CatalogoComp'
import {getProducts} from '../Redux/actions'

  export default function MostrarCatalogo () {

    const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     async function detProd() {
    //       const response = await axios.get(`http://localhost:3001/products`)
    //       const json = await response.data;
    //       console.log(json)
    //       setProducts(json);
    //     }
    //     detProd();
    //     }, []);

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
