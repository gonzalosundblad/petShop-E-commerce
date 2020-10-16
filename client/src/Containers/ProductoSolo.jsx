import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Product from '../Components/Product';
import { getProductById } from '../Redux/actions'

export default function ProductSolo ({Id}) {

    const [producto, setProducto] = useState([]);
      console.log(Id)
      useEffect(() => {
        getProductById().payload
        .then(resp => setProducto(resp.data))
      }, []);

        // function onClose(id){
        //   setCities(oldCities => oldCities.filter(c => c.id !== id));
        // }
      
        return (
          <div >
              <Product producto = {producto} />
            </div>
      
        );
      }