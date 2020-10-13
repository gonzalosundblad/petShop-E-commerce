 import React, {useState} from 'react';
 import axios from 'axios';
 import ProductCard from '../Components/ProductCard';
 import {Link } from "react-router-dom";
 

 export default function Cate (){
     const [prod, setProd] = useState([]);

    function catalogoo (){
         axios.get(`http://localhost:3001/products`)
         .then(r =>{
             const array = r.data;
             console.log(array)
             setProd(array)
   
         })
         .catch(error => {console.log(error)})
            
<<<<<<< HEAD
    }
    return (
        <div>
          <Link to='/products'> 
                <button onClick= {catalogoo}>Catalogo</button>
            </Link>
            <div>
                {
                prod.map(p => <ProductCard id={p.id} key = {p.id} imagen= {p.imagen} name= {p.name}price= {p.price}/>)
                }
            </div>
        </div>
=======
     }
     return (
         <div>
          {catalogoo()}
                 {
                 prod.map(p => <ProductCard key = {p.id} imagen= {p.imagen} name= {p.name}price= {p.price}/>)
                 }
             </div>
>>>>>>> 6a774d748f3541cf1110f5d3be88e00090ecd913
    
     )};