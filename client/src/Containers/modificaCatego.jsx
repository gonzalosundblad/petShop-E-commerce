import React, { useState, useEffect } from "react";
import axios from 'axios';
import {putId, getCategories, putCategoryId} from '../Redux/actions.js'

export default function Modifica() {
    const [state, setState] = useState({
        id: "",
        name: ""
    });
    const [CategGuardada, setCategGuardada] = useState([])

    useEffect(() => {
      getCategories().payload
      .then(resp => setCategGuardada(resp.data))
    }, []);

   function handleChange(e){
       setState({
           ...state,
           [e.target.name]: e.target.value,
       });
   }

   function handleSubmit (event) {
     event.preventDefault();
     const cambios =  {
       key: state.id,
       name: state.name
     }
     const headers = {
       headers: {
       "Content-Type": "application/json",
       "Accept": "application/json"
         }
       }
     const id = state.id
     putCategoryId(id, cambios)
     .then( resp => {
       console.log(resp)
       borrarInput()
       reload()
     })

}
    function borrarInput(){
      document.getElementById("id").value = "";
      document.getElementById("name").value = "";
    }
    function reload(){
      window.location.reload()
    }

   return (
       <div className="form-class">
           <div>
               <h3>Lista de productos disponibles para modificar</h3>
           </div>
                   {
                       CategGuardada && CategGuardada.map(encontrado => {
                         if(encontrado.id !== 0){
                           return (
                             <form key={encontrado.id}>
                             <label>Id:</label>
                             <input type="text" value={encontrado.id} />
                             <label>Nombre:</label>
                             <input type="text" value={encontrado.name} />
                           </form>
                           )
                         }
                       })
                   }


           <div className="modificador">
               <h3>Ingrese los datos que desea modificar</h3>
               <form className="text-left"
                   onSubmit={handleSubmit}>

                   <div className="camposformulario">
                       <label>Id:</label>
                       <input
                           type="number" id="id" name="id" className="form-control"
                           placeholder="Ingrese id de la categoría"
                           onChange={handleChange}
                       />
                   </div>
                   <br /><br />

                   <div className="camposformulario">
                       <label> Nombre: </label>
                       <input
                           type="text" id="name" name="name" className="form-control"
                           placeholder="Ingrese nombre de la categoría"
                           onChange={handleChange}
                       />
                   </div>
                   <br /><br />

                    <button type="submit" value="Actualizar">
                        Modificar Categoría
                    </button>
                </form>
                </div>
            </div>
    );
}
