
import React  from 'react';

import '../Estilos/product.css';


export default function Product ({id, name, description, price, stock, imagen}){
  //{id, name, description, price, stock, imagen }
//  const [producto, setProduct] = useState(product)
 
  return (
  <div className="producto">
    <figure>
      <img className="producto-img-top" src={imagen} alt="imagen de perro"/>
    </figure>
    <h1 className="producto-title">{name}</h1>
    <p className="producto-texto">Description: {description}</p>
    <ul> 
      <li className="producto-text">Precio: {price}</li>
      <li className="producto-text">Stock: {stock}</li>
    </ul>
  </div>
  )
}