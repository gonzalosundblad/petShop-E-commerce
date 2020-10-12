import React  from 'react';
import ProductCard from './ProductCard';

function Catalogo({productos}) {
    if(productos.length >= 1){
      return (
        <div>
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


 export default Catalogo;