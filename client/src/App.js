import React from 'react';
import perros from './imagenes/perros.jpg'
import gatos from './imagenes/gatos.jpg'
import './App.css';
import Product from './Components/Product';
import ProductCard from './Components/ProductCard';
import { BrowserRouter, Route, Link} from "react-router-dom";
import SearchBar from './Components/SearchBar';
import MostrarCatalogo from './Containers/Catalogo2'
import Nav from './Containers/Nav'
import SearchBar2 from './Components/SearchBar2'
import Catalogo from './Components/CatalogoComp';
// import CrudProduct from './Components/crudProduct'; 
import CategoryPerro from './Containers/Categorias';
import Categoria2 from './Containers/Categoria2';


function App() {
  // const [products,setProducts] = useState(productos)
  return (
    <div className="App">
      <BrowserRouter>
      <div className="searchBar">
        <Route path="/" render={() =>  <Nav />} />
        <Route exact path="/" component={Categoria2} />
        <Route exact path="/products" component={MostrarCatalogo} />
        <Route exact path="/products/Perros" component={CategoryPerro} />
        <Route exact path="/">

          {/* <div className="pedigree">
            <ProductCard name="Perros" imagen={perros}/>
          </div>
          
          <div className="pedigree">
            <ProductCard name="Gatos" imagen={gatos}/>
          </div> */}
        </Route>
        </div>
          <div className="product"></div>
        <div className="productoSolo">
        <Route exact path='/products/:prodId' render={({ match }) => 
        <Product produc={match.params.prodId}/>
        }/>
        </div> 
      </BrowserRouter>  
    </div>
  );
}

// Axios({
//   method: "GET",
//   url: "http://localhost:5000/",
//   headers: {
//     "Content-Type": "application/json"
//   }
// }).then(res => {
//   console.log(res.data.message);
// });

export default App;
