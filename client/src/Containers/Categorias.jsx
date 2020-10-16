import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Catalogo from '../Components/CatalogoComp';
import {getProductByCategory} from '../Redux/actions.js'
import {connect} from 'react-redux';
import store from '../Redux/store';

function Categories({ name, getProductByCategory }) {

    const [products, setProducts] = useState([]);
        //
        // useEffect(() => {
        //     async function detProd() {
        //       const response = await axios.get(`http://localhost:3001/products/category/${name}`)
        //       const json = await response.data;
        //       setProducts(json);
        //     }
        //     detProd();
        //     }, []);
        useEffect(() => {
          getProductByCategory(name).payload
          .then(resp => setProducts(resp.data))
        }, []);

        return (
          <div >
            <Catalogo productos = {products} />
          </div>
        )
      };

const mapStateToProps = (state) => ({
categories : state.categories
})

export default connect(
mapStateToProps,
{getProductByCategory})
(Categories);
