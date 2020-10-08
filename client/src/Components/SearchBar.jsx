import React, {useState} from 'react';
    
export default function SearchBar (){
    const [text, setText] = useState();
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            // onSearch(text);
            setText("");
        }}>
            <input type="text"
                placeholder="Ingresar Producto"
                value={text} 
                onChange={e => setText(e.target.value)}>
            </input> 
            <input type="submit" value="BUSCAR" />
            

            
        </form>
    )
}

