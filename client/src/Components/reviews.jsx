import React, { useState, useEffect } from 'react';
import Style from '../Estilos/reviews.module.css';
import { Redirect } from "react-router-dom";
import { getAllReviewsRequest, postReviewRequest, deleteReviewRequest, putReviewRequest, getNumbers } from '../Redux/actionsReview';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';


function Reviews({ numbers, user, id, reviews, getAllReviewsRequest, postReviewRequest, deleteReviewRequest, putReviewRequest, getNumbers }) {

  const [state, setState] = useState({
    qualification: "",
    description: "",
  });

  useEffect(() => {
    getAllReviewsRequest(id)
    getNumbers(id);
    }, [])
    var number = numbers.avg
    var prom = Math.round(number).toFixed(2)
    var allReviews = reviews

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
  }
  function onDelete(e) {
    console.log("delete");
    var idReview = e.target.value
    console.log(idReview);
    axios.delete(`http://localhost:3001/reviews/product/${id}/review/${idReview}`)
      .then(rest => console.log(rest))
    //deleteReviewRequest(id, idReview)
  }

  function onPut(e) {
    const idReview = e.target.value
    var post = {
      qualification: state.qualification,
      description: state.description
    };
    axios.put(`http://localhost:3001/reviews/product/${id}/review/${idReview}`, post)
      .then(result => console.log(result))
    //putReviewRequest(id, idReview, post)
  }

  function onSend() {
    var id = user.user.user.user_id
    var post = {
      qualification: parseInt(state.qualification),
      description: state.description,
      user_id: id
    };
    postReviewRequest(id, post)
  }

  return (
    <div className={Style.box}>
       <div >
        <h3 className={Style.titulo}>Reviews</h3>
        <hr className={Style.hr} />
        <div />
        <table>
          <tr><td >
            <h4 className={Style.subtitulo}>Opiniones sobre el producto</h4>
            <div>
              <div>
                <div className={Style.cajon1}>
                  {prom == 'NaN' ? null : <p className={Style.numPromedio}> {prom} </p> }
                  <div>
                    {prom == 5 ? <label className={Style.estrellasnaranja}>★★★★★</label> : <p></p>}
                    {prom == 4 ? <label className={Style.estrellasnaranja}>★★★★</label> : <p></p>}
                    {prom == 3 ? <label className={Style.estrellasnaranja}>★★★</label> : <p></p>}
                    {prom == 2 ? <label className={Style.estrellasnaranja}>★★</label> : <p></p>}
                    {prom == 1 ? <label className={Style.estrellasnaranja}>★</label> : <p></p>}
                    {prom == 'NaN' ? <h3 className={Style.p}>Sin calificaciones</h3> : <p></p>}

                  </div>
                </div>
            {numbers ? <div className={Style.cajon2}>
                  <p>{numbers.five} votos ▀▀▀▀▀</p>
                  <p>{numbers.four} votos ▀▀▀▀</p>
                  <p>{numbers.three} votos ▀▀▀</p>
                  <p>{numbers.two} votos ▀▀</p>
                  <p>{numbers.one} votos ▀</p>
                </div> : null}
              </div>


              <div className={Style.opiniones}>
                {
                  allReviews && allReviews.map(o => {
                    return (
                      <div>
                        <div>
                          {o.qualification === 5 ? <label className={Style.estrellasnaranja}>★★★★★</label> : <p></p>}
                          {o.qualification === 4 ? <label className={Style.estrellasnaranja}>★★★★</label> : <p></p>}
                          {o.qualification === 3 ? <label className={Style.estrellasnaranja}>★★★</label> : <p></p>}
                          {o.qualification === 2 ? <label className={Style.estrellasnaranja}>★★</label> : <p></p>}
                          {o.qualification === 1 ? <label className={Style.estrellasnaranja}>★</label> : <p></p>}
              {user !== null ? <button name="modificar" onClick={onPut} className={Style.bottton} type="submit" value={o.review_id} >
                            Modificar comentario
              </button> : null }
              {user !== null ? <button name="eliminar" onClick={onDelete} className={Style.bottton} type="submit" value={o.review_id}>
                            Eliminar comentario
              </button> : null }
                   </div>
                        <p className={Style.opinionsDate}>{o.updatedAt.slice(0, 10)}</p>
                        {/*  <p className={Style.opinionsTitle}>{o.user.name}</p>}*/}
                        <p className={Style.opinionsDescription}>{o.description}</p>
                      </div>

                    )
                  })    }
              </div>

            </div>

          </td><td className={Style.cajon2}>
              <form onSubmit={handleSubmit}>
                <h4 className={Style.subtitulo}> Dejanos tu opinion </h4>
                <p>
                  <input id="radio1" type="radio" name="qualification" value="5" onChange={handleChange} />
                  <label for="radio1" className={Style.estrellas}>★</label>
                  <input id="radio2" type="radio" name="qualification" value="4" onChange={handleChange} />
                  <label for="radio2" className={Style.estrellas}>★</label>
                  <input id="radio3" type="radio" name="qualification" value="3" onChange={handleChange} />
                  <label for="radio3" className={Style.estrellas}>★</label>
                  <input id="radio4" type="radio" name="qualification" value="2" onChange={handleChange} />
                  <label for="radio4" className={Style.estrellas}>★</label>
                  <input id="radio5" type="radio" name="qualification" value="1" onChange={handleChange} />
                  <label for="radio5" className={Style.estrellas}>★</label>
                </p>
                <input className={Style.inputt} type="text" name="description" placeholder="Cuentanos mas sobre el producto"
                  onChange={handleChange} />
                {user !== null ? <button name="enviar" onClick={onSend} className={Style.bottton} type="submit">
                  Enviar comentario
              </button> : <p>Debes estar logueado</p> }
              </form>
            </td></tr>
        </table>

      </div>
    </div>

  )
}
const mapStateToProps = state => {
  return {
    user: state.auth,
    reviews: state.reducer.reviews,
    numbers: state.reducer.numbers
  }
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({getAllReviewsRequest, postReviewRequest, deleteReviewRequest, putReviewRequest, getNumbers }, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reviews)
