import React, { useState } from 'react';
import axios from 'axios';

export default function BorrarCategoria() {
    
    const [idCambiado, setID] = useState ([]);

    function handleChange (e)  {
        setID(e.target.value);
      }
     
      function handleSubmit (event){
        event.preventDefault();
     
        axios.delete(`http://localhost:3001/products/category/${idCambiado}`)
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
      }
     
     
        return (
          <div>
            <form onSubmit={handleSubmit}>
              <label>
                ID De la categoria:
                <input type="text" name="id" onChange={handleChange} />
              </label>
              <button type="submit">Borrar</button>
            </form>
          </div>
        )
      }
    
  