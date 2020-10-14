import React, {useState} from 'react';
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
import Product from './Components/Product';
function App() {
  const [products,setProducts] = useState()
  const [resultados, setResultados] = useState([]);
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
          <Route exact path="/products/category/:name" render={({ match }) => <CategoryPerro name={match.params.name}/>} />
          <Route path="/AgregarCategoria"  render={() =><AgregarCategoria/>}/>
          <Route path='/AgregarProducto/' render={() => <CrudProduct/>}/>
          <Route path='/ModificarProducto/' render={() => <Modifica/>}/>
          <Route exact path='/products/:id' render={({ match }) => <Product id2={match.params.id} />}/>
          {/* <Route path='/products/search' render={() => <SearchBar2 /> }/> */}
        </div>
      </div>
      </BrowserRouter>
    </div>
  );
}
<<<<<<< HEAD
export default App;
=======


export default App; 
>>>>>>> bf5f2829cfff4b3961d501bc02dcda5d097acb9a
