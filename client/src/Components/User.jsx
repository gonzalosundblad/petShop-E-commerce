import React, { useState, useEffect } from 'react';
import { Form,Button, Col } from 'react-bootstrap';

export default function User (){
    const [input, setInput] = useState( {
        name: "",
        lastname: "",
        password: "",
        adress: "",
        email: "",
        dni: "",
    })

    const [errors, setErrors] =useState({
        name: 'Nombre requerido',
        lastname: 'Apellido requerido',
        password: 'Password requerido',
        email: 'Email requerido',
        
    })

    useEffect(()  => {
    })
    
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

  function validate(input) {
      console.log(input)
    let errors = {};
    // Control nombre
    if (!input.name || typeof(input.name)=== "undefined") {
      errors.name = 'Nombre requerido';
    } else if (input.name.length < 3) {
      errors.name = 'Nombre requerido';
    }

    //Control Nombre
    if (!input.lastname) {
        errors.lastname = 'Apellido requerido';
    } else if (input.lastname.length < 3) {
        errors.lastname = 'Apellido requerido';
    }
    //Control Apellido
    if (!input.password){
      errors.password =  "Contraseña requerida";
    }else if(!/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/.test(input.password)){
      errors.password = "La contraseña de contener al menos 1 mayúscula, 1 minúscula, 1 dígito, 1 carácter especial y tener una longitud de al menos 8";
    }
    //Control Email
    if (!input.email){
        errors.email =  "Email requerido";
      }else if(!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(input.email)){
        errors.email = "Formato invalido de email (nombre-email @ nombre-servicio.com)";
      }
    // else if(parseFloat(input.price) < 0){
    //   errors.price = "Price has to be major to 0";
    
    // }else if(!/^\d+(\,\d{1,8})?$/.test(input.price)){
    //   errors.price = "Price Format Invalid(Format valid (Number.Number))";
    // }
    // if (!input.stock){
    //   errors.stock =  "Stock is required";
    // // }else if(!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(input.password)){
    // }else if(!typeof(parseFloat(input.stock) === "number")){
    //   errors.stock = "Stock is not a number";
    
    // }else if(parseFloat(input.stock) < 0){
    //   errors.stock = "Stock has to be major to 0";
    // }else if(!/^\d+(\.\d{1,2})?$/.test(input.stock)){
    //   errors.stock = "Stock Format Invalid(Format valid (Number.Number))";
    // }
      console.log(!errors);
  
    return errors;
  };

//   

function addUser(e){
    // if (typeof(errors) ==="undefined"){
    //     alert("No hay datos cargados")
    // }
    // else if(!errors){
    //     console.log(errors)
    // alert(`${errors.name} ${<br/>} ${errors.apellido}` ) 
    // }
    // else(
        console.log("aca va la acción")
        // )

}
    return (
        <div>
            <Form.Row>
                <div>
                    <Form.Group controlId="formGridAddress1">
                        <Form.Label >Ingrese Nombre </Form.Label>
                        < Form.Control onChange={handleInputChange} name="name"  value={input.name} placeholder="Nombre" />
                        {!errors.name  ? <p> </p> : <p>{errors.name}</p>}
                    </Form.Group>
                    <Form.Group controlId="formGridAddress1">
                        <Form.Label >Ingrese Apellido</Form.Label>
                        < Form.Control onChange={handleInputChange} name="lastname"  value={input.lastname} placeholder="Apellido" />
                        {!errors.lastname  ? <p> </p> : <p>{errors.lastname}</p>}
                    </Form.Group>
                </div>
                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label > Password</Form.Label>
                    <Form.Control onChange={handleInputChange}  name="password" value={input.password} type="password" placeholder="Contraseña" />
                {!errors.password ? <p> </p> : <p>{errors.password}</p>}
                </Form.Group>
            </Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label >Email</Form.Label>
                    <Form.Control onChange={handleInputChange}  name="email" value={input.email} type="email" placeholder="Enter email" />
                {!errors.email ? <p> </p> : <p>{errors.email}</p>}
                </Form.Group>

            <Form.Group controlId="formGridAddress">
                <Form.Label>Direccion: </Form.Label>
                <Form.Control placeholder="1234 Main St" />
            </Form.Group>
            <Button enabled={!errors} onClick={addUser} variant="primary" type="submit">
                Submit
            </Button>
            
    </div>
    )
}