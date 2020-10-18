import React, {useEffect, useState} from 'react';
import Catalogo from '../Components/CatalogoComp';
import CategoriaCard from '../Components/CategoriaComp';
import {getProductByCategory, getCategories} from '../Redux/actions.js';
import {deleteCategory} from '../Redux/actions'; 
import {postCategory} from '../Redux/actions';
import {putCategoryId} from '../Redux/actions.js';

export function MostrarCategorias (){                  //Muestra las categorias en el home
  const [categorias, setCategoria] = useState([]);

  useEffect(() => {
    getCategories().payload
    .then(resp => setCategoria(resp.data))
  }, []);
      
  return (
      <div >
          {
          categorias.map(n => {
              if (n.name !== 'Sin Categoria'){ 
                  return  <CategoriaCard nombre={n.name} id={n.id} /> 
              }
          })
          }
      </div>  
  )
};

export function ProductosPorCategoria({ name }) {         //Muestra los productos segun la categoria

const [products, setProducts] = useState([]);
  
useEffect(() => {
  getProductByCategory(name).payload
  .then(resp => setProducts(resp.data))
}, []);

return (
    <div >
      <Catalogo productos = {products}/>
    </div>
    )
};

// export function BorrarCategoria() {                      //borra categoria

//   const [idCambiado, setID] = useState ([]);

//   function handleChange (e)  {
//       setID(e.target.value);
//     }
    
//     function handleSubmit (event){
//       event.preventDefault();
//     }
    
//     deleteCategory(idCambiado).payload
//     .then(function(resp){
//     console.log(resp.data);
//   })

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label>
//           ID De la categoria:
//           <input type="text" name="id" onChange={handleChange} />
//         </label>
//         <button type="submit">Borrar</button>
//       </form>
//     </div>
//   )
// };

export function AgregarCategoria() {                  //agrega categoria
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
    

    postCategory(usuario).payload
    .then(function(resp){
      console.log(resp.data);
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
};

export function ModificaCategoria() {                   //modifica categoria
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

    function delet (){
      deleteCategory(state.id).then(resp => {
        console.log(resp)
        reload()
      })
    }

   return (
      <div className="form-class">
        <div>
          <h3>Lista de productos disponibles para modificar</h3>
        </div>
        <div>
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
        </div>
        <div className="modificador">
          <h3>Ingrese los datos que desea modificar</h3>
          <form className="text-left" onSubmit={handleSubmit}>
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
            <button onClick={delet} >Borrar</button>
          </form>
        </div>
      </div>
    );
}
