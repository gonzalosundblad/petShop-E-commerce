import React, { useEffect } from 'react'
import { useState } from 'react';
import { postPass } from '../Redux/actionsOrden';

export default function Reset() {

  const [input, setInput] = useState({
    email: "",
    password: ""
  })

  const handleChange = function (e) {
    setInput({
      ...input,
      email: e.target.value
    });
  }
  const handleChange2 = function (e) {
    setInput({
      ...input,
      password: e.target.value
    });
  }

  function reset() {
    postPass(input.email, input.password).payload
      .then(resp => {
        console.log(resp.data);
      })
  }


  console.log(input);

  return (
    <div>
      <label>Email: </label>
      <input id="email" type="email" description="email" onChange={handleChange} />
      <label>Contraseña: </label>
      <input id="password" type="password" description="password" onChange={handleChange2} />
      <button onClick={reset} >Cambiar</button>
    </div>
  )
}