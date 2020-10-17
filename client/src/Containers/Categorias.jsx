import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Catalogo from '../Components/CatalogoComp';
import {getProductByCategory} from '../Redux/actions.js'

export default function CategoryPerro ({ name }) {

    const [products, setProducts] = useState([]);
      
      useEffect(() => {
        getProductByCategory(name).payload
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
