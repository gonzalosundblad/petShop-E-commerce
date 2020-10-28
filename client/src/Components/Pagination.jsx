import React from 'react';

export default function Pagination ({totalProductos, paginas, productPorPagina}){
    const paginate = [];   //array con los numeros que van a ver en la paginacion
    const cantidadProductos = totalProductos.length;
    
    for(var i = 1; i <= Math.ceil(cantidadProductos / productPorPagina); i++){  //math.ceil te redondea para arriba
        paginate.push(i);
    }

return (
    <div>
        <ul class="pagination" >
            <li class="page-item ">
            <a class="page-link " href="#">&laquo;</a>
            </li>
            <li class="page-item" style={{display: "flex"}}>
                {paginate.map (number =>
                <a class="page-link" href="#" onClick={() => paginas(number)}>{number}</a>
                )}
            </li>
            <li class="page-item">
            <a class="page-link" href="#">&raquo;</a>
            </li>
        </ul>
    </div>   
)
}
/* <div>
<ul class="pagination">
    <li class="page-item disabled">
        {paginate.map (number =>
        <a class="page-link" href="#" onClick={paginas(number)}>{number}</a>
        )}
    </li>
</ul>
</div> */