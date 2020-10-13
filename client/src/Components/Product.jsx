

import React  from 'react';
// import '../Estilos/product.css';


export default function Product ({id, name, description, price, stock, imagen}){
  //{id, name, description, price, stock, imagen }
//  const [producto, setProduct] = useState(product)
 
  return (
    <div>
      <figure>
        <img/>
      </figure>
      <h1>{name}</h1>
      <p>Description: {description}</p>
      <ul> 
        <li>Precio: {price}</li>
        <li>Stock: {stock}</li>
      </ul>
    </div>
)};


{/* import React, { useState, useEffect } from 'react';
import  axios from 'axios';
import './product.css'
import { Link } from 'react-router-dom';

export default function Product ({ produc }){
 //{id, name, description, price, stock, imagen }
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [id, setId] = useState(produc);
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();;

  

  
  useEffect(() => {
    async function detProd() {
      const response = await axios.get(`http://localhost:3001/products/${produc}`)
      const json = await response.data;    
      console.log(json) 
      setName(json.name);
      setDescription(json.description); 
      setImage(json.image); 
      setId(json.id); 
      setPrice(json.price); 
      setStock(json.stock); 
    }
    detProd();
    }, []);
      
  

    
    
  

  
 
  return(
  <div className="producto">
    <figure>

      <img className="producto-img-top" src={image} alt="imagen de perro"/>
    </figure>
    <h1 className="producto-title">{name}</h1>
<<<<<<< HEAD
    <p className="producto-texto">Description: {description}</p>
    <ul> 
      <li className="producto-text">Precio: {price}</li>
      <li className="producto-text">Stock: {stock}</li>
      {/* <img src={product.imagen} alt="imagen de perro"/> */}
  
  
    </ul> 
    <Link to={`/product/crud/${produc}`}>

      <span>Modificar</span>
    </Link>
  </div>
  )
}
=======
     <p className="producto-texto">Description: {description}</p>
     <ul> 
       <li className="producto-text">Precio: {price}</li>
       <li className="producto-text">Stock: {stock}</li>
       {/* <img src={product.imagen} alt="imagen de perro"/> */}
    
    
     {/* </ul> 

  </div> */}
  {/* )
} */} 
>>>>>>> 6a774d748f3541cf1110f5d3be88e00090ecd913
