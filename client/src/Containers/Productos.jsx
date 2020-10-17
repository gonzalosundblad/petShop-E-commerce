import React, { useState, useEffect } from "react";
import axios from 'axios';
import {putId, getProducts} from '../Redux/actions.js'
import { Form, Col, Row, Button, Carousel } from 'react-bootstrap';
import '../Estilos/crudProduct.css';
// import axios from 'axios';
import firebase, { storage } from 'firebase';
import { deleteProduct, getCategories } from '../Redux/actions';

export function Modifica() {                                //modifica producto
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
       <div className="form-class">
           <div>
               <h3>Lista de productos disponibles para modificar</h3>
           </div>
                   {
                       prodGuardados && prodGuardados.map(encontrado => {
                           return (
                             <form key={encontrado.id}>
                             <label>Id:</label>
                             <input type="text" value={encontrado.id} />
                             <label>Nombre:</label>
                             <input type="text" value={encontrado.name} />
                             <label>Descripcion:</label>
                             <input type="text" value={encontrado.description} />
                             <label>Precio:</label>
                             <input type="text" value={`$ ${encontrado.price}`}/>
                             <label>Stock:</label>
                             <input type="text" value={encontrado.stock} />
                           </form>
                           )
                       })
                   }


           <div className="modificador">
               <h3>Ingrese los datos que desea modificar</h3>
               <form className="text-left"
                   onSubmit={handleSubmit}>

                   <div className="camposformulario">
                       <label>Id:</label>
                       <input
                           type="number" id="id" name="id" className="form-control"
                           placeholder="Ingrese id del producto"
                           onChange={handleChange}
                       />
                   </div>
                   <br /><br />

                   <div className="camposformulario">
                       <label> Nombre: </label>
                       <input
                           type="text" id="name" name="name" className="form-control"
                           placeholder="Ingrese nombre del producto"
                           onChange={handleChange}
                       />
                   </div>
                   <br /><br />

                   <div className="camposformulario">
                      <label>Descripcion:</label>
                       <input
                           type="text" id="description" name="description" className="form-control"
                           placeholder="Ingrese una descripción"
                           onChange={handleChange}
                       />
                   </div>
                   <br /><br />

                   <div className="camposformulario">
                       <label>Precio: </label>
                       <input
                           type="number" id="price" name="price" className="form-control"
                           placeholder="Ingrese Precio"
                           onChange={handleChange}
                       />
                   </div>
                   <br /><br />

                    <div className="camposformulario">
                        <label> Stock:</label>
                        <input
                            type="number" id="stock" name="stock" className="form-control"
                            placeholder="Ingrese cantidad"
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" value="Actualizar">
                        Modificar producto
                    </button>
                    <button onClick={delet} > Eliminar </button>
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
      <Form className="form-class" display="block" onSubmit={(e) => {
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
        
          <Form.Row  >
           
            <Form.Group className="form-group" controlId="formGridName" >
              <Form.Label>Producto: </Form.Label>
              <Form.Control autoComplete="false" className={errors.name && 'danger'} value={input.name} onChange={handleInputChange} name="name"/>
              {!errors.name ? null : <p className="danger">{errors.name}</p>}
            </Form.Group>
  
            <Form.Group controlId="formGridState">
              <Form.Label>Categoria</Form.Label>
                <Form.Control as="select" name="categoryId" 
                 onChange={e => getIdCategory(e)} 
                 >
                  {categories.map((category, i) => <option key={category.id} id={i} >{category.name}</option>)} 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formGridName" >
              <Form.Label>Description: </Form.Label>
              <Form.Control autoComplete={false} value={input.description} onChange={handleInputChange} name="description"/>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group  className="form-group" controlId="formGridPrice">
              <Form.Label>Price:</Form.Label>
              <Form.Control autoComplete={false} className={errors.price && 'danger'} value={input.price} onChange={handleInputChange} name="price" />
              {!errors.price ? null : <p className="danger">{errors.price}</p>}
            </Form.Group>
            <Form.Group className="form-group" controlId="formGridStock">
              <Form.Label>Stock:</Form.Label>
              <Form.Control autoComplete={false} className={errors.stock && 'danger'} value={input.stock} onChange={handleInputChange} name="stock" />
              {!errors.stock ? null : <p className="danger">{errors.stock}</p>}
            </Form.Group>
          </Form.Row>
          
       
          
        <input type="file" value={input.image} onChange={handleUpload}  name="image" accept="image/png, .jpeg, .jpg, image/gif"/>
  
        <Button  enabled={!handleSubmit()} variant="primary" type="submit">
          Agregar
        </Button>
        
      </Form>
    )
}

