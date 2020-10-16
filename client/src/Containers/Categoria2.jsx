import React, {useState, useEffect} from 'react';
import CategoriaCard from '../Components/CategoriaComp';
import axios from 'axios';
import {getCategories} from '../Redux/actions.js'
import {connect} from 'react-redux';
import store from '../Redux/store';

function MostrarCategorias (){
    const [nombre, setNombre] = useState([]);

    // useEffect(() => {
    //     async function detProd() {
    //       const response = await axios.get(`http://localhost:3001/products/category`)
    //       const array = await response.data;
    //       setNombre(array);
    //     }
    //     detProd();
    //     }, []);
    useEffect(() => {
      getCategories().payload
      .then(resp => setNombre(resp.data))
    }, []);

        return (
          <div >
              {
              nombre.map(n => {
                  if (n.name !== 'Sin Categoria'){
                      return  <CategoriaCard key={n.id} nombre = {n.name} id={n.id} />
                  }
              })
              }
          </div>
      )
  };

const mapStateToProps = (state) => ({
categories : state.categories
})

export default connect(
mapStateToProps,
{getCategories})
(MostrarCategorias);
