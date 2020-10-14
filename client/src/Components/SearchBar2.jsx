import React, {useState } from 'react';
import Catalogo2 from './CatalogoComp';
import axios from 'axios';
import Search from './SearchComp';
import Nav from '../Containers/Nav';

export default function SearchBar2({onSearch, resultados}){

return(
  <div>
    <div>
      <Search funcion={onSearch} productos={resultados} />
    </div>
  </div>
)

}