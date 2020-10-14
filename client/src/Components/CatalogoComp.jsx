import React  from 'react';
import ProductCard from './ProductCard';
import StyleCatalogo from '../Estilos/ProductCard.module.css'

function Catalogo2({productos}) {
  console.log(productos)
    if(productos.length >= 1){
      return (
        <div className={StyleCatalogo.display}>
          {productos.map(p => 
          <ProductCard 
                img={p.img}
                name={p.name}
                price={p.price}
                />
            )}
        </div>
        );
    } else return '';
  
  };


 export default Catalogo2;