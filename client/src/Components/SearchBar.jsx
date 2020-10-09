import React, {useState} from 'react';
<<<<<<< HEAD
import './searchbar.css'
import logo from '../imagenes/logo.jpeg';    
import { Link } from 'react-router-dom'
=======
>>>>>>> ad6d63aa01503dc9a76c1a1a75aafa6c5abcabd1


export default function SearchBar (){
    const [text, setText] = useState();
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            // onSearch(text);
            setText("");
        }}>
          <Link exact to="/">
          <img className="logo" src={logo} alt=""/>
          </Link>
          <div>
            <input className="barra" type="text"
                placeholder="Ingresar Producto"
                value={text} 
                onChange={e => setText(e.target.value)}>
            </input> 
<<<<<<< HEAD
            <input className="boton" type="submit" value="BUSCAR" />
            </div>
=======
            <input type="submit" value="BUSCAR" />
>>>>>>> ad6d63aa01503dc9a76c1a1a75aafa6c5abcabd1
        </form>
    )
}

