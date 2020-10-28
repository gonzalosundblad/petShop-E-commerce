import React from 'react';
import fondo from '../imagenes/fondoColores.png';
import perrito from '../imagenes/perritoo.png';
import estilo from '../Estilos/fondo.module.css';
import perroBlanco from '../imagenes/perroBlanco.png';
import PerroIcono from '../imagenes/perritoIcono.png';
import GatoIcono from '../imagenes/gatitoIcono.png';
import AveIcono from '../imagenes/aveIcono.png';
import peces from '../imagenes/pecesPrincipal.png';
import perroYgato from '../imagenes/perroYgato.png';
import conejo from '../imagenes/conejoPrincipal.png';

export function Fondo (){
    return ( 
        <div style={{marginTop: "-10px"}}>
            <div className={estilo.fondo} >
                <img src={fondo} width='100%' height="600px"></img>
            </div>
            <div className={estilo.perrito}>
                
                <img  className={estilo.imgPerrito} src={perrito}/>
                
                <div className={estilo.divCatalogo}>
                    <h1>Los mejores productos para tu mascota!</h1>
                    <h3>¡Hecha un vistazo!</h3>
                    <a href="/products"><button type="button" class="btn btn-danger btn-lg">CATALOGO</button></a>
                </div>
               
            </div>
            <div className={estilo.icono}>
                <div className={estilo.categoria}>
                    <a href='/products/category/Perros' style={{textDecoration: 'none'}}>
                        <img src={PerroIcono} className={estilo.imgIcono}/>
                        <h2>Perros</h2>
                    </a>
                </div>
                <div className={estilo.categoria}>
                    <a href='/products/category/Gatos' style={{textDecoration: 'none'}}>
                        <img src={GatoIcono} className={estilo.imgIcono}/>
                        <h2>Gatos</h2>
                    </a>
                </div>
                <div className={estilo.categoria}>
                    <a href='/products/category/Aves' style={{textDecoration: 'none'}}>
                        <img src={AveIcono} className={estilo.imgIcono}/>
                        <h2>Aves</h2>
                    </a>
                </div>
            </div>
        </div>
    )
}

export function Animales(){
    return(
        <div className={estilo.divImagenes} >
            <div className={estilo.divImagenTexto}>
                <img src={peces} width='500px' height='550px'/>
                <h1>Variedad de productos!</h1>
            </div>
            <div className={estilo.divImagenDerecha}>
                <h1>Compra seguro desde tu casa!</h1>
                <img src={perroYgato} width='560px' height="550px"/>
            </div>
            <div className={estilo.divImagenTexto}>
                <img src={conejo} width='520px' height='550px'/>
                <h1>Miles de productos disponibles!</h1>
            </div>
        </div>
    )
};

export function ParaComprar(){
    return (
        <div class="row" style={{margin: "50px"}}>
            <div class="col">
                <svg width="50px"  viewBox="0 0 16 16" class="bi bi-bag-check-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M5.5 3.5a2.5 2.5 0 0 1 5 0V4h-5v-.5zm6 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zm-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                </svg>
                <h5 style={{margin: "10px"}}>Paso 1: Realiza tu compra</h5>
                <h6 class="text-secondary">Agrega los productos que quieras al carrito.</h6>
            </div>
            <hr style={{width:"2px", size:"100px"}} />
            <div class="col">
                <svg width="50px" viewBox="0 0 16 16" class="bi bi-credit-card-2-back" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M14 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"/>
                    <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1zM1 9h14v2H1V9z"/>
                </svg>
                <h5 style={{margin: "10px"}}>Paso 2: Elegi el medio de pago</h5>
                <h6 class="text-secondary">Aprovecha nuestras ofertas!</h6>
            </div>

            <div class="col">
                <svg width="50px"  viewBox="0 0 16 16" class="bi bi-house-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                    <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
                </svg>
                <h5 style={{margin: "10px"}}>Paso 3: Recibi tu pedido</h5>
                <h6 class="text-secondary">Te lo enviamos a domicilio!</h6>
            </div>
        </div>
    )
}

export function PieDePagina(){
    return (
        <div>
            <div className={estilo.pieDePagina} >
                <div className={estilo.grilla}>
                    <div >
                        <h6 class="text-secondary">Sobre nosotros</h6>
                    </div>
                    <div >
                    <h6 class="text-secondary">Contacto</h6>
                    </div>
                    <div >
                    <h6 class="text-secondary">Redes Sociales</h6>
                    </div>
                </div>
            </div>
            <div style={{backgroundColor: "orange", opacity: "70%"}} height="50px" width="100%">.</div>
         </div>
    )
}
