import React, {useState} from 'react';
import CategoriaCard from '../Components/CategoriaComp';

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
      <div >
          <CategoriaCard nombre = {nombre} />
        </div>
  
    );
  }
