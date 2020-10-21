import { Link, Redirect } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Style from '../Estilos/reviews.module.css';
import {getAllReviewsRequest, deleteReviewRequest, putReviewRequest, postReviewRequest} from '../Redux/actionsReview';
import {connect} from 'react-redux'
import axios from 'axios';

function Reviews({postReviewRequest}){
  var opiniones = [{date: "15/11" , user: "jorge", id:159, estrellas:5, title:"por ahora muy bueno", description: "Compre semillas."}, {date: "02/03" , user: "ana", id:241, estrellas:2, title:"Veremos las de perejil", description: "Explotaron de crecimiento"}]
  const [state, setState] = useState({
      qualification: "",
      description: "",
    });
    function submit(){}
        var prom=[];
        var cantidaddevotos = [{1:0},{2:0},{3:0},{4:0},{5:0},{0:0}]
          function promedio(){
            var values = [1,2, 3, 3, 3]
            opiniones.map(e => values.push([e][0].estrellas))
            var total  = values.reduce(function(a,b){
              return a + b
            }, 0)
            values.map(e => e === 1 )
            prom = Math.round(total/values.length).toFixed(2);
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
      function onSend(){
        var id = 2
        var post = {
          qualification : 5,
          description : 'jjjjjjjjjj',
          user_id : 2
          };
          postReviewRequest(2, post);
          //axios.post(`http://localhost:3001/product/${id}/review`, post)
            //.then(response => {console.log(response.data)})

      }

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
              opiniones && opiniones.map(o => {
              return (
                <div>
                    <div>
                    {o.estrellas === 5 ? <label className={Style.estrellasnaranja}>★★★★★</label> : <p></p>}
                    {o.estrellas === 4 ? <label className={Style.estrellasnaranja}>★★★★</label> : <p></p>}
                    {o.estrellas === 3 ? <label className={Style.estrellasnaranja}>★★★</label> : <p></p>}
                    {o.estrellas === 2 ? <label className={Style.estrellasnaranja}>★★</label> : <p></p>}
                    {o.estrellas === 1 ? <label className={Style.estrellasnaranja}>★</label> : <p></p>}
                    </div>
                  <p className={Style.opinionsDate}>{o.date}</p>
                 <p className={Style.opinionsTitle}>{o.title}</p>
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
              <button onClick={onSend}className={Style.botton} type="submit">
                Enviar opinion
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
const mapDispatchToProps = dispatch => {
  return {
    postReviewRequest: () => dispatch(postReviewRequest())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reviews)
