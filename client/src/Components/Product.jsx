import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard'


// import {getCategories} from '../../redux/actions/category';
import {  getProducts} from '../Redux/actions'
import store from '../Redux/store';
import { useDispatch } from 'react-redux'


export default function ProudctList() {

  const dispatch = useDispatch();

  const [productos, setProductos] = useState()


  useEffect(() => {
    getProducts().payload
    .then(resp => setProductos(resp.data))
  },[])



  return (
    <div>
      <h1>Hola </h1>
    </div>

  );
} 