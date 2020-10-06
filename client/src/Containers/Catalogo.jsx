import React from 'react';
import ProductCard from '../Components/ProductCard'



export default function Catalogo(products){
  return(
    <div>
      {products.map(p => <ProductCard /> )}
    </div>
  )
}