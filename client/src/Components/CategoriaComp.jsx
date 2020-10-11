import React  from 'react';

export default function CategoriaCard ({nombre}){
    // const [card, setCard] = useState()
    return(
      <Link to={`/products/:${nombre}`}>
        <div>
            <figure>
                <img className="card-img-top" src={imagen} alt="imagen de perro"/>
            </figure>
            <h1>Categoria</h1>
            <h1>{nombre}</h1>
        </div>
    </Link>
    )
  };