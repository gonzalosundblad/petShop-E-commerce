import React from 'react';
import '../Estilos/ListaDesplegable.css';


export function ListaDesplegable(){
    return (
        <div id='header'>
        <ul className='lista'>
            <li> <a href=''>Ajustes</a>
                <ul>
                    <li><a href=''>Productos</a>
                        <ul>
                            <li><a href='/admin/products/crud/'>Agregar Productos</a></li>
                            <li><a href='/admin/ModificarProducto/'>Modificar/Borrar</a></li>
                        </ul>
                    </li>
                    <li ><a href=''>Categorias</a>
                        <ul>
                            <li><a href='/admin/AgregarCategoria'>Agregar Categorias</a></li>
                            <li><a href='/admin/ModificarCategoria/'>Modificar/Borrar</a></li>
                        </ul>
                    </li>
                    <li><a href=''>Ordenes</a></li>
                </ul>
            </li>
        </ul>
        </div>
    )
}