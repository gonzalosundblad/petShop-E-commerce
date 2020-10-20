import React, { useState, useEffect } from "react";
import axios from 'axios';
import {putId, getProducts, deleteProduct, getCategories } from '../Redux/actions.js'
import { Form, Col, Row, Button, Carousel } from 'react-bootstrap';
import Estilo from '../Estilos/formsProd.module.css'
import Estilos from '../Estilos/AgregarProd.module.css'
import firebase, { storage } from 'firebase';


export function ModificayBorra() {                                   //modifica y borra producto
  const [state, setState] = useState({
      id: "",
      name: "",
      description: "",
      price: "",
      stock: ""
  });
  const [prodGuardados, setProdGuardados] = useState([])

  useEffect(() => {
    getProducts().payload
    .then(resp => setProdGuardados(resp.data))
  }, []);

 function handleChange(e){
     setState({
         ...state,
         [e.target.name]: e.target.value,
     });
 }

 function handleSubmit (event) {
   event.preventDefault();
   const cambios =  {
     key: state.id,
     name: state.name,
     description: state.description,
     price: state.price,
     stock: state.stock
   }

   const id = state.id
   putId(id, cambios)
   .then( resp => {
     console.log(resp)
     borrarInput()
     reload()
   })

}
  function borrarInput(){
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
    document.getElementById("stock").value = "";
  }
  function reload(){
    window.location.reload()
  } 


  function delet (){
    deleteProduct(state.id).then(resp => {
      console.log(resp)
      reload()
    })
  }

 return (
   <div>
     <div className={Estilo.forms}>
         <div>
             <h3>Lista de productos disponibles para modificar/eliminar</h3>
         </div>
                 {
                     prodGuardados && prodGuardados.map(encontrado => {
                         return (
                           <form key={encontrado.id}  className={Estilo.resultado}>
                           <label>Id:</label>
                           <input type="text" value={encontrado.id}  className={Estilo.inputs} />
                           <label>Nombre:</label>
                           <input type="text" value={encontrado.name} className={Estilo.inputs} />
                           <label>Descripcion:</label>
                           <input type="text" value={encontrado.description} className={Estilo.inputs} />
                           <label>Precio:</label>
                           <input type="text" value={`$ ${encontrado.price}`} className={Estilo.inputs}/>
                           <label>Stock:</label>
                           <input type="text" value={encontrado.stock} className={Estilo.inputs}/>
                         </form>

                         )
                     })
                 }
                 </div>


         <div className="modificador">
             <h3>Ingrese los datos que desea modificar/eliminar</h3>
             <form className="text-left"
                 onSubmit={handleSubmit}>

                 <div className={Estilo.id}>
                     <label>Id:</label>
                     <input
                         type="number" id="id" name="id" className="form-control"
                         placeholder="Ingrese id del producto"
                         onChange={handleChange}
                         className={Estilo.id2}
                     />
                 </div>
                 <div className={Estilo.nombre}>
                     <label> Nombre: </label>
                     <input
                         type="text" id="name" name="name" className="form-control"
                         placeholder="Ingrese nombre del producto"
                         onChange={handleChange}
                         className={Estilo.nombre2}
                     />
                 </div>
                 <div className={Estilo.description}>
                    <label>Descripcion:</label>
                     <input
                         type="text" id="description" name="description" className="form-control"
                         placeholder="Ingrese una descripción"
                         onChange={handleChange}
                         className={Estilo.description2}
                     />
                 </div>
                 <div className={Estilo.price}>
                     <label>Precio: </label>
                     <input
                         type="number" id="price" name="price" className="form-control"
                         placeholder="Ingrese Precio"
                         onChange={handleChange}
                         className={Estilo.price2}
                     />
                 </div>
                  <div className={Estilo.stock}>
                      <label> Stock:</label>
                      <input
                          type="number" id="stock" name="stock" className="form-control"
                          placeholder="Ingrese cantidad"
                          onChange={handleChange}
                          className={Estilo.stock2}
                      />
                  </div>
                 <div className={Estilo.botonesFinales} >
                  <button type="submit" value="Actualizar" className={Estilo.botoncitos}>
                      Modificar producto
                  </button>

                  <button onClick={delet} className={Estilo.botoncitos2} >Eliminar</button>
                  </div>
              </form>
              </div>
          </div>
  );
}

var firebaseConfig = {                                        //agrega productos
    apiKey: "AIzaSyBE3Y03cTrnOwM9DkcGpUklWYkjESBaH3A",
    authDomain: "petshopfiles.firebaseapp.com",
    databaseURL: "https://petshopfiles.firebaseio.com",
    projectId: "petshopfiles",
    storageBucket: "petshopfiles.appspot.com",
    messagingSenderId: "332756429714",
    appId: "1:332756429714:web:fbfb632f36b580b7682f4b",
    measurementId: "G-Q2NHZVYZ1F"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
export function CrudProduct( ){
    const [ input, setInput ] = useState({
      name: "",
      description: "",
      stock: "",
      price: "",
      image: "",
      categoryId: 1,  
    })
    const [ errors, setErrors] = useState({});
    const [ categories, setCategories ] = useState([]);
    
  
    function getIdCategory(event) {
      // event.preventDefault();
      
      let x = categories[event.target.selectedIndex]
      setInput({
        ...input,
        categoryId: x.id,
      });
      
    }
  
  
    useEffect(() => {
     function searchCategories() {
      getCategories().payload
      .then(resp => setCategories(resp.data))
    }
      searchCategories();
    }, []);
  
    function validate(input) {
        let errors = {};
        if (!input.name) {
          errors.name = 'Product Name is required';
        } else if (input.name.length < 3) {
          errors.name = 'Product Name is invalid (more than 3 characters)';
        }
        if (!input.price){
          errors.price =  "Price is required";
        }else if(!typeof(parseFloat(input.price) == "NaN")){
          errors.price = "Price is not a number";
          
        }else if(parseFloat(input.price) < 0){
          errors.price = "Price has to be major to 0";
        
        }else if(!/^\d+(\.\d{1,2})?$/.test(input.price)){
          errors.price = "Price Format Invalid(Format valid (Number.Number))";
        }
        if (!input.stock){
          errors.stock =  "Stock is required";
        // }else if(!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(input.password)){
        }else if(!typeof(parseFloat(input.stock) === "number")){
          errors.stock = "Stock is not a number";
        
        }else if(parseFloat(input.stock) < 0){
          errors.stock = "Stock has to be major to 0";
        }else if(!/^\d+(\.\d{1,2})?$/.test(input.stock)){
          errors.stock = "Stock Format Invalid(Format valid (Number.Number))";
        }
        return errors;
      };  
  
    const handleInputChange = function(e) {
      setInput({
        ...input,
        [e.target.name]: e.target.value
      });
      setErrors(validate({
        ...input,
        [e.target.name]: e.target.value
      }));
    }
  
    function handleUpload (e) {
      const file = e.target.files[0];
      // var x = e.target.value.slice(12)
      // console.log(e.target.name);
      // console.log(e.target)
      const storageRef = firebase.storage().ref(`/fotosProductos/${file.name}`);
      // const storageRef = firebase.storage().ref(`/fotosProductos/${file.name}`).getDownloadURL().then((url) => { var myUrl = url})
      // ESTO DE ARRIBA ES PARA MANDAR MAS PROLIJAMENTE LA URL A LA BASE DE DATOS. DEBERIA DISPARARSE UNA ACTION Q MANDE LA var myUrl en vez de semihardocdear en la ruta de product
      storageRef.put(file);
      // console.log(storageRef)
      setInput({
        ...input,
        [e.target.name]: e.target.value
      });
    }
  
    function handleSubmit() {
      // console.log(!errors.name && !errors.stock && !errors.price);
      
     return(!errors.name  && !errors.stock && !errors.price );
        
      }
  
      
    return(
      <div className={Estilos.forms} >
        <form onSubmit={(e) => {
          e.preventDefault();
          axios.post(`http://localhost:3001/products/`,  input )
            .then(res => {
              console.log(res);
              console.log(res.data);
              setInput({
                name: "",
                description: "",
                stock: "",
                price: "",
                image: "",
                categoryId: 1, 
    
              })            
            })
          }}>
          <div>
            <h2>Agrega un producto:</h2>
          </div>
          <div>
            <div className={Estilos.resultado} controlId="formGridName" >
              <label>Producto: </label>
              <input autoComplete="false" value={input.name} onChange={handleInputChange} name="name"/>
            </div>
            {!errors.name ? null : <p className="danger">{errors.name}</p>}

            <div className={Estilos.resultado} controlId="formGridState">
              <label>Categoria</label>
              <Form.Control className={Estilos.inputCategoria} as="select" name="categoryId" 
                onChange={e => getIdCategory(e)} 
                >
                {categories.map((category, i) => <option key={category.id} id={i} >{category.name}</option>)} 
              </Form.Control>
            </div>

            <div  className={Estilos.resultado} controlId="formGridName" >
              <label>Description: </label>
              <input autoComplete={false} value={input.description} onChange={handleInputChange} name="description"/>
            </div>
          
            <div  className={Estilos.resultado}  controlId="formGridPrice">
              <label>Price:</label>
              <input autoComplete={false}  value={input.price} onChange={handleInputChange} name="price" />
            </div>
            {!errors.price ? null : <p className="danger">{errors.price} </p>}

            <div className={Estilos.resultado}  controlId="formGridStock">
              <label>Stock:</label>
              <input autoComplete={false}  value={input.stock} onChange={handleInputChange} name="stock" />
            </div>
            {!errors.stock ? null : <p className="danger">{errors.stock}</p>}
          
            <input  type="file" value={input.image} onChange={handleUpload}  name="image" accept="image/png, .jpeg, .jpg, image/gif"/>
            
            <div  >
              <button  enabled={!handleSubmit()} variant="primary" type="submit"  > Agregar </button>
            </div>
          </div>
        </form>
      </div>
    )
};

