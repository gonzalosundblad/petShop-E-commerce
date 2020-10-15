import React, {useState} from 'react';
// import '../Estilos/searchbar.css';
import logo from '../imagenes/logo.jpeg';    
import { Link } from "react-router-dom";
import axios from 'axios';
import Catalogo from './CatalogoComp';

export default function SearchBar (){
    const [text, setText] = useState([]);
    const [producto, setProducto] = useState([]);

    function modificar (){
        axios.get(`http://localhost:3001/search?products=${text}`)
        .then(r =>{
            const array = r.data;
            console.log(array)
            setProducto(array);
            
        })
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            modificar();
            setText("");
        }}>
    
          <div>
            <input  type="search"
                placeholder="Ingresar Producto"
                value={text} 
                onChange={e => setText(e.target.value)}>

            </input>
            <Link to={`/products/search=${text}`}>
            <input type="submit" value="BUSCAR" />
            <input  type="submit" value="BUSCAR" />
             </Link>
            </div>
            <div>
                <Catalogo productos={producto}/>
            </div>
            
        </form>
       
    )
}

