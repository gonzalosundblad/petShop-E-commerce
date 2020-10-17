import React, {useState, useEffect} from 'react';
import CategoriaCard from '../Components/CategoriaComp';
import axios from 'axios';
import {getCategories} from '../Redux/actions.js'

export default function MostrarCategorias (){
    const [nombre, setNombre] = useState([]);
  
    useEffect(() => {
        getCategories().payload
        .then(resp => setNombre(resp.data))
      }, []);
  
        return (
          <div >
              {
              nombre.map(n => {
                  if (n.name !== 'Sin Categoria'){ 
                      return  <CategoriaCard nombre = {n.name} id={n.id} /> 
                  }
              })
              }
          </div>  
      )
  }
