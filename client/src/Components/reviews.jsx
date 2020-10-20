import { Link, Redirect } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Style from '../Estilos/reviews.module.css';

export default function Reviews(){
  var opiniones = [{date: "15/11" , user: "jorge", id:159, estrellas:5, title:"por ahora muy bueno", description: "Compre semillas."}, {date: "02/03" , user: "ana", id:241, estrellas:2, title:"Veremos las de perejil", description: "Explotaron de crecimiento"}]

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
            <form >
              <h4 className={Style.subtitulo}> Dejanos tu opinion </h4>
              <p>
                <input id="radio1" type="radio" name="estrellas" value="1"/>
                <label for="radio1" className={Style.estrellas}>★</label>
                <input id="radio2" type="radio" name="estrellas" value="2"/>
                <label for="radio2" className={Style.estrellas}>★</label>
                <input id="radio3" type="radio" name="estrellas" value="3"/>
                <label for="radio3" className={Style.estrellas}>★</label>
                <input id="radio4" type="radio" name="estrellas" value="4"/>
                <label for="radio4" className={Style.estrellas}>★</label>
                <input id="radio5" type="radio" name="estrellas" value="5"/>
                <label for="radio5"className={Style.estrellas}>★</label>
              </p>
              <h4>Cuentanos mas sobre el producto</h4>
              <input type="text" />
              <hr/>
              <botton className={Style.botton} onClick={submit} >Enviar opinion</botton>
            </form>
            </td></tr>
          </table>

      </div>
      </div>


        )
}

// export total;
