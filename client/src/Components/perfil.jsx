import React from 'react';
import { useState, useEffect } from 'react';
import {getUser} from '../Redux/actionsOrden'

export default function Perfil (id){
  const [users, setUsers] = useState([])
  const [usuario, setUsuario] = useState ({});

    const id2 = id.id
    console.log(id2)

  useEffect(() => {
    getUser().payload
    .then((resp) => {
      console.log(resp.data)
      setUsers(resp.data)
    }
    )
  }, [])

  function usuarios(){
    users.map((user) => {
      if( user.id === id2){
        console.log("hola")
       }
  })
 }
 
  usuarios()

  return(
    <div>
      <div>
        <h1>Hola </h1>
      </div>
    </div>
  )
}

