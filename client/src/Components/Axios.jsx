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
            
    }
    return (
        <div>
            
            <button onClick= {catalogoo}>Catalogo</button>
            
            <div>
                {
                prod.map(p => <ProductCard key = {p.id} imagen= {p.imagen} name= {p.name}price= {p.price}/>)
                }
            </div>
        </div>
    
    )};