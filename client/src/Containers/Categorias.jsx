import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Catalogo from '../Components/CatalogoComp';

export default function Categories ({Categ}) {

    const [products, setProducts] = useState([]);
      
        useEffect(() => {
            async function detProd() {
              const response = await axios.get(`http://localhost:3001/products/category/${Categ}`)
              const json = await response.data;    
              console.log(json) 
              setProducts(json);   
            }
            detProd();
            }, []);
      
      
        // function onClose(id){
        //   setCities(oldCities => oldCities.filter(c => c.id !== id));
        // }
      
        return (
          <div >
            <Catalogo productos = {products} />
          </div>
        )
      };
