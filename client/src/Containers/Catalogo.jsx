import React from 'react';
import ProductCard from '../Components/ProductCard'




export default function Catalogo({products, categ}){
  return(
    <div>
     <select /*onChange={e => props.submitAnimal(e.target.value)}*/>
            {categ.map((c, i) => (
                <option key={i}>
                    {c}
                </option>
                ))}
        </select>
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