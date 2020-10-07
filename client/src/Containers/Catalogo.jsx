import React from 'react';
import ProductCard from '../Components/ProductCard'


function filtrarCategoria(event) {
  // event.preventDefault()
  console.log(event.value)
  if(event === 'perros') {
    
  }
}


export default function Catalogo({products, categ}){
  return(
    <div>
      <select onChange={e => filtrarCategoria(e.target)}>
        {categ.map((c, i) => ( <option key={i}> {c} </option> ))}
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