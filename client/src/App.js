import React, {useState} from 'react';
import StyleApp from './App.module.css';
import Product from './Components/Product';
import ProductCard from './Components/ProductCard';
import { BrowserRouter, Route, Link} from "react-router-dom";
import MostrarCatalogo from './Containers/Catalogo2'
import Nav from './Containers/Nav'
import AgregarCategoria from './Containers/Post';
import CrudProduct from './Components/crudProduct'; 
import CategoryPerro from './Containers/Categorias';
import Categoria2 from './Containers/Categoria2';
import SearchBar2 from './Components/SearchBar2';
import Catalogo from './Components/CatalogoComp';
import Modifica from './Containers/Put';
import ProductoSolo from './Components/ProductoSolo'

function App() {
  const [products,setProducts] = useState()

  return (
    <div className= {StyleApp.App}>
      <BrowserRouter>
      <div>
        <Route path="/" render={() =>  <Nav />} />
        <div className= {StyleApp.padding}>
          
          <Route exact path="/" component={Categoria2} />
          <Route exact path="/products" component={MostrarCatalogo} />
          <Route exact path="/products/Perros" component={CategoryPerro} />
          <Route exact path="/" />
          <Route path="/AgregarCategoria"  render={() =><AgregarCategoria/>}/>  
          <Route path='/AgregarProducto/' render={() => <CrudProduct/>}/>
          <Route path='/ModificarProducto/' render={() => <Modifica/>}/>
          <Route exact path={`/producto/:Id`} render={({ match }) =>  <ProductoSolo Id={match.params.Id}/>}/>
          {/* <Route path='/products/search' render={() => <SearchBar2 /> }/> */}
        </div>
      </div> 
      </BrowserRouter>  
    </div>
  );
}


export default App;
