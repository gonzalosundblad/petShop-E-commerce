import React, { useState, useEffect } from 'react';

import StyleApp from './App.module.css';
import { BrowserRouter, Route} from "react-router-dom";
import MostrarCatalogo from './Containers/Catalogo2'
import Nav from './Containers/Nav'
import AgregarCategoria from './Containers/Post';
import CrudProduct from './Components/crudProduct';
import CategoryPerro from './Containers/Categorias';
import Categoria2 from './Containers/Categoria2';
import Modifica from './Containers/Put';
import axios from 'axios';
import Catalogo from './Components/CatalogoComp'
import {getProducts} from './redux/actions.js'

function App() {
  const [products,setProducts] = useState()
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    getProducts()

      }, []);

  function onSearch(producto) {
       axios.get(`http://localhost:3001/search?products=${producto}`)
          .then(r =>{
              const array = r.data;
              setResultados(array);
              if(array.length === 0){
                return alert('No se encontraron resultados')}
          })}
  return (
    <div className= {StyleApp.App}>
      <BrowserRouter>
      <div>
        <Route path="/" render={() =>  <Nav onSearch={onSearch} productos={resultados} />} />
        <div className= {StyleApp.padding}>
          <Route path="/" render = {() => <Catalogo productos = {resultados} /> } />
          <Route exact path="/" component={Categoria2} />
          <Route exact path="/products" component={MostrarCatalogo} />
          <Route exact path="/products/Perros" component={CategoryPerro} />
          <Route path="/AgregarCategoria"  render={() =><AgregarCategoria/>}/>
          <Route path='/AgregarProducto/' render={() => <CrudProduct/>}/>
          <Route path='/ModificarProducto/' render={() => <Modifica/>}/>
          {/* <Route path='/products/search' render={() => <SearchBar2 /> }/> */}
        </div>
      </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
