import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Product from '../Components/Product';
export default function ProductSolo ({Id}) {

    const [producto, setProducto] = useState([]);
      
        useEffect(() => {
            async function detProd() {
              const response = await axios.get(`http://localhost:3001/products/${Id}`)
              const json = await response.data;    
              console.log(json) 
              setProducto(json);   
            }
            detProd();
            }, []);

        return (
          <div >
              
 <Product producto = {producto} />
            </div>
      
        );
      }