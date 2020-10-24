import React, {useEffect, useState} from 'react';
import Catalogo from '../Components/CatalogoComp';
import {getProductByCategory, getCategories} from '../Redux/actions.js';
import {deleteCategory} from '../Redux/actions'; 
import {postCategory} from '../Redux/actions';
import {putCategoryId} from '../Redux/actions.js';
import estilo from '../Estilos/forms.module.css';

export function MostrarCategorias (){                  //Muestra las categorias en el home
  const [categorias, setCategoria] = useState([]);

  useEffect(() => {
    getCategories().payload
    .then(resp => setCategoria(resp.data))
  }, []);
      
  return (
      <div class='bg-success'>      
        <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
          <button type="button" class="btn btn-success"><h6 class='text-white'>Todas las Categorias</h6></button>
          <div class="btn-group" role="group">
            <button id="btnGroupDrop2" type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
              <div class="dropdown-menu" aria-labelledby="btnGroupDrop2" >
                {
                 categorias.map(n => {
                  if (n.name !== 'Sin Categoria'){
                  return (
                  <a class="dropdown-item" height='30px' href={`/products/category/${n.name}`}>{n.name}</a>)
                }})
                }
              </div>
          </div>
        </div>     
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
  <div className={estilo.formsAgregarCategoria}>
    <div>
      <h1>Agregar Categoria:</h1>
    </div>
    <form  onSubmit={handleSubmit}>
      <div className={estilo.labelInput}>
        <label>Categoría: </label>
        <input id="name" type="text" name="name" onChange={handleChange} />
      </div>
      <div className={estilo.labelInput}>
        <label>Descripción: </label>
        <input id="description" type="text" description="description" onChange={handleChange2} />
      </div>
      <button type="submit">Agregar</button>
    </form>
  </div>
)
};

export function ModificaCategoria() {                   //modifica categoria y borra categoria
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
      <div className={estilo.formsModificarCategoria }>
        <div>
          <h3>Categorias disponibles para modificar o eliminar:</h3>
        </div>
        <div>
            {
            CategGuardada && CategGuardada.map(encontrado => {
              if(encontrado.id !== 0){
                return (
                  <div>
                    <form  key={encontrado.id}>
                      <div className={estilo.labelInputModificar}>
                        <div className={estilo.id}>
                          <label>Id:</label>
                          <input type="text" value={encontrado.id} />
                        </div>
                        
                        <div className={estilo.nombre}>
                          <label>Nombre:</label>
                          <input type="text" value={encontrado.name} />
                        </div>
                      </div>
                    </form>
                    <hr/>
                  </div>
                  )
                }
              })
            }
        </div>
        <hr/>
        
          <div>
            <h2>Ingrese los datos que desea modificar o liminar</h2>
          </div>
          <div>
            <form  onSubmit={handleSubmit}>
              <div className={estilo.labelInputModificar}>
                <div className={estilo.id}>
                  <label>Id:</label>
                    <input
                          name="id" id='id'
                        placeholder="Nº"
                        onChange={handleChange}
                    />
                </div>
                <div className={estilo.nombre}>
                  <label> Nombre: </label>
                  <input
                      type="text" id="name" name="name"
                      placeholder="Nombre"
                      onChange={handleChange}
                  />
                </div>
              </div>
              </form>
            </div>
            <div className={estilo.botones}>
              <button  className={estilo.botonModificar} type="submit" value="Actualizar"> Modificar </button>
              <button className={estilo.botonBorrar} onClick={delet} >Eliminar</button>
            </div>
        </div>
      
    );
}


export function ListaCategorias(){                     //lista de categorias en el catalogo
  const [categorias, setCategoria] = useState([]);

  useEffect(() => {
    getCategories().payload
    .then(resp => setCategoria(resp.data))
  }, []);

  return (
    <div style={{position: "absolute"}}>
      <div className={estilo.listaCategorias}>
        <div class="list-group" style={{width: "150px"}}>
          <a href="#" class="list-group-item list-group-item-action bg-white border-warning text-warning" >CATEGORIAS</a>
            {
              categorias.map(n => {
                if (n.name !== 'Sin Categoria'){
                return (
                  <a href={`/products/category/${n.name}`} class="list-group-item list-group-item-action">{n.name}</a>
                )
            }})}
        </div>
      </div>
    </div>
  )
}
