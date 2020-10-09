import React, { useState } from 'react';

import perros from './imagenes/perros.jpg'
import gatos from './imagenes/gatos.jpg'
// import perro from './imagenes/dogChowPerro.jpg'
// import gato from './imagenes/razaGatos.jpg'
// import comida from './imagenes/comida.jpg'
import './App.css';
import Product from './Components/Product';
import ProductCard from './Components/ProductCard';
import Catalogo from './Containers/Catalogo';
import {
  BrowserRouter,
  Route,
  Link
} from "react-router-dom";
import SearchBar from './Components/SearchBar';
<<<<<<< HEAD
<<<<<<< HEAD
import CrudProduct from './Components/crudProduct';

var productos = [
  {cat: 'perros', id:1,name: "Eukanuba Small", description: "Hola, soy un perro" , price: "$850", stock: '100',imagen: "https://mascotaselmolino.com.ar/3868/eukanuba-adulto-small-breed.jpg"},
  {cat: 'gatos', id:2,name: "CatChow", description: "Hola, soy un gato" , price: "$750", stock: '12', imagen: "https://www.chedraui.com.mx/medias/7501072202246-00-CH1200Wx1200H?context=bWFzdGVyfHJvb3R8MTQ4NjIzfGltYWdlL2pwZWd8aDk2L2hmYi85ODk1MTk1NzM4MTQyLmpwZ3xjMGM5ZjEwYjI2ODg3ZThhOGYyZGEzNWQ3ZWZhMDNmMzk5MDgyZmM5ZmRlNjVmM2Y2YzZhZjczMDJlYzZkYjk0"},
  {cat: 'perros', id:3,name: "DogChow", description: "Hola, soy un perro" , stock: '8', price: "$650", imagen: perro},
  {cat: 'gatos', id:4,name: "Raza", description: "Hola, soy un gato" , stock: '46', price: "$900", imagen: gato}
=======
import Cate from './Components/Axios';
=======
import Cate from './Containers/Axios';
// import CrudProduct from './Components/crudProduct'; 
>>>>>>> 1394c187fde51c90a834f9a0d33ac9053a22071c

var productos = [
  {cat: 'perros', id:1,name: "Eukanuba Small", description: "Hola soy un perro" , price: "$850", stock:"60", imagen: "https://mascotaselmolino.com.ar/3868/eukanuba-adulto-small-breed.jpg"},
  {cat: 'gatos', id:2,name: "CatChow", description: "Hola soy un gato", price: "$750", stock:"45", imagen: "https://www.chedraui.com.mx/medias/7501072202246-00-CH1200Wx1200H?context=bWFzdGVyfHJvb3R8MTQ4NjIzfGltYWdlL2pwZWd8aDk2L2hmYi85ODk1MTk1NzM4MTQyLmpwZ3xjMGM5ZjEwYjI2ODg3ZThhOGYyZGEzNWQ3ZWZhMDNmMzk5MDgyZmM5ZmRlNjVmM2Y2YzZhZjczMDJlYzZkYjk0"},
  {cat: 'perros', id:3,name: "dddddd", description: "Hola soy un perro", stock:"30", price: "250"},
  {cat: 'gatos', id:4,name: "aaa", description: "Hola soy un gato", stock:"20", price: "10000"}
<<<<<<< HEAD
>>>>>>> ad6d63aa01503dc9a76c1a1a75aafa6c5abcabd1
=======
>>>>>>> 1394c187fde51c90a834f9a0d33ac9053a22071c
]

var categ = ['perros', 'gatos']

function App() {
  const [products,setProducts] = useState(productos)
  
  return (
    <div className="App">
      <BrowserRouter>
<<<<<<< HEAD
        {/* <Switch> */}
<<<<<<< HEAD
=======
       
>>>>>>> 1394c187fde51c90a834f9a0d33ac9053a22071c
        <div className="searchBar">
        
        <Route  path="/" component={SearchBar}></Route>
        <Route exact path="/">
          <li className="liProducts">
            <Link to="/products"> Catalogo </Link>
          </li>
          <div className="pedigree">
          <ProductCard name="Perros" imagen={perros}/>
          </div>
          <div className="pedigree">
          <ProductCard name="Gatos" imagen={gatos}/>
          </div>
        </Route>  
          </div>
          <div className="product">
        <Route exact path="/products" render={() => 
          <Catalogo products={products} categ={categ} />}
        />
<<<<<<< HEAD
        </div>
        <div className="productoSolo">
        <Route exact path='/products/:id' render={({ match }) => 
        <Product product={products.find(p => p.id === parseInt(match.params.id))}/>
        }/>
        </div> 
=======
        <Route path="/" component={SearchBar}></Route>
        <Route path="/" component={Cate}></Route>
        <Route exact path="/">
          <li>
            <Link to="/category"> Catalogo </Link>
          </li>
          {/* <ProductCard name="jeakja"/>  */}
        </Route>  
        <Route exact path="/category" render={() => 
          <Catalogo products={products} categ={categ} />}
        />
=======
>>>>>>> 1394c187fde51c90a834f9a0d33ac9053a22071c
        <Route exact path="/products" render={() => 
          <Cate/>}
        />
        </div>
        <div className="productoSolo">
        <Route exact path='/products/:id' render={({ match }) => 
        <Product product={products.find(p => p.id === parseInt(match.params.id))}/>
        }/>
<<<<<<< HEAD

>>>>>>> ad6d63aa01503dc9a76c1a1a75aafa6c5abcabd1
=======
        </div> 
e
>>>>>>> 1394c187fde51c90a834f9a0d33ac9053a22071c
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
