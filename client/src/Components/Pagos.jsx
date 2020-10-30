import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



function Pagos() {

const [exito, setExito] = useState()    // ACA HAY Q RECIBIR EL OK O EL PROBLEMA Q HUBO CON EL PAGO O DESDE EL SERVIDOR.
const [error, setError] = useState()

var years = []
for(var i = 2020; i < 2050; i++) {
       years.push(i)
}
     
function handlePayment() {
    //axios o no se que a la tarjeta de credito a ver si entra el pago
    var axios = true    // en caso de recibir exitosamente el pago  //PONER FALSE PARA VER EL OTRO RENDERIZADO
    if(axios) {
       return setExito(true)   
    } else {
        setError(true)
    }
}
    

  return (
    <div style={{width: 700, margin: 'auto'}} >
 {!exito &&    
     <form>
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
  <button onClick={() => handlePayment()} type="button" class="btn btn-success">Confirmar compra</button>
</form>
}
{ error &&
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
{ exito &&
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

