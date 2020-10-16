import React, { useState, useEffect } from "react";
import axios from 'axios';
import {putId, getProducts} from '../Redux/actions.js'
import {connect} from 'react-redux';

function Modifica() {
    const [state, setState] = useState({
        id: "",
        name: "",
        description: "",
        price: "",
        stock: ""
    });
    const [prodGuardados, setProdGuardados] = useState([])

    useEffect(() => {
      getProducts().payload
      .then(resp => setProdGuardados(resp.data))
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
       name: state.name,
       description: state.description,
       price: state.price,
       stock: state.stock
     }

     const id = state.id
     putId(id, cambios)
     .then( resp => {
       console.log(resp)
       borrarInput()
       reload()
     })

}
    function borrarInput(){
      document.getElementById("id").value = "";
      document.getElementById("name").value = "";
      document.getElementById("description").value = "";
      document.getElementById("price").value = "";
      document.getElementById("stock").value = "";
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
                       prodGuardados && prodGuardados.map(encontrado => {
                           return (
                             <form key={encontrado.id}>
                             <label>Id:</label>
                             <input type="text" value={encontrado.id} />
                             <label>Nombre:</label>
                             <input type="text" value={encontrado.name} />
                             <label>Descripcion:</label>
                             <input type="text" value={encontrado.description} />
                             <label>Precio:</label>
                             <input type="text" value={`$ ${encontrado.price}`}/>
                             <label>Stock:</label>
                             <input type="text" value={encontrado.stock} />
                           </form>
                           )
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
                           placeholder="Ingrese id del producto"
                           onChange={handleChange}
                       />
                   </div>
                   <br /><br />

                   <div className="camposformulario">
                       <label> Nombre: </label>
                       <input
                           type="text" id="name" name="name" className="form-control"
                           placeholder="Ingrese nombre del producto"
                           onChange={handleChange}
                       />
                   </div>
                   <br /><br />

                   <div className="camposformulario">
                      <label>Descripcion:</label>
                       <input
                           type="text" id="description" name="description" className="form-control"
                           placeholder="Ingrese una descripción"
                           onChange={handleChange}
                       />
                   </div>
                   <br /><br />

                   <div className="camposformulario">
                       <label>Precio: </label>
                       <input
                           type="number" id="price" name="price" className="form-control"
                           placeholder="Ingrese Precio"
                           onChange={handleChange}
                       />
                   </div>
                   <br /><br />

                    <div className="camposformulario">
                        <label> Stock:</label>
                        <input
                            type="number" id="stock" name="stock" className="form-control"
                            placeholder="Ingrese cantidad"
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" value="Actualizar">
                        Modificar producto
                    </button>
                </form>
                </div>
            </div>
    );
}

const mapStateToProps = (state) => ({
products : state.products
})

export default connect(
mapStateToProps,
{putId, getProducts})
(Modifica);
