import React from 'react';
import ProductCard from '../Components/ProductCard'



export default function Catalogo({products}){
  return(
    <div>
      {products.map(p => 
        <ProductCard 
          imagen= {p.imagen}
          name= {p.name}
          price= {p.price}
        />
      )}
    </div>
  )
}