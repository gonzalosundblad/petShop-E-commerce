import React, { useState, useEffect } from "react";
import { getCategories, postProduct } from '../Redux/actions.js'
import firebase, { storage } from 'firebase';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';


export function CrudProduct({ getCategories, postProduct, categories }) {
  const [input, setInput] = useState({
    name: "",
    description: "",
    stock: "",
    price: "",
    image: "",
    categoryId: 1,
  })
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getCategories()
  }, []);
  console.log(categories, "hola");

  function getIdCategory(event) {
    // event.preventDefault();

    let x = categories[event.target.selectedIndex]
    setInput({
      ...input,
      categoryId: x.id,
    });

  }




  function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = 'Product Name is required';
    } else if (input.name.length < 3) {
      errors.name = 'Product Name is invalid (more than 3 characters)';
    }
    if (!input.price) {
      errors.price = "Price is required";
    } else if (!typeof (parseFloat(input.price) == "NaN")) {
      errors.price = "Price is not a number";

    } else if (parseFloat(input.price) < 0) {
      errors.price = "Price has to be major to 0";

    } else if (!/^\d+(\.\d{1,2})?$/.test(input.price)) {
      errors.price = "Price Format Invalid(Format valid (Number.Number))";
    }
    if (!input.stock) {
      errors.stock = "Stock is required";
      // }else if(!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(input.password)){
    } else if (!typeof (parseFloat(input.stock) === "number")) {
      errors.stock = "Stock is not a number";

    } else if (parseFloat(input.stock) < 0) {
      errors.stock = "Stock has to be major to 0";
    } else if (!/^\d+(\.\d{1,2})?$/.test(input.stock)) {
      errors.stock = "Stock Format Invalid(Format valid (Number.Number))";
    }
    return errors;
  };

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));
  }

  function handleUpload(e) {
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

    return (!errors.name && !errors.stock && !errors.price);

  }


  return (
    <div class="container" style={{ display: "flex", justifyContent: "center" }} >
      <form style={{ width: "80%", border: "solid 1px" }}
        onSubmit={(e) => {
          e.preventDefault();
          postProduct(input)
          setInput({
            name: "",
            description: "",
            stock: "",
            price: "",
            image: "",
            categoryId: 1,
          })
        }}>
        <fieldset>
          <legend>Agregar Productos</legend>
          <div class="form-group" >
            <fieldset>
              <div style={{ display: "flex", flexDirection: "column", margin: "10px" }}>
                <label class="control-label" for="readOnlyInput" style={{ textDecoration: "none" }}>Nombre del Producto</label>
                <input
                  class="form-control"
                  type="text"
                  placeholder="Nombre..."
                  autoComplete="false"
                  value={input.name}
                  onChange={handleInputChange}
                  name="name" />
              </div>
            </fieldset>
            {!errors.name ? null : <p className="danger">{errors.name}</p>}
          </div>
          <div class="form-group" style={{ display: "flex", flexDirection: "column", margin: "10px" }}>
            <label for="exampleSelect1" style={{ textDecoration: "none" }}>Categoria</label>
            <select class="form-control" id="exampleSelect1" as="select" name="categoryId" onChange={e => getIdCategory(e)}>
              {categories.map((category, i) => <option key={category.id} id={i} >{category.name}</option>)}
            </select>
          </div>
          <div class="form-group" style={{ display: "flex", flexDirection: "column", margin: "10px" }}>
            <label class="control-label" for="readOnlyInput" style={{ textDecoration: "none" }}>Stock</label>
            <input class="form-control"
              min="0"
              type="number"
              placeholder="Stock..."
              autoComplete={false}
              value={input.stock}
              onChange={handleInputChange}
              name="stock" />
          </div>
          {!errors.stock ? null : <p className="danger">{errors.stock}</p>}
          <div class="form-group" style={{ display: "flex", flexDirection: "column", margin: "10px" }}>
            <label class="control-label" style={{ textDecoration: "none" }}>Precio</label>
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
          <div class="form-group" style={{ display: "flex", flexDirection: "column", margin: "10px" }}>
            <label for="exampleTextarea" style={{ textDecoration: "none" }}>Descripcion</label>
            <textarea
              class="form-control"
              id="exampleTextarea"
              rows="3"
              autoComplete={false}
              value={input.description}
              onChange={handleInputChange}
              name="description" />
          </div>
          <label for="exampleTextarea" style={{ textDecoration: "none" }}>Agregar Imagen</label>
          <div class="form-group">
            <input
              type="file"
              class="btn btn-primary"
              id="exampleInputFile"
              aria-describedby="fileHelp"
              value={input.image}
              onChange={handleUpload}
              name="image"
              accept="image/png, .jpeg, .jpg, image/gif" />
          </div>
          <button type="submit" class="btn btn-primary" enabled={!handleSubmit()} variant="primary" style={{ margin: "10px" }}>Agregar</button>
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
    categories: state.reducer.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ getCategories, postProduct }, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CrudProduct)