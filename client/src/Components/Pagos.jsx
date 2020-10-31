import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';



function Pagos() {

// const [exito, setExito] = useState()    // ACA HAY Q RECIBIR EL OK O EL PROBLEMA Q HUBO CON EL PAGO O DESDE EL SERVIDOR.
// const [error, setError] = useState()

const [showError, setShowError] = useState(false);
const [messageFromServer, setMessage] = useState('');
const [waiting, setWaiting] = useState(false);
const [success, setSuccess] = useState(false);


var email = 'sundbladgonzalo@gmail.com' //pedirlo por props a componente checkout

var years = []
for(var i = 2020; i < 2050; i++) {
       years.push(i)
}
     

async function pedirPago(e) {
    e.preventDefault();
    
    setWaiting(true);
    setShowError(false);

    try {
        const response = await axios.post(
          'http://localhost:3001/checkout',
          {
            email, // agregar resumen de compra: precio final, productos, direccion de envio, tarjeta con la q se pago, tipo de envio
          },
        );
        console.log(response.data);
        if (response.data === 'checkout email sent') {
        setShowError(false);
        setMessage('checkout email sent');
        setWaiting(false);
        setSuccess(true);
        } else{
            setTimeout(() => setShowError(true), 3000); // le pongo setTimeout para simular q tarda en recibir el error del banco en el pago
            setTimeout(() => setWaiting(false), 3000);
        }
      } catch (error) {
        console.error(error.response.data);
        if (error.response.data === 'email not in db') {
          setShowError(true);
          setMessage('');
          setWaiting(false);
          setSuccess(false)
        }
      }

}
    

  return (
    
    <div style={{width: 700, margin: 'auto'}} >
        <p>******mostrar card con los datos ingresados en la pag anterior. pedirlos por props******</p>
 {!success &&    
     <form onSubmit={pedirPago}>
  <div class="form-group">
    <label for="exampleFormControlSelect1">Su tarjeta de credito</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Visa</option>
      <option>Mastercard</option>
      <option>American Express</option>
    </select>
  </div>
  <div class="form-group">
    <label for="exampleFormControlInput1">Nro de tarjeta</label>
    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="xxxx xxxx xxxx xxxx"/>
  </div>
<div class="form-row">
  <div class="form-group col-md-4">
    <label for="exampleFormControlSelect1">Fecha de vencimiento</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Enero</option>
      <option>Febrero</option>
      <option>Marzo</option>
      <option>Abril</option>
      <option>Mayonesa</option>
      <option>Junio</option>
      <option>Julio</option>
      <option>Agosto</option>
      <option>Septiembre</option>
      <option>Octubre</option>
      <option>Noviembre</option>
      <option>Diciembre</option>      
    </select>
  </div>
  <div class="form-group col-md-2">
    <label for="exampleFormControlSelect1">Año</label>
    <select class="form-control" id="exampleFormControlSelect1">
     {years.map(year => (
         <option>{year}</option>
     ))}  
    </select>
  </div>
  <div class="form-group col-md-2">
    <label for="exampleFormControlInput1">CVV</label>
    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="xxx"/>
  </div>
  <p class="form-group col-md-4">poner el mismo cuadrito con resumen de compra</p>
  </div>
  <button type="submit" class="btn btn-success">Confirmar compra</button> 
</form>
}
{
    waiting && 
    <div>
        <hr/>
        <p>Procesando el pago...</p>
    </div>
}
{ showError &&
      <div>
          <hr/>
            <h4>
              Hubo un error!
            </h4>
          <hr/>
            <p>El pago no pudo ser procesado</p>
            <p>Puede intentar de nuevo o probar otro metodo de pago</p>
      </div>
  }
{ success &&
      <div>
          <hr/>
            <h2>
              Compra exitosa!
            </h2>
          <hr/>
            <p>Un mail le ha sido enviado con los detalles de su compra</p>
      </div>
  }
    </div>
  );

  

};

export default Pagos;

