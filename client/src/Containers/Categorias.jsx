import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Catalogo from '../Components/CatalogoComp';
import {getProductByCategory} from '../Redux/actions.js'

export default function Categories({ name }) {

    const [products, setProducts] = useState([]);

    console.log(products)
        useEffect(() => {
          getProductByCategory(name).payload
          .then(resp => setProducts(resp.data))
        }, []);

        return (
          <div >
            <Catalogo productos = {products} />
          </div>
        )
      };
