import React from 'react';
import fondo from '../imagenes/fondoColores.png';
import perrito from '../imagenes/perritoo.png';
import estilo from '../Estilos/fondo.module.css';
import perroBlanco from '../imagenes/perroBlanco.png';
import PerroIcono from '../imagenes/perritoIcono.png';
import GatoIcono from '../imagenes/gatitoIcono.png';
import AveIcono from '../imagenes/aveIcono.png';

export function Fondo (){
    return (
        
        <div >
            <div className={estilo.fondo} >
                <img src={fondo} width='100%'></img>
            </div>
            <div className={estilo.perrito}>
                <img  className={estilo.imgPerrito} src={perrito}></img>
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