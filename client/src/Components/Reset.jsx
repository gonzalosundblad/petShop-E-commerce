import React, { useEffect } from 'react'
import { useState } from 'react';
import { postPass } from '../Redux/actionsOrden';

export default function Reset() {

  const [input, setInput] = useState({
    id: "",
    password: ""
  })

  const handleChange = function (e) {
    setInput({
      ...input,
      id: e.target.value
    });
  }
  const handleChange2 = function (e) {
    setInput({
      ...input,
      password: e.target.value
    });
  }

  function reset() {
    postPass(input.id, input.password).payload
      .then(resp => {
        console.log(resp.data);
        window.location.href = '/login'
      })
  }


  console.log(input);

  return (
    <div>
      <label>Id: </label>
      <input id="id" type="number" description="email" onChange={handleChange} />
      <label>Contraseña: </label>
      <input id="password" type="password" description="password" onChange={handleChange2} />
      <button onClick={reset} >Cambiar</button>
    </div>
  )
}