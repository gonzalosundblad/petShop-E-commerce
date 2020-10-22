import React, { useState, useEffect } from 'react';
import Style from '../Estilos/reviews.module.css';
import {deleteReview, getAllReviewsRequest, postReviewRequest, putReview} from '../Redux/actionsReview';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

function Reviews({id, reviews, getAllReviewsRequest}){

   var opiniones = [{date: "15/11" , user: "jorge", id:159, estrellas:5, title:"por ahora muy bueno", description: "Compre semillas."}, {date: "02/03" , user: "ana", id:241, estrellas:2, title:"Veremos las de perejil", description: "Explotaron de crecimiento"}]

  const [state, setState] = useState({
      qualification: "",
      description: ""
    });

  // useEffect(() =>{
  //     getAllReviewsRequest(id)
  //   },[])

    var prom=[];//hago promedio
      function promedio(){
        // console.log(reviews);
        var value = []
        reviews.map(e => {value.push(e.qualification)})
        var total  = value.reduce(function(a,b){
          return a + b
        }, 0)
        value.map(e => e === 1 )
        prom = Math.round(total/value.length).toFixed(2);
      }
      promedio()

      function handleChange (e){
          setState({
              ...state,
              [e.target.name]: e.target.value,
          });
      }
      function handleSubmit(e){
          e.preventDefault();
      }
      // function onDelete(){
      //   var idProduct = 1
      //   var idReview = 2
      // //  deleteReviewRequest(idProduct, idReview)
      // }
      // function onPut(){
      //   var id = 1
      //   var idReview = 2
      //   var post = {
      //     qualification: state.qualification,
      //     description: state.description,
      //     user_id : 2
      //     };
      //   //  putReviewRequest(id, idReview, post)
      // }
      // function onSend(){
      //   var id = '1'
      //   var post = {
      //     qualification: "jdjddd",
      //     description: "sshshshshshshshshs",
      //     user_id : 2
      //     };
      //   //  postReviewRequest(id, post);
      // }

    return(
      <div className={Style.box}>
        <div >
          <h3 className={Style.titulo}>Reviews</h3>
          <hr/>
        <div/>
         <table>
              <tr><td >
              <h4 className={Style.subtitulo}>Opiniones sobre el producto</h4>
            <div>
            <div>
            <div className={Style.cajon1}>
                <p className={Style.numPromedio}> { prom } </p>
                <div>
                  {prom == 5? <label className={Style.estrellasnaranja}>★★★★★</label> : <p></p>}
                  {prom == 4? <label className={Style.estrellasnaranja}>★★★★</label> : <p></p>}
                  {prom == 3? <label className={Style.estrellasnaranja}>★★★</label> : <p></p>}
                  {prom == 2? <label className={Style.estrellasnaranja}>★★</label> : <p></p>}
                  {prom == 1? <label className={Style.estrellasnaranja}>★</label> : <p></p>}
                  {prom == 0? <h1>Sin calificar</h1> : <p></p>}

                </div>
              </div>
            <div className={Style.cajon2}>
                <p>▀▀▀▀▀</p>
                <p>▀▀▀▀</p>
                <p>▀▀▀</p>
                <p>▀▀</p>
                <p>▀</p>
            </div>
            </div>


            <div className={Style.opiniones}>
            {
              reviews && reviews.map(o => {
              return (
                <div>
                    <div>
                    {o.qualification === 5 ? <label className={Style.estrellasnaranja}>★★★★★</label> : <p></p>}
                    {o.qualification === 4 ? <label className={Style.estrellasnaranja}>★★★★</label> : <p></p>}
                    {o.qualification === 3 ? <label className={Style.estrellasnaranja}>★★★</label> : <p></p>}
                    {o.qualification === 2 ? <label className={Style.estrellasnaranja}>★★</label> : <p></p>}
                    {o.qualification === 1 ? <label className={Style.estrellasnaranja}>★</label> : <p></p>}
                    </div>
                  <p className={Style.opinionsDate}>{o.updatedAt.slice(0,10)}</p>
                 <p className={Style.opinionsTitle}>{o.user.name}</p>
                 <p className={Style.opinionsDescription}>{o.description}</p>
                </div>

            )
            })}
            </div>

            </div>

            </td><td>
            <form onSubmit={handleSubmit}>
              <h4 className={Style.subtitulo}> Dejanos tu opinion </h4>
              <p>
                <input id="radio1" type="radio" name="qualification" value="5" onChange={handleChange}/>
                <label for="radio1" className={Style.estrellas}>★</label>
                <input id="radio2" type="radio" name="qualification" value="4" onChange={handleChange}/>
                <label for="radio2" className={Style.estrellas}>★</label>
                <input id="radio3" type="radio" name="qualification" value="3" onChange={handleChange}/>
                <label for="radio3" className={Style.estrellas}>★</label>
                <input id="radio4" type="radio" name="qualification" value="2" onChange={handleChange}/>
                <label for="radio4" className={Style.estrellas}>★</label>
                <input id="radio5" type="radio" name="qualification" value="1" onChange={handleChange}/>
                <label for="radio5"className={Style.estrellas}>★</label>
              </p>
              <h4>Cuentanos mas sobre el producto</h4>
              <input className={Style.inputt}type="text" name="description" placeholder="Cuentanos mas sobre el producto"
                  onChange={handleChange} />
              <hr/>
              {/* <button name="enviar" onClick={onSend}className={Style.botton} type="submit">
                Enviar comentario
              </button>
              <button name="modificar" onClick={onPut}className={Style.botton} type="submit">
                Modificar comentario
              </button>
              <button name="eliminar" onClick={onDelete}className={Style.botton} type="submit">
                Eliminar comentario
              </button> */}
               <button name="enviar" onClick={() => postReviewRequest(id, state)} className={Style.botton} type="submit">
                Enviar comentario
              </button>
              <button name="modificar" onClick={() => putReview(state)} className={Style.botton} type="submit">
                Modificar comentario
              </button>
              <button name="eliminar" onClick={() => deleteReview()} className={Style.botton} type="submit">
                Eliminar comentario
              </button>
            </form>
            </td></tr>
          </table>

      </div>
      </div>


        )
}

const mapStateToProps = state => {
  return {
    reviews: state.reviews
  }
}
// const mapDispatchToProps = dispatch => {
//   return {
//     dispatch,
//     ...bindActionCreators({getAllReviewsRequest}, dispatch)
//   }
// }

function mapDispatchToProps(dispatch) {
  return {
    postReviewRequest: rev => dispatch(postReviewRequest(rev)),
    putReview: rev => dispatch(putReview(rev)),
    deleteReview: rev => dispatch(deleteReview(rev))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reviews)
