import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Product from '../Components/Product';
import { getProductById } from '../Redux/actions'
import {connect} from 'react-redux';

function ProductSolo ({Id}) {

    const [producto, setProducto] = useState([]);
      useEffect(() => {
        getProductById().payload
        .then(resp => setProducto(resp.data))
      }, []);

        // function onClose(id){
        //   setCities(oldCities => oldCities.filter(c => c.id !== id));
        // }

        return (
          <div >
              <Product producto = {producto} />
            </div>

        );
      }

const mapStateToProps = (state) => ({
  products : state.products
})

export default connect(
mapStateToProps,
{getProductById})
(ProductSolo);
