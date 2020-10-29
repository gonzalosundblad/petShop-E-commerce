import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

var years = []
for(var i = 2020; i < 2050; i++) {
   years.push(i)
}


function Pagos() {
  return (
    <div style={{width: 700, margin: 'auto'}} >
     
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
  </div>
  <button type="button" class="btn btn-success">Confirmar compra</button>

</form>
    </div>
  );
};

export default Pagos;
