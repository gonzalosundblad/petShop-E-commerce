import React, {useState} from 'react';
import '../Estilos/searchbar.css';
import logo from '../imagenes/logo.jpeg';    
import { Link } from "react-router-dom";
import axios from 'axios';
import Catalogo2 from './CatalogoComp';

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
          <Link exact to="/">
            <img className="logo" src={logo} alt=""/>
          </Link>
          <div>
            <input className="barra" type="search"
                placeholder="Ingresar Producto"
                value={text} 
                onChange={e => setText(e.target.value)}>

            </input>
            <Link to='/products/search'>
            <input type="submit" value="BUSCAR" />
            <input className="boton" type="submit" value="BUSCAR" />
             </Link>
            </div>
            <div>
                <Catalogo2 productos={producto}/>
            </div>
        </form>
       
    )
}

