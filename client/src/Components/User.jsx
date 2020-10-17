import React, { useState, useEffect } from 'react';
import { Form,Button, Col } from 'react-bootstrap';

export default function User (){
    const [input, setInput] = useState( {
        name: "",
        email: "",
        password: "",
    })

    const [errors, setErrors] =useState({
        name: 'Nombre requerido',
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
    if (!input.email){
        errors.email =  "Email requerido";
      }else if(!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(input.email)){
        errors.email = "Formato invalido de email (nombre-email @ nombre-servicio.com)";
      }
    console.log(!errors);
    return errors;
  };
   
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
            <Form.Group controlId="formGridAddress1">
                <Form.Label >Nombre </Form.Label>
                < Form.Control onChange={handleInputChange} name="name"  value={input.name} placeholder="Ingrese Nombre" />
                {!errors.name  ? <p> </p> : <p>{errors.name}</p>}
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label >Email</Form.Label>
                <Form.Control onChange={handleInputChange}  name="email" value={input.email} type="email" placeholder="Ingrese email" />
                {!errors.email ? <p> </p> : <p>{errors.email}</p>}
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label > Contraseña</Form.Label>
              <Form.Control onChange={handleInputChange}  name="password" value={input.password} type="password" placeholder="Contraseña" />
              {!errors.password ? <p> </p> : <p>{errors.password}</p>}
            </Form.Group>
        </Form.Row>
            <Button enabled={!errors} onClick={addUser} variant="primary" type="submit">
                Registrarse
            </Button>       
      </div>
    )
};


// import React, { useState, useEffect } from 'react';
// import { Form, Col, Row, Button } from 'react-bootstrap';

// export default function UserNuevo (){

//   const [ errors, setErrors] = useState({});


//   function validate(input) {
//     let errors = {};
//     if (!input.name) {
//       errors.name = ' Name is required';
//     } else if (input.name.length < 3) {
//       errors.name = ' Name is invalid (more than 3 characters)';
//     }
//     if (!input.price){
//       errors.price =  "Price is required";
//     }else if(!typeof(parseFloat(input.price) == "NaN")){
//       errors.price = "Price is not a number";
      
//     }else if(parseFloat(input.price) < 0){
//       errors.price = "Price has to be major to 0";
    
//     }else if(!/^\d+(\.\d{1,2})?$/.test(input.price)){
//       errors.price = "Price Format Invalid(Format valid (Number.Number))";
//     }
//     if (!input.stock){
//       errors.stock =  "Stock is required";
//     // }else if(!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(input.password)){
//     }else if(!typeof(parseFloat(input.stock) === "number")){
//       errors.stock = "Stock is not a number";
    
//     }else if(parseFloat(input.stock) < 0){
//       errors.stock = "Stock has to be major to 0";
//     }else if(!/^\d+(\.\d{1,2})?$/.test(input.stock)){
//       errors.stock = "Stock Format Invalid(Format valid (Number.Number))";
//     }
  
  
//     return errors;
//   };  
    
    


//     return (
//         <Form>
//             <Form.Group controlId="formGridAddress1">
//                 <Form.Label>Address</Form.Label>
//                 <Form.Control placeholder="1234 Main St" />
//             </Form.Group>
//             <Form.Row>
//                 <Form.Group as={Col} controlId="formGridEmail">
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control type="email" placeholder="Enter email" />
//                 </Form.Group>

//                 <Form.Group as={Col} controlId="formGridPassword">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control type="password" placeholder="Password" />
//                 </Form.Group>
//             </Form.Row>


// {/* 
//             <Form.Row>
//                 <Form.Group as={Col} controlId="formGridCity">
//                 <Form.Label>City</Form.Label>
//                 <Form.Control />
//                 </Form.Group>

//                 <Form.Group as={Col} controlId="formGridState">
//                 <Form.Label>State</Form.Label>
//                 <Form.Control as="select" defaultValue="Choose...">
//                     <option>Choose...</option>
//                     <option>...</option>
//                 </Form.Control>
//                 </Form.Group>

//                 <Form.Group as={Col} controlId="formGridZip">
//                 <Form.Label>Zip</Form.Label>
//                 <Form.Control />
//                 </Form.Group>
//             </Form.Row> */}

//             <Form.Group id="formGridCheckbox">
//                 <Form.Check type="checkbox" label="Check me out" />
//             </Form.Group>

//             <Button variant="primary" type="submit">
//                 Submit
//             </Button>
//     </Form>
//     )
// }