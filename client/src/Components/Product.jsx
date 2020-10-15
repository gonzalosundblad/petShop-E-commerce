import React, { useState, useEffect } from 'react';



// import {getCategories} from '../../redux/actions/category';
import {  mostrarProductos} from '../Redux/actions'
import store from '../Redux/store';
import { useDispatch } from 'react-redux'


export default function ProudctList() {

  const dispatch = useDispatch();

  const [productos, setProductos] = useState()


  useEffect(() => {
      if(!productos){
       dispatch( mostrarProductos());
      }
       store.subscribe(() => setProductos(store.getState().productos))


  },[])

  return (
    <div>
      <h1>hola</h1>
      

    </div>

  );
} 