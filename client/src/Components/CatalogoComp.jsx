import React  from 'react';
import ProductCard from './ProductCard';
import StyleCatalogo from '../Estilos/ProductCard.module.css'

function Catalogo({productos}) {

      return (
        <div className={StyleCatalogo.display}>
          {productos.map(p => 
          <ProductCard 
                key={p.id}
                id={p.id}
                image={p.image}
                name={p.name}
                price={p.price}
                />
            )}
        </div>
        );
    };


 export default Catalogo;