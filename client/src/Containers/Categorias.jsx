import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Catalogo from '../Components/CatalogoComp';
import CategoriaCard from '../Components/CategoriaComp';
import {getProductByCategory, getCategories} from '../Redux/actions.js';
import {deleteCategory} from '../Redux/actions'; 
import {postCategory} from '../Redux/actions'

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


export function BorrarCategoria() {                      //borra categoria

  const [idCambiado, setID] = useState ([]);

  function handleChange (e)  {
      setID(e.target.value);
    }
    
    function handleSubmit (event){
      event.preventDefault();
    }
    
    deleteCategory(idCambiado).payload
    .then(function(resp){
    console.log(resp.data);
  })

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
