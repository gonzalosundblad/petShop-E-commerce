import React, { useState } from 'react';
import axios from 'axios';

export default function borrarCategoria({id}) {
    
      console.log(id)
  
      axios.delete(`http://localhost:3001/products/category/${id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
        
      })
  
      
    };
  