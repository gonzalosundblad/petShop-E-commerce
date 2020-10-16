// import React, { useState } from 'react';
// import axios from 'axios';
// import {deleteCategory} from '../Redux/actions'; 

// export default function BorrarCategoria() {
    
//     const [idCambiado, setID] = useState ([]);

//     function handleChange (e)  {
//         setID(e.target.value);
//       }
     
//       function handleSubmit (event){
//         event.preventDefault();
//       }
     
//       deleteCategory(idCambiado).payload
//       .then(function(resp){
//       console.log(resp.data);
//     })
     
//         return (
//           <div>
//             <form onSubmit={handleSubmit}>
//               <label>
//                 ID De la categoria:
//                 <input type="text" name="id" onChange={handleChange} />
//               </label>
//               <button type="submit">Borrar</button>
//             </form>
//           </div>
//         )
//       }
    
  