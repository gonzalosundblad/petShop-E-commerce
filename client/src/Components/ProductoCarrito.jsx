import React from 'react';
import Estilo from '../Estilos/ProductoCarrito.module.css';
import Basura from '../imagenes/basura.png';


export default function ProductoCarritocard({id, image, name, price, LineaDeOrden, funcionDelete, funcionInput}){
   
    var total= price * LineaDeOrden;

    return(
        <div className={Estilo.producto}>
            {/* <div key={id}> */}
                <div>
                    <img className={Estilo.img} src={image} alt=""/>
                </div>
                <div>
                    <h1>{name} </h1>
                    <h2>${price} </h2>
                </div>
                <div className={Estilo.inputBoton}>
                    <h3>Cantidad: </h3>
                    <h4>{LineaDeOrden} unidades</h4>
                    <h5>Total: ${total} </h5>
                    {/* <input type="number" value={LineaDeOrden} onChange={funcionInput} /> */}
                    
                </div>
                <div className={Estilo.botonBorrar}>
                    <button onClick={funcionDelete} value={id} >
                        <img className={Estilo.basura} src={Basura} alt=""/>
                    </button>
                </div>
            {/* </div> */}
        </div>
        )
}

// export total;