import React, { useState } from 'react';
import ProductCard from '../Components/ProductCard';
 




export default function Catalogo({ products, categ}){
  
  const [prod, setProd] = useState(products);
  // const [categories, setCategories] = useState(categ);

  function filtrarCategoria(event, products) {
    // event.preventDefault();
  
    const arrayCat = products.filter( product => product.cat === event.value)
    console.log(arrayCat);
    setProd(arrayCat);
    
  }
  return(
    <div>
      <select onChange={e =>filtrarCategoria(e.target, prod)}>
        {categ.map((c, i) => ( <option key={i}> {c} </option> ))}
      </select>
      {/* {console.log(arrayCat)} */}
      {prod.map(p => 
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