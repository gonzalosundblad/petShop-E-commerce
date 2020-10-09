import React, { useState } from 'react';


export default function CrudProduct(){
  const [ crudProd, setCrudProd ] = useState()

  return(
    <form>
      <input type="text" placeholder="Nombre"/>
      <input type="text" placeholder="Descripcion"/>
      <input type="text" placeholder="Stock"/>
      <input type="text" placeholder="Precio"/>
      <input type="image" value="Subir Imagen" />
      <input type="submit" value="Agregar"/>
    </form>
  )
}