import React, { useState, useEffect } from 'react';
import Style from '../Estilos/reviews.module.css';
import {getAllReviewsRequest, postReviewRequest} from '../Redux/actionsReview';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

function Reviews({id, reviews, getAllReviewsRequest, postReviewRequest}){

   var opiniones = [{date: "15/11" , user: "jorge", id:159, estrellas:5, title:"por ahora muy bueno", description: "Compre semillas."}, {date: "02/03" , user: "ana", id:241, estrellas:2, title:"Veremos las de perejil", description: "Explotaron de crecimiento"}]

  const [state, setState] = useState({
      qualification: "",
      description: "",
    });

  useEffect(() =>{
      getAllReviewsRequest(id)
    },[])

    var prom=[];//hago promedio
    var list = [{uno: [], dos : [], tres : [], cuatro : [], cinco : []}]

      function promedio(){
        console.log(reviews);
            var value = []
            if(reviews && reviews.length === 0){value.push(0)}
            reviews && reviews.map(e => {value.push(e.qualification)})
            var total  = value.reduce(function(a,b){return a + b}, 0)
            prom = Math.round(total/value.length).toFixed(2);
            value.map(e => e === 1 ? list[0].uno.push(e) : null)
            value.map(e => e === 2 ? list[0].dos.push(e) : null)
            value.map(e => e === 3 ? list[0].tres.push(e) : null)
            value.map(e => e === 4 ? list[0].cuatro.push(e) : null)
            value.map(e => e === 5 ? list[0].cinco.push(e) : null)
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
      function onDelete(){
        var idProduct = 1
        var idReview = 2
      //  deleteReviewRequest(idProduct, idReview)
      }
      function onPut(){
        var id = 1
        var idReview = 2
        var post = {
          qualification: state.qualification,
          description: state.description,
          user_id : 2
          };
        //  putReviewRequest(id, idReview, post)
      }

      function onSend(){
        var post = {
          qualification: state.qualification,
          description: state.description,
          user_id : 2
          };
         postReviewRequest(id, post);
         window.location.reload()
      }

    return(
      <div className={Style.box}>
        <div >
          <h3 className={Style.titulo}>Reviews</h3>
          <hr className={Style.hr}/>
        <div/>
         <table>
              <tr><td >
              <h4 className={Style.subtitulo}>Opiniones sobre el producto</h4>
            <div>
            <div>
            <div className={Style.cajon1}>
                <p className={Style.numPromedio}> {prom } </p>
                <div>
                  {prom == 5? <label className={Style.estrellasnaranja}>★★★★★</label> : <p></p>}
                  {prom == 4? <label className={Style.estrellasnaranja}>★★★★</label> : <p></p>}
                  {prom == 3? <label className={Style.estrellasnaranja}>★★★</label> : <p></p>}
                  {prom == 2? <label className={Style.estrellasnaranja}>★★</label> : <p></p>}
                  {prom == 1? <label className={Style.estrellasnaranja}>★</label> : <p></p>}
                  {prom == 0? <h3 className={Style.p}>Sin calificaciones</h3> : <p></p>}

                </div>
              </div>
            <div className={Style.cajon2}>
                <p>{list[0].uno.length} votos ▀▀▀▀▀</p>
                <p>{list[0].dos.length} votos ▀▀▀▀</p>
                <p>{list[0].tres.length} votos ▀▀▀</p>
                <p>{list[0].cuatro.length} votos ▀▀</p>
                <p>{list[0].cinco.length} votos ▀</p>
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

            </td><td className={Style.cajon2}>
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
              <input className={Style.inputt}type="text" name="description" placeholder="Cuentanos mas sobre el producto"
                  onChange={handleChange} />
              <button name="enviar" onClick={onSend}className={Style.bottton} type="submit">
                Enviar comentario
              </button>
              <button name="modificar" onClick={onPut}className={Style.bottton} type="submit">
                Modificar comentario
              </button>
              <button name="eliminar" onClick={onDelete}className={Style.bottton} type="submit">
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
  console.log(state.reducer);
  return {
    reviews: state.reducer.reviews
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    ...bindActionCreators({getAllReviewsRequest, postReviewRequest}, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reviews)
