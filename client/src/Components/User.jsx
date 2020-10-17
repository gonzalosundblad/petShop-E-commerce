import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';

export default function UserNuevo (){

  const [ errors, setErrors] = useState({});


  function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = ' Name is required';
    } else if (input.name.length < 3) {
      errors.name = ' Name is invalid (more than 3 characters)';
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
    
    


    return (
        <Form>
            <Form.Group controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="1234 Main St" />
            </Form.Group>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
                </Form.Group>
            </Form.Row>


{/* 
            <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control as="select" defaultValue="Choose...">
                    <option>Choose...</option>
                    <option>...</option>
                </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control />
                </Form.Group>
            </Form.Row> */}

            <Form.Group id="formGridCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
    </Form>
    )
}