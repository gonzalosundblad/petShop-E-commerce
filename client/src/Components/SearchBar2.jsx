import React, {useState, useEffect} from 'react';
import Catalogo from './CatalogoComp';
import axios from 'axios';
import Nav from '../Containers/Nav';
import Search from './SearchComp';


export default function SearchBar2(){
     const [texto, setTexto] = useState([]);

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