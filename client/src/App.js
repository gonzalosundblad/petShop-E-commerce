import React, {useState} from 'react';
import StyleApp from './App.module.css';
import { BrowserRouter, Route} from "react-router-dom";
import MostrarCatalogo from './Containers/Catalogo'
import Nav from './Containers/Nav';
import CrudProduct from './Components/crudProduct';
import {MostrarCategorias} from './Containers/Categorias';
import {ProductosPorCategoria} from './Containers/Categorias';
import {BorrarCategoria} from './Containers/Categorias';
import {AgregarCategoria} from './Containers/Categorias';
import Modifica from './Containers/Put';
import axios from 'axios';
import Product from './Components/Product';
import Catalogo from './Components/CatalogoComp';
import {search} from './Redux/actions'
// import ProductoSolo from './Containers/ProductoSolo';

function App() {
  // const [products,setProducts] = useState()
  const [resultados, setResultados] = useState([]);
  // useEffect(() => {
  //   search(producto).payload
  //   .then(resp => setResultados(resp.data))
  // }, []);
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
        <Route path="/" render={() =>  <Nav onSearch={onSearch}  />} />
        <div className= {StyleApp.padding}>
          <Route exact path='/' render = {() => <Catalogo productos = {resultados} /> } />
          <Route exact path='/' component={MostrarCategorias}/>
          <Route exact path='/BorrarCategoria' render={() => <BorrarCategoria/>}/>
          <Route exact path="/products" component={MostrarCatalogo} />
          <Route exact path="/AgregarCategoria"  render={() =><AgregarCategoria/>}/>  
          <Route exact path='/AgregarProducto/' render={() => <CrudProduct/>}/>
          <Route path='/ModificarProducto/' render={() => <Modifica/>}/>
          <Route exact path={`/products/:Categoria`} render={({match}) => <ProductosPorCategoria name={match.params.Categoria}/>}/>
          <Route exact path={`/producto/:Id`} render={({ match }) => <Product id2={match.params.Id} />}/>
          <Route exact path="/products/crud/:id" render={({ match }) => <CrudProduct prod={match.params.id} /> } />
        </div>
      </div>
      </BrowserRouter>
    </div>
  );
}


export default App; 
