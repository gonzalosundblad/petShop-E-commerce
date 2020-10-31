import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function ProductoCarritocard({user, id, image, name, price, LineaDeOrden, precioFinal, funcionDelete, funcionInput}){
    
    var total= price * LineaDeOrden;

    return(
        <div >
            <div className="card mb-3">
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src={image} className="card-img" style={{height: 150, width: 150}} alt="..."/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{name}</h5>
                            <h6 className="card-title">{price}</h6>
                            <h6 className="card-title">Cantidad: {LineaDeOrden} unidad(es)</h6>
                            <h6>Total: ${total}</h6>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }

export default ProductoCarritocard

