<<<<<<< HEAD
import React, { useState, useEffect, useRef } from 'react';
import { Form,Button,  } from 'react-bootstrap';
import './crudProduct.css'
=======
import React, { useState, useEffect, Children } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
// import './crudProduct.css'
>>>>>>> 6a774d748f3541cf1110f5d3be88e00090ecd913
import axios from 'axios';
import MultipleSelect from './MultipleSelect';
import { Link } from 'react-router-dom' 

var x= true;
var CRUD = false;
export default function CrudProduct( { prod } ){
  

  // const [name, setName] = useState();
  // const [description, setDescription] = useState();
  // const [stock, setStock] = useState();
  // const [price, setPrice] = useState();
  // const [image, setImage] = useState();
  // const [categories, setCategories] = useState();
  // const [ boton, setBoton] = useState();
  // const [ errors, setErrors] = useState({});
  // const [categories_name, setCategories_Name] = useState([]); 
  // const [userId, setUserId ] = useState();

  const [input, setInput] = useState( {
    name: "",
    description: "",
    stock: "",
    price: "",
    image: "",
  })
  const [errors, setErrors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categories_name, setCategories_Name] = useState([]);
  
  const [userID, setUserId] = useState([]);
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
  
  useEffect(() => { 
    
    async function searchCategories() {
      const response = await axios.get(`http://localhost:3001/products/category/`)
      const json = await response.data;    
      console.log(json) ;
      let x = json.map(category => category.name);
      setCategories_Name(json);
    }
    searchCategories();
    if (prod !== 'undefined'){
      CRUD = true;
      async function getProduct() {
        const response = await axios.get(`http://localhost:3001/products/${prod}`)
        const json = await response.data;   
        console.log(json) ;
        setInput({
          name: json.name,
          description: json.description,
          stock: json.stock,
          price: json.price,
          image: json.image
        })   
        
        
      }
      getProduct();
    }
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
    
    }else if(!/^\d+(\,\d{1,8})?$/.test(input.price)){
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

  const AddPutFunction = (event) => {
    event.preventDefault();
      if (!CRUD){
        axios.post(`http://localhost:3001/products/`,  input )
          .then(res => {
            console.log(res);
            console.log(res.data);
            setUserId(res.data.id);
            x = false;
          })
          .catch(err => console.log(err))
  
      }else{
        axios.put(`http://localhost:3001/products/:${prod}`, input )
          .then(res => {
            console.log(res);
            console.log(res.data);
            
          })
          .catch(err => console.log(err))
          setUserId(prod)
      }
      // console.log(res.data.id)
    }
  
    // const handlerChange = (event) => {
    //   `set${event.target.name}(${event.target.value})`;
    //   console.log(event.target.value)
    //   return
    // }

  function handleSubmit() {
    console.log(!errors.name  && !errors.stock && !errors.price )
    return(!errors.name  && !errors.stock && !errors.price );
  }

  // function putProduct( id ){
  //   axios.put(`http://localhost:3001/products/${id}` , {name: "nuevo prod", description:"es un nnuevo producto", stock: 8, price:15})
  //   .then(response => {
  //     console.log(response)
  //   })
  // }
    function deleteProduct (){
      axios.delete(`http://localhost:3001/products/${prod}`,  input )
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
          .catch(err => console.log(err))
  
      }
    
    
  return(
    <Form className="form-class" display="block" onSubmit={AddPutFunction}>
    {!input.image ? null : 
      <figure>
          <img className="producto-img-top" src={input.image} alt="imagen de perro"/>
      </figure> }
    <Form.Row  >
      
      <Link to="/products/">
        <Button
            // enabled={!handleSubmit()} 
            variant="primary" type="button" onClick={deleteProduct}>
            X </Button>
      </Link>
      <Form.Group className="form-group" controlId="formGridName" >
        <Form.Label>Producto: </Form.Label>
        <Form.Control autoComplete="false" onChange={handleInputChange}  className={errors.name && 'danger'} value={input.name} name="name"/>
        {!errors.name ? null : <p className="danger">{errors.name}</p>}
      </Form.Group>
      
      <Form.Group controlId="formGridName" >
        <Form.Label>Description: </Form.Label>
        <Form.Control autoComplete="false" onChange={handleInputChange}   value={input.description}  name="description"/>
      </Form.Group>
    </Form.Row>
    <Form.Row>
      <Form.Group  className="form-group" controlId="formGridPrice">
        <Form.Label>Price:</Form.Label>
        <Form.Control autoComplete="false"   className={errors.price && 'danger'} onChange={handleInputChange} value={input.price}  name="price" />
        {!errors.price ? null : <p className="danger">{errors.price}</p>}
      </Form.Group>
      <Form.Group className="form-group" controlId="formGridStock">
        <Form.Label>Stock:</Form.Label>
        <Form.Control autoComplete="false" className={errors.stock && 'danger'} onChange={handleInputChange}  value={input.stock}  name="stock" />
        {!errors.stock ? null : <p className="danger">{errors.stock}</p>}
      </Form.Group>
    </Form.Row>
    <input type="file" value={input.image} onChange={handleInputChange}  name="image" accept="image/png, .jpeg, .jpg, image/gif"/>

      <Button
        // enabled={!handleSubmit()} 
        variant="primary" type="submit" >
        ADD/PUT
      </Button>
      {!x ? null : <MultipleSelect user={userID} names={categories_name}></MultipleSelect> }
       {/* <button onchange={() => putProduct(2)}></button> */}
      
    </Form>
  )
}