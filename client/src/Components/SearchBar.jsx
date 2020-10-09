import React, {useState} from 'react';
import './searchbar.css'
import logo from '../imagenes/logo.jpeg';    

export default function SearchBar (){
    const [text, setText] = useState();
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            // onSearch(text);
            setText("");
        }}>
          <img className="logo" src={logo} alt=""/>
          <div>
            <input className="barra" type="text"
                placeholder="Ingresar Producto"
                value={text} 
                onChange={e => setText(e.target.value)}>
            </input> 
            <input className="boton" type="submit" value="BUSCAR" />
            </div>
        </form>
    )
}

