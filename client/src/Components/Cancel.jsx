import React from 'react';
import { NavLink } from 'react-router-dom'


function Cancel() {
  return (
    <div >
      <h1>Pedido CANCELADO</h1>
      <NavLink to='/' style={{ marginRight: 15 }}>Volver al inicio</NavLink>
      <NavLink to='/products' style={{ marginRight: 15 }}>Volver al catalogo</NavLink>
    </div>
  );
};

export default Cancel;
