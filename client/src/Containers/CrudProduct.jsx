import React, { useState, useEffect } from "react";
import axios from 'axios';
import {putId, getProducts, deleteProduct, getCategories } from '../Redux/actions.js'
import { Form, Col, Row, Button, Carousel } from 'react-bootstrap';
import Estilo from '../Estilos/ModificarProd.module.css'
import Estilos from '../Estilos/AgregarProd.module.css'
import firebase, { storage } from 'firebase';
import {getProductsRequest} from '../Redux/actions';
import {connect} from 'react-redux'

export function CrudProduct( ){
    const [ input, setInput ] = useState({
      name: "",
      description: "",
      stock: "",
      price: "",
      image: "",
      categoryId: 1,
    })
    const [ errors, setErrors] = useState({});
    const [ categories, setCategories ] = useState([]);


    function getIdCategory(event) {
      // event.preventDefault();

      let x = categories[event.target.selectedIndex]
      setInput({
        ...input,
        categoryId: x.id,
      });

    }


    useEffect(() => {
     function searchCategories() {
      getCategories().payload
      .then(resp => setCategories(resp.data))
    }
      searchCategories();
    }, []);

    function validate(input) {
        let errors = {};
        if (!input.name) {
          errors.name = 'El nombre del producto es obligatorio';
        } else if (input.name.length < 8) {
          errors.name = 'El nombre del producto es invalido (debe tener mas de 8 caracteres)';
        }
        if (!input.price){
          errors.price =  "El precio es requerido";
        }else if(!typeof(parseFloat(input.price) == "NaN")){
          errors.price = "El precio debe ser un numero";

        }else if(parseFloat(input.price) < 0){
          errors.price = "El precio debe ser mayor a $0";

        }else if(!/^\d+(\.\d{1,2})?$/.test(input.price)){
          errors.price = "Formato invalido(Formato valido (Number.Number))";
        }
        if (!input.stock){
          errors.stock =  "El stock debe ser al menos de 1";
        // }else if(!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(input.password)){
        }else if(!typeof(parseFloat(input.stock) === "number")){
          errors.stock = "El stock debe ser un numero";

        }else if(parseFloat(input.stock) < 0){
          errors.stock = "El numero tiene que ser mayor a 0";
        }else if(!/^\d+(\.\d{1,2})?$/.test(input.stock)){
          errors.stock = "Formato invalido(Formato valido (Number.Number))";
        }
        return errors;
      };

    const handleInputChange = function(e) {
      setInput({
        ...input,
        [e.target.name]: e.target.value
      });
      setErrors(validate({
        ...input,
        [e.target.name]: e.target.value
      }));
    }

    function handleUpload (e) {
      const file = e.target.files[0];
      // var x = e.target.value.slice(12)
      // console.log(e.target.name);
      // console.log(e.target)
      const storageRef = firebase.storage().ref(`/fotosProductos/${file.name}`);
      // const storageRef = firebase.storage().ref(`/fotosProductos/${file.name}`).getDownloadURL().then((url) => { var myUrl = url})
      // ESTO DE ARRIBA ES PARA MANDAR MAS PROLIJAMENTE LA URL A LA BASE DE DATOS. DEBERIA DISPARARSE UNA ACTION Q MANDE LA var myUrl en vez de semihardocdear en la ruta de product
      storageRef.put(file);
      // console.log(storageRef)
      setInput({
        ...input,
        [e.target.name]: e.target.value
      });
    }

    function handleSubmit() {
      // console.log(!errors.name && !errors.stock && !errors.price);

     return(!errors.name  && !errors.stock && !errors.price );

      }


    return(
      <div class="container">
        <form onSubmit={(e) => {
          e.preventDefault();
          axios.post(`http://localhost:3001/products/`,  input )
            .then(res => {
              console.log(res);
              console.log(res.data);
              setInput({
                name: "",
                description: "",
                stock: "",
                price: "",
                image: "",
                categoryId: 1,

              })
            })
          }}>

          <fieldset>

            <legend>Agregar Productos</legend>

            <div class="form-group">
              <fieldset>
                <label class="control-label" for="readOnlyInput">Nombre del Producto</label>
                <input 
                  class="form-control" 
                  type="text" 
                  placeholder="Nombre..." 
                  autoComplete="false" 
                  value={input.name} 
                  onChange={handleInputChange} 
                  name="name"/>
              </fieldset>
              {!errors.name ? null : <p className="danger">{errors.name}</p>}
            </div>

            <div class="form-group">
              <label for="exampleSelect1">Categoria</label>
              <select class="form-control" id="exampleSelect1" as="select" name="categoryId" onChange={e => getIdCategory(e)}>
                {categories.map((category, i) => <option key={category.id} id={i} >{category.name}</option>)}
              </select>
            </div>

            <div class="form-group">
              <fieldset>
                <label class="control-label" for="readOnlyInput">Stock</label>
                <input class="form-control"
                  min="0" 
                  type="number" 
                  placeholder="Stock..."
                  autoComplete={false} 
                  value={input.stock} 
                  onChange={handleInputChange} 
                  name="stock"/>
              </fieldset>
            </div>
            {!errors.stock ? null : <p className="danger">{errors.stock}</p>}

            <div class="form-group">
              <label class="control-label">Precio</label>
              <div class="form-group">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">$</span>
                  </div>
                  <input 
                    type="text" 
                    class="form-control" 
                    placeholder="$$$$$$" 
                    aria-label="Amount (to the nearest dollar)"
                    autoComplete={false}  
                    value={input.price} 
                    onChange={handleInputChange} 
                    name="price" />
                  <div class="input-group-append">
                    <span class="input-group-text">.00</span>
                  </div>
                </div>
              </div>
            </div>
            {!errors.price ? null : <p className="danger">{errors.price} </p>}

            <div class="form-group">
              <label for="exampleTextarea">Descripcion</label>
              <textarea 
                class="form-control" 
                id="exampleTextarea" 
                rows="3" 
                autoComplete={false} 
                value={input.description} 
                onChange={handleInputChange} 
                name="description" />
            </div>

            <label for="exampleTextarea">Agregar Imagen</label>

            <div class="form-group">
              <input 
                type="file" 
                class="btn btn-primary" 
                id="exampleInputFile" 
                aria-describedby="fileHelp"
                value={input.image} 
                onChange={handleUpload}  
                name="image" 
                accept="image/png, .jpeg, .jpg, image/gif"/>
            </div>

            <button type="submit" class="btn btn-primary" enabled={!handleSubmit()} variant="primary">Agregar</button>
          </fieldset>
        </form>
      </div>
    )
};

var firebaseConfig = {                                        //agrega productos
  apiKey: "AIzaSyBE3Y03cTrnOwM9DkcGpUklWYkjESBaH3A",
  authDomain: "petshopfiles.firebaseapp.com",
  databaseURL: "https://petshopfiles.firebaseio.com",
  projectId: "petshopfiles",
  storageBucket: "petshopfiles.appspot.com",
  messagingSenderId: "332756429714",
  appId: "1:332756429714:web:fbfb632f36b580b7682f4b",
  measurementId: "G-Q2NHZVYZ1F"
};

const mapStateToProps = state => {
  return {
    products: state.reducer.products
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getProductsRequest: () => dispatch(getProductsRequest())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CrudProduct)
