import React, { useState, useEffect, Children } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
// import './crudProduct.css'
import axios from 'axios';
import firebase, { storage } from 'firebase'

var firebaseConfig = {
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


export default function CrudProduct( ){
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
    async function searchCategories() {
      const response = await axios.get(`http://localhost:3001/products/category/`)
      const json = await response.data;    
      console.log(json) 
      setCategories(json)
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
        Submit
      </Button>
    </Form>
  )
}