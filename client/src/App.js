import React from 'react';

import perros from './imagenes/perros.jpg'
import gatos from './imagenes/gatos.jpg'
// import perro from './imagenes/dogChowPerro.jpg'
// import gato from './imagenes/razaGatos.jpg'
// import comida from './imagenes/comida.jpg'
import './App.css';
import Product from './Components/Product';
import ProductCard from './Components/ProductCard';
import {
  BrowserRouter,
  Route,
  Link
} from "react-router-dom";
import SearchBar from './Components/SearchBar';

import MostrarCatalogo from './Containers/Catalogo2'
import Nav from './Containers/Nav'
import SearchBar2 from './Components/SearchBar2'
import Catalogo from './Components/CatalogoComp';
// import CrudProduct from './Components/crudProduct'; 
import CategoryPerro from './Containers/Categorias';


// var productos = [
//   {cat: 'perros', id:1,name: "Eukanuba Small", description: "Hola soy un perro" , price: "$850", stock:"60", imagen: "https://mascotaselmolino.com.ar/3868/eukanuba-adulto-small-breed.jpg"},
//   {cat: 'gatos', id:2,name: "CatChow", description: "Hola soy un gato", price: "$750", stock:"45", imagen: "https://www.chedraui.com.mx/medias/7501072202246-00-CH1200Wx1200H?context=bWFzdGVyfHJvb3R8MTQ4NjIzfGltYWdlL2pwZWd8aDk2L2hmYi85ODk1MTk1NzM4MTQyLmpwZ3xjMGM5ZjEwYjI2ODg3ZThhOGYyZGEzNWQ3ZWZhMDNmMzk5MDgyZmM5ZmRlNjVmM2Y2YzZhZjczMDJlYzZkYjk0"},
//   {cat: 'perros', id:3,name: "dddddd", description: "Hola soy un perro", stock:"30", price: "250"},
//   {cat: 'gatos', id:4,name: "aaa", description: "Hola soy un gato", stock:"20", price: "10000"}
// ]

// var categ = ['perros', 'gatos']

function App() {
  // const [products,setProducts] = useState(productos)
  
  return (
    <div className="App">
      <BrowserRouter>
      <div className="searchBar">
        <Route path="/" render={() => 
          <Nav />}
          />
        {/* <Route path='/products/search' render={() => 
          <SearchBar2 />}
          /> */}
        <Route exact path="/products" component={MostrarCatalogo} />
        <Route exact path="/products/perros" component={CategoryPerro} />
        <Route exact path="/">

          <div className="pedigree">
            <ProductCard name="Perros" imagen={perros}/>
          </div>
          
          <div className="pedigree">
            <ProductCard name="Gatos" imagen={gatos}/>
          </div>
        </Route>
        </div>
          <div className="product"></div>
        <div className="productoSolo">
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
