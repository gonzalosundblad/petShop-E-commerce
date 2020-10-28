// import React, { useState, useEffect } from "react";
//  import axios from 'axios';

//  export default function Modifica() {
//      const [state, setState] = useState({
//          id: "",
//          name: "",
//          description: "",
//          price: "",
//          stock: ""
//      });
//      const [prodGuardados, setProdGuardados] = useState([])
//      useEffect(() => {
//       axios.get(`http://localhost:3001/products`)
//       .then(r =>{
//           const array = r.data;
//           console.log(array)
//           setProdGuardados(array)
//       })
//       .catch(error => {console.log(error)})
//      }, []);
//     function handleChange (e){
//         setState({
//             ...state,
//             [e.target.name]: e.target.value,
//         });
//     }
//     // const submitProducto = (e) => {
//     //     actualizarEstado({
//     //         id: "",
//     //         name: "",
//     //         description: "",
//     //         price: "",
//     //         stock: ""
//     //     });
//     // };
//     function handleSubmit (event) {
//       event.preventDefault();
//       const cambios =  {
//         name: state.name,
//         description: state.description,
//         price: state.price,
//         stock: state.stock
//       }
//       const headers = {
//         headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//     }
//   }
//       axios.put(`http://localhost:3001/products/${state.id}` , cambios , headers)
//       .then(response => {
//         console.log(response)
//       })
//       .catch(err => {
//         console.log(err)
//       })
//      }
//     return (
//         <div>
//             <div>
//                 <h3>Lista de productos disponibles para modificar</h3>
//             </div>
//                     {
//                         prodGuardados && prodGuardados.map(encontrado => {
//                             return (
//                               <form>
//                               <label>Id:</label>
//                               <input type="text" value={encontrado.id} />
//                               <label>Nombre:</label>
//                               <input type="text" value={encontrado.name} />
//                               <label>Descripcion:</label>
//                               <input type="text" value={encontrado.description} />
//                               <label>Precio:</label>
//                               <input type="text" value={`$ ${encontrado.price}`}/>
//                               <label>Stock:</label>
//                               <input type="text" value={encontrado.stock} />
//                             </form>
//                             )
//                         })
//                     }
//             <div className="modificador">
//                 <h3>Ingrese los datos que desea modificar</h3>
//                 <form className="text-left"
//                     onSubmit={handleSubmit}>
//                     <div className="camposformulario">
//                         <label>Id:</label>
//                         <input
//                             type="number" name="id" className="form-control"
//                             placeholder="Ingrese id del producto"
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <br /><br />
//                     <div className="camposformulario">
//                         <label> Nombre: </label>
//                         <input
//                             type="text" name="name" className="form-control"
//                             placeholder="Ingrese nombre del producto"
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <br /><br />
//                     <div className="camposformulario">
//                        <label>Descripcion:</label>
//                         <input
//                             type="text" name="description" className="form-control"
//                             placeholder="Ingrese una descripción"
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <br /><br />
//                     <div className="camposformulario">
//                         <label>Precio: </label>
//                         <input
//                             type="number" name="price" className="form-control"
//                             placeholder="Ingrese Precio"
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <br /><br />
//                      <div className="camposformulario">
//                          <label> Stock:</label>
//                          <input
//                              type="number" name="stock" className="form-control"
//                              placeholder="Ingrese cantidad"
//                              onChange={handleChange}
//                          />
//                      </div>
//                      <button type="submit">
//                          Modificar producto
//                      </button>
//                  </form>
//                  </div>
//              </div>
//      );
//  }
