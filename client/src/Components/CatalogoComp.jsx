import React from 'react';
import ProductCard from './ProductCard';
import StyleCatalogo from '../Estilos/CatalogoComp.module.css'

function Catalogo({ productos }) {
  return (
    <div className={StyleCatalogo.display}>
      {productos.map(p =>
        <ProductCard
          key={p.id}
          id={p.id}
          image={p.image}
          name={p.name}
          price={p.price}
          stock={p.stock}
        />
      )}
    </div>
  );
};

export default Catalogo;
