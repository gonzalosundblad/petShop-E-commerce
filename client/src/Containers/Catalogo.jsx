import React from 'react';
import ProductCard from '../Components/ProductCard';



function filtrarCategoria(event, products) {
  // event.preventDefault();

  const arrayCat = products.filter( product => product.cat === event.value)
 console.log(arrayCat)
}

export default function Catalogo({products, categ}){
  return(
    <div>
      <select onChange={e =>filtrarCategoria(e.target, products)}>
        {categ.map((c, i) => ( <option key={i}> {c} </option> ))}
      </select>
      {/* {console.log(arrayCat)} */}
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