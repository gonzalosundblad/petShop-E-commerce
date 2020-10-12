import React, {useState, useEffect} from 'react';
import CategoriaCard from '../Components/CategoriaComp';
import axios from 'axios';

export default function MostrarCategorias (){
    const [nombre, setNombre] = useState([]);
  
    useEffect(() => {
        async function detProd() {
          const response = await axios.get(`http://localhost:3001/products/category`)
          const array = await response.data;    
          console.log(array) 
          setNombre(array);   
        }
        detProd();
        }, []);
  
    return (
      <div >{
          nombre.map(n => <CategoriaCard nombre = {n.name} />)
            }
        </div>
  
    );
  }