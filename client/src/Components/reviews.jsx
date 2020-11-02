import React, { useState, useEffect } from 'react';
import Style from '../Estilos/reviews.module.css';
import { Redirect } from "react-router-dom";
import { getMe } from '../Redux/actionsLogin'
import { getAllReviewsRequest, postReviewRequest, deleteReviewRequest, putReviewRequest, getNumbers } from '../Redux/actionsReview';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


function Reviews({ numbers, user, id, reviews, getMe, getAllReviewsRequest, postReviewRequest, deleteReviewRequest, putReviewRequest, getNumbers }) {

  const [state, setState] = useState({
    qualification: "",
    description: "",
  });

  useEffect(() => {
    getMe();
    getAllReviewsRequest(id) // trae todas las reviews como un array de objetos
    getNumbers(id); //trae un array con el promedio y con la cantidad de votos
  }, [])

  var number = numbers.avg //el promedio esta en numbers.avg
  var prom = Math.round(number).toFixed(2) // redondea y agrega dos ceros

  function handleChange(e) { //toma los valores del input
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
  }
  function onDelete(e) { //borra una publicacion
    var idReview = e.target.value
    deleteReviewRequest(id, idReview)
  }

  function onPut(e) { //modifica una publicacion
    const idReview = e.target.value
    var post = {
      qualification: state.qualification,
      description: state.description
    };
    putReviewRequest(id, idReview, post)
  }

  function onSend() { //envia una publicacion nueva
    var id = user.user_id
    var post = {
      qualification: state.qualification,
      description: state.description,
      user_id: id
    };
    postReviewRequest(id, post)
  }


  return (
    <div >
      <div className= {Style.opinion}>
        <div>
          <ul class="nav nav-tabs" style={{display: "flex", justifyContent: "end", width: "100%"}}>
            <li class="nav-item">
              <a class="nav-link active" data-toggle="tab"><h5>Opiniones</h5></a>
            </li> 

          </ul>
          </div>
        <hr />
        <div id="myTabContent" class="tab-content">
        <table>
          <tr><td >
            <div>
              <div class="tab-pane fade active show" id="opiniones">
                <div className={Style.cajon1}>
                  {prom == 'NaN' ? null : <p style={{fontSize: "90px"}}> {prom} </p>}
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
                  <p>{numbers.five} votos ★★★★★</p>
                  <p>{numbers.four} votos ★★★★</p>
                  <p>{numbers.three} votos ★★★</p>
                  <p>{numbers.two} votos ★★</p>
                  <p>{numbers.one} votos ★</p>
                </div> : null}
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
                          {user !== null ? <button name="modificar" onClick={onPut} className={Style.bottton} type="submit" value={o.review_id} >
                                            Modificar comentario
                                          </button> : null}
                          {user !== null ? <button name="eliminar" onClick={onDelete} className={Style.bottton} type="submit" value={o.review_id}>
                                            Eliminar comentario
                                          </button> : null}
                        </div>
                        {/*<p className={Style.opinionsDate}>{o.updatedAt.slice(0, 10)}</p>
                        <p className={Style.opinionsTitle}>{o.user.name}</p>
                        <p className={Style.opinionsDescription}>{o.description}</p>*/}
                      </div>

                    )
                  })}
              </div>

            </div>

          </td><td >
            <div style={{width: "300px"}}>
              <form onSubmit={handleSubmit}>
                <h4 > Dejanos tu opinion </h4>
                <p style={{margin: "-10px"}}>
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
                <div style={{display: "block"}}>
                  <textarea class="form-control" name="description" rows="3" onChange={handleChange} placeholder="Cuentanos mas sobre el producto"></textarea>
                    {user !== null ? <button name="enviar" onClick={onSend} class='btn btn-success' type="submit" style={{margin:"10px"}}>
                      Enviar comentario
                  </button> : <p>Debes estar logueado</p>}
                </div>
              </form>
              </div>
            </td></tr>
        </table>
        </div>
      </div>
    </div>

  )
}
const mapStateToProps = state => {
  return {
    user: state.auth.user,
    reviews: state.reducer.reviews,
    numbers: state.reducer.numbers
  }
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ getAllReviewsRequest, postReviewRequest, deleteReviewRequest, putReviewRequest, getNumbers, getMe }, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reviews)
