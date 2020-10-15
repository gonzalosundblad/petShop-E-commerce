import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Product from '../Components/Product';

export default function ProductSolo ({Id}) {

    const [producto, setProducto] = useState([]);
      console.log(Id)
        useEffect(() => {
            async function detProd() {
              const response = await axios.get(`http://localhost:3001/products/${Id}`)
              const json = await response.data;    
              console.log(json) 
              setProducto(json);   
            }
            detProd();
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