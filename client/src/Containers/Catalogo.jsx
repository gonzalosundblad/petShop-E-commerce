import React, { useState } from 'react';
import ProductCard from '../Components/ProductCard';
import '../Estilos/catalogo.css';



export default function Catalogo({ products, categ}){
  
  const [prod, setProd] = useState(products);
  // const [categories, setCategories] = useState(categ);
  // useEffect(() => {
  // })


  function filtrarCategoria(event, products) {
    // event.preventDefault();
    const arrayCat = products.filter( product => product.cat === event.value)
    setProd(arrayCat);
  }
  return(
    <div>
      <select onChange={e =>filtrarCategoria(e.target, products)}>
        {categ.map((c, i) => ( <option className="opciones" key={i}> {c} </option>))}
      </select>
      {prod.map(p => 
        <ProductCard 
          key = {p.id} 
          imagen= {p.imagen} 
          name= {p.name}
          price= {p.price}
        />
      )}
    </div>
  )
}

