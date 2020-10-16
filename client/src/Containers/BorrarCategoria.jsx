import React, { useState } from 'react';
import axios from 'axios';
import { deleteProduct } from '../Redux/actions';



export default function borrarCategoria({id}) {
    
      console.log(id)
  
      function refrescar(){
        window.location.reload()
      }

      function delet (){
        deleteProduct(id).then(resp => {
          console.log(resp)
          refrescar()
        })
      }
      return(
        <button onClick={delet} > x </button>
      )
    };
  