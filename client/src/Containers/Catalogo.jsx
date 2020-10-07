import React from 'react';
import ProductCard from '../Components/ProductCard'



export default function Catalogo({products}){
  return(
    <div>
      {products.map(p => 
        <ProductCard 
          key = {p.id} //Agregado BranchRoute porque cada componente debe tener key
          imagen= {p.imagen}
          name= {p.name}
          price= {p.price}
        />
      )}
    </div>
  )
}