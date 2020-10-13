import React, {useState, useEffect} from 'react';
import CategoriaCard from '../Components/CategoriaComp';
import axios from 'axios';

export default function MostrarCategorias (){
    const [nombre, setNombre] = useState([]);
  
    useEffect(() => {
        async function detProd() {
          const response = await axios.get(`http://localhost:3001/products/category`)
          const array = await response.data;    
          setNombre(array);   
        }
        detProd();
        }, []);
  
        return (
          <div >
              {
              nombre.map(n => {
                  if (n.name !== 'Sin Categoria'){ 
                      return  <CategoriaCard nombre = {n.name} id={n.id} /> 
                  }
              })
              }
          </div>  
      )
  }
