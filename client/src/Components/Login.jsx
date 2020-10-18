import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import {getUser} from '../Redux/actionsOrden.js';
import { Link } from 'react-router-dom'
import axios from 'axios';

// 1 | Eric  | eric@gmail.com  | 1234     | 2020-10-17 19:43:56.488-03 | 2020-10-17 19:43:56.488-03
// 2 | Gonza | gonza@gmail.com | 1234     | 2020-10-17 19:43:56.488-03 | 2020-10-17 19:43:56.488-03
// 3 | Gaby  | gaby@gmail.com  | 1234
export function validate(input) {
  let errors = {};
  if (!input.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.email = 'Email is invalid';
  }
  if (input.password) {
    errors.password = 'Password is required';
  } else if (!/(?=.*[0-9])/.test(input.password)) {
    errors.password = 'Password is invalid';
  }
  return errors;
};

export default function User ({getUsers}){
    const [users, setUsers] = useState([])
    const [input, setInput] = useState ({
              email : "",
              password : "",
          })
    const [errors, setErrors] = useState({});
    const [aUser, setAUser] = useState([])


const handleInputChange = (e) => {
  console.log(e.target);
  setInput({
  ...input,
  [e.target.name]: e.target.value
  })
  setErrors(validate({
    ...input,
    [e.target.name]: e.target.value
    }));
  }

  useEffect(() => {
    getUser().payload
    .then(resp => setUsers(resp.data))
  }, [])

function loginUser(){
        users.map((user) => {
        if (user.email === input.email){
          if (user.password === input.password){
            console.log('ok');
            //  window.location.href=`https://www.google.com.ar/`
          }
          if (user.password !== input.password){
            console.log('no');
          }
        }
        })

        };

  //  window.location.href=`https://www.google.com.ar/`
    return (
        <div>
            <Form.Row >
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={input.email} type="email" onChange={handleInputChange} placeholder="Enter email" name="email" />
                    {errors.email && (
                    <h4 className="danger"> {errors.email} </h4>
                   )}
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={input.password} onChange={handleInputChange} type="password" placeholder="Password" name="password"/>
                    {errors.password && (
                      <h4 className="danger">{errors.password}</h4>
                    )}
                </Form.Group>
            </Form.Row>


            <Button variant="primary" type="submit" onClick={loginUser}>
                Iniciar
            </Button>
    </div>
    )
}
