import React, {useState, useEffect} from 'react';
import Catalogo from './CatalogoComp';
import axios from 'axios';
import Nav from '../Containers/Nav';
import Search from './SearchComp';
import { Link } from "react-router-dom";

export default function SearchBar2(){
     const [texto, setTexto] = useState([]);

    //  useEffect(() => {
    //     async function detProd(producto) {
    //       const response = await axios.get(`http://localhost:3001/search/products=${producto}`)
    //       const json = await response.data;    
    //       console.log(json) 
    //       setTexto(json);   
    //     }
    //     detProd();
    //     }, []);
     function onSearch(producto) {
          axios.get(`http://localhost:3001/search?products=${producto}`)
          .then(r =>{
            const array = r.data;
            console.log(array)
            setTexto(array)
            })
            .catch(
                <h1>No se encontraron resultados</h1>
            )
     }

  
return (
    <div>
    
        <Search funcion={onSearch}/>
    
        <Catalogo productos={texto}/>
       
    </div>
    )
}