import React, { useState, useEffect } from 'react';
import Style from '../Estilos/reviews.module.css';
import { getAllReviewsRequest, postReviewRequest, putReview, deleteReviewRequest, deleteReview } from '../Redux/actionsReview';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function Reviews({ id, reviews, getAllReviewsRequest, postReviewRequest }) {

  const [state, setState] = useState({
    qualification: "",
    description: "",
  });

  useEffect(() => {
    getAllReviewsRequest(id)
  }, [])

  var prom = [];//hago promedio
  var list = [{ uno: [], dos: [], tres: [], cuatro: [], cinco: [] }]

  function promedio() {
    var value = []
    if (reviews.length === 0) { value.push(0) }
    reviews.map(e => { value.push(e.qualification) })
    var total = value.reduce(function (a, b) { return a + b }, 0)
    prom = Math.round(total / value.length).toFixed(2);
    value.map(e => e === 1 ? list[0].uno.push(e) : null)
    value.map(e => e === 2 ? list[0].dos.push(e) : null)
    value.map(e => e === 3 ? list[0].tres.push(e) : null)
    value.map(e => e === 4 ? list[0].cuatro.push(e) : null)
    value.map(e => e === 5 ? list[0].cinco.push(e) : null)
  }

  promedio()

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
    var idReview = e.target.value
    deleteReview(id, idReview)
    window.location.reload()
  }

  function onPut(e) {
    const idReview = e.target.value
    var post = {
      qualification: state.qualification,
      description: state.description
    };
    putReview(id, idReview, post)
    window.location.reload()

  }

  function onSend() {
    var post = {
      qualification: state.qualification,
      description: state.description,
      user_id: 2
    };
    postReviewRequest(id, post)
    window.location.reload()
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
                  <h1 style={{fontSize: "90px"}}> {prom} </h1>
                  <div>
                    {prom == 5 ? <label className={Style.estrellasnaranja}>★★★★★</label> : <p></p>}
                    {prom == 4 ? <label className={Style.estrellasnaranja}>★★★★</label> : <p></p>}
                    {prom == 3 ? <label className={Style.estrellasnaranja}>★★★</label> : <p></p>}
                    {prom == 2 ? <label className={Style.estrellasnaranja}>★★</label> : <p></p>}
                    {prom == 1 ? <label className={Style.estrellasnaranja}>★</label> : <p></p>}
                    {prom == 0 ? <h5>Sin calificaciones</h5> : <p></p>}

                  </div>
                </div>
                <div className={Style.cajon2}>
                  <p>{list[0].cinco.length} votos ★★★★★</p>
                  <p>{list[0].cuatro.length} votos ★★★★</p>
                  <p>{list[0].tres.length} votos ★★★</p>
                  <p>{list[0].dos.length} votos ★★</p>
                  <p>{list[0].uno.length} votos ★</p>
                </div>
              </div>


              <div className={Style.opiniones}>
                {
                  reviews && reviews.map(o => {

                    console.log(reviews)
                    return (
                      <div>
                        <div>
                          {o.qualification === 5 ? <label className={Style.estrellasnaranja}>★★★★★</label> : <p></p>}
                          {o.qualification === 4 ? <label className={Style.estrellasnaranja}>★★★★</label> : <p></p>}
                          {o.qualification === 3 ? <label className={Style.estrellasnaranja}>★★★</label> : <p></p>}
                          {o.qualification === 2 ? <label className={Style.estrellasnaranja}>★★</label> : <p></p>}
                          {o.qualification === 1 ? <label className={Style.estrellasnaranja}>★</label> : <p></p>}
                          <button name="modificar" onClick={onPut} className={Style.bottton} type="submit" value={o.review_id} >
                            Modificar comentario
                          </button>
                          <button name="eliminar" onClick={onDelete} className={Style.bottton} type="submit" value={o.review_id}>
                            Eliminar comentario
                          </button>
                        </div>
                        <p className={Style.opinionsDate}>{o.updatedAt.slice(0, 10)}</p>
                        <p className={Style.opinionsTitle}>{o.user.name}</p>
                        <p className={Style.opinionsDescription}>{o.description}</p>
                      </div>

                    )
                  })}
              </div>

            </div>

          </td><td >
            <div style={{width: "300px"}}>
              <form onSubmit={handleSubmit}>
                <h4 > Dejanos tu opinion </h4>
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
                <div style={{display: "block"}}>
                  {/* <label for="exampleTextarea">Example textarea</label> */}
                  <textarea class="form-control" name="description" rows="3" onChange={handleChange} placeholder="Cuentanos mas sobre el producto"></textarea>
                  <button name="enviar" onClick={onSend} class='btn btn-success' type="submit">
                    Enviar comentario
                  </button>
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
  console.log(state.reducer);
  return {
    reviews: state.reducer.reviews
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
    dispatch,
    ...bindActionCreators({ getAllReviewsRequest, postReviewRequest }, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reviews)