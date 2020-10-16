import React, { useState } from 'react';
import axios from 'axios';
 
export default function AgregarCategoria() {
  const [ nueva, setNueva] = useState([]);
  const [ description, setDescription] = useState([])

  function handleChange (event){
    setNueva( event.target.value );
  }
 
  function handleChange2 (event){
    setDescription( event.target.value )
  }
 
  function handleSubmit (event){
    event.preventDefault();
    
     const usuario = {
       name: nueva,
       description: description
    };

    
    axios.post(`http://localhost:3001/products/category`,  usuario )
    .then(res => {
      console.log(res);
      console.log(res.data);
      borrarInput()
    })

    
  }
      function borrarInput(){
        document.getElementById("name").value = "";
        document.getElementById("description").value = "";
      }
  
 
    return (
      <div>
        <form id="miForm" onSubmit={handleSubmit}>
          <label>Nombre de Categoría: </label>
            <input id="name" type="text" name="name" onChange={handleChange} />
            <label>Descripción: </label>
            <input id="description" type="text" description="description" onChange={handleChange2} />
          <button type="submit">Agregar</button>
        </form>
      </div>
    )
}