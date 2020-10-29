import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function CheckoutNoLog() {
    return (
      <div style={{width: 700, margin: 'auto'}} >
       
  
  
  <form>
    
    <div class="form-row">
  
    <div class="form-group col-md-6">
        <label for="inputState">Envio</label>
        <select id="inputState" class="form-control">
          <option selected>Elija un metodo de envio</option>
                  <option>Envio CABA y alrededores</option>
                  <option>Envio GBA y resto del pais</option>
                  <option>Retiro por sucursal ANDREANI</option>
        </select>
      </div>
  
      <div class="form-group col-md-6">
        <label for="inputPassword4">Email</label>
        <input type="password" class="form-control" id="inputPassword4" placeholder='Ingrese su email' />
      </div>
      <div class="form-group col-md-6">
        <label for="inputEmail4">Nombre</label>
        <input type="email" class="form-control" id="inputEmail4" placeholder='Ingrese su nombre' />
      </div>
      <div class="form-group col-md-6">
        <label for="inputPassword4">Apellido</label>
        <input type="password" class="form-control" id="inputPassword4" placeholder="Ingrese su apellido" />
      </div>
    </div>
  
    <div class="form-row">
  
  <div class="form-group col-md-6">
    <label for="inputAddress">Direccion</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="Avenida Siempreviva 742"/>
  </div>
  <div class="form-group col-md-2">
    <label for="inputAddress2">Piso y dpto</label>
    <input type="text" class="form-control" id="inputAddress2" placeholder="1A"/>
  </div>
  <div class="form-group col-md-2">
      <label for="inputZip">Codigo Postal</label>
      <input type="text" class="form-control" id="inputZip"/>
    </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputCity">Ciudad</label>
      <input type="text" class="form-control" id="inputCity"/>
    </div>
    <div class="form-group col-md-6">
      <label for="inputState">Provincia</label>
      <select id="inputState" class="form-control">
        <option selected>Ingrese su provincia</option>
                <option>CABA</option>
                <option>Buenos Aires</option>
                <option>Santa Fe</option>
                <option>Cordoba</option>
                <option>Mendoza</option>
                <option>Santiago del Estero</option>
                <option>La Pampa</option>
                <option>Entre Rios</option>
                <option>Corrientes</option>
                <option>Tucuman</option>
                <option>San Luis</option>
                <option>Formosa</option>
                <option>Chaco</option>
                <option>Misiones</option>
                <option>Catamarca</option>
                <option>Jujuy</option>
                <option>Salta</option>
                <option>San Juan</option>
                <option>La Rioja</option>
                <option>Neuquen</option>
                <option>Rio Negro</option>
                <option>Chubut</option>
                <option>Santa Cruz</option>
                <option>Tierra del Fuego</option>
      </select>
    </div>
    
  </div>
  </div>
    <hr/>
    <button type="submit" class="btn btn-primary">Continuar</button>
  </form>
      </div>
    );
  };

export default CheckoutNoLog;
