import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { postLogin } from '../Redux/actionsLog';
import { getUser } from '../Redux/actionsOrden';

export default function User() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({});
  var x = false;




  function validate(input) {
    let errors = {};
    if (!input.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
      errors.email = 'Email is invalid';
    }
    if (!input.password) {
      errors.password = 'Password is required';
    } else if (input.password.length < 4) {
      errors.password = 'Password is invalid';
    }
    return errors;
  };

  function loginUser() {
    postLogin(input).payload
      .then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
  }




  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));

  }





  return (
    <div>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control value={input.email} type="email" onChange={handleInputChange} placeholder="Enter email" name="email" />
          {errors.email && (<h4 className="danger"> {errors.email} </h4>
          )}
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control value={input.password} onChange={handleInputChange} type="password" placeholder="Password" name="password" />
          {errors.password && (
            <h4 className="danger">{errors.password}</h4>
          )}
        </Form.Group>
      </Form.Row>


      <Button variant="primary" type="button" onClick={loginUser}>
        Iniciar
            </Button>
    </div>
  )
}
