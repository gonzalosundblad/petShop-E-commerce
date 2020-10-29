import React from 'react';
import ProductCard from './ProductCard';
import StyleCatalogo from '../Estilos/CatalogoComp.module.css'
import Pagination from './Pagination';
import { useState } from 'react';

function Catalogo({ productos }) {

const [pagina, setPagina] = useState(1)  //el numero de las paginas, empieza en 1
const products = 3;                      // productos q van a ver por pagina

const final = pagina * products;
const principio = final - products;
const arrayProductos = productos.slice(principio, final);

function proximaPagina (number){ 
   setPagina(number)
}

  return (
    <div >
        <div className={StyleCatalogo.display}>
        {arrayProductos.map(p =>
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
        <div style={{ margin: "30px"}}>
          <Pagination totalProductos={productos} paginas={proximaPagina} productPorPagina={products}/>
        </div>
    
    </div>
  );
};

export default Catalogo;