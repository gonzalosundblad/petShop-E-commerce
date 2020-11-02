import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import estilo from '../Estilos/Login.module.css';
import imagen from '../imagenes/PerroYgatito.png';
import HenryPet from '../imagenes/HenryPet2.png';

const title = {
  pageTitle: 'Forgot Password Screen',
};

class ForgotPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      showError: false,
      messageFromServer: '',
      showNullError: false,
      waiting: false
    };
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
      showNullError: false,
      showError: false

    });
  };

  sendEmail = async (e) => {
    e.preventDefault();
    const { email } = this.state;
    this.setState({
        waiting: true,
        showError: false
    });
    if (email === '') {
      this.setState({
        showError: false,
        messageFromServer: '',
        showNullError: true,
        waiting: false
      });
    } else {
      try {
        const response = await axios.post(
          'http://localhost:3001/forgotPassword',
          {
            email,
          },
        );
        console.log(response.data);
        if (response.data === 'recovery email sent') {
          this.setState({
            showError: false,
            messageFromServer: 'recovery email sent',
            showNullError: false,
            waiting: false
          });
        }
      } catch (error) {
        console.error(error.response.data);
        if (error.response.data === 'email not in db') {
          this.setState({
            showError: true,
            messageFromServer: '',
            showNullError: false,
            waiting: false
          });
        }
      }
    }
  };

  render() {
    const {
 email, messageFromServer, showNullError, showError, waiting
} = this.state;

    return (
      <div className={estilo.divOscuro}>
       <div className={estilo.divTodo}>
          <div>
            <img src={imagen} className={estilo.imagen} />
          </div>
          <div className={estilo.henryPet}>
            <img src={HenryPet} className={estilo.imgHenryPet} />
            <NavLink to="/">
              <button type="button" style={{marginRight: "10px"}} class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </NavLink>
          </div>
          <div className={estilo.cuadroRegister}>
            <legend>¿Olvido su constraseña?</legend>
              <form className="profile-form" onSubmit={this.sendEmail} style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                  <p style={{margin: "0px"}}>Le enviaremos un mail a su correo. </p>
                  <p>Abralo y vaya al link que contiene.</p>
                <input
                  id="email"
                  label="email"
                  value={email}
                  onChange={this.handleChange('email')}
                  placeholder="Ingrese su email"
                  class="form-control" 
                  style={{width: "250px", height: "35px"}}
                />
                <button class="btn btn-outline-danger" style={{margin: "10px", height: "35px"}}>Enviar</button>
              </form>
            
        
        {showNullError && (
          <div>
            <p>Debe ingresar un email</p>
          </div>
        )}
        {showError && (
          <div>
            <p style={{margin: "0px", fontSize: "12px"}}>Esta direccion de mail no corresponde a un usuario.</p>
            <p style={{margin: "0px", fontSize: "12px"}}>Intente de nuevo o registrese con una nueva cuenta.</p>
            
        <NavLink to='/register' className="nav-link">Registrarme</NavLink>

          </div>
        )}
        {waiting && (
          <div>
            <p>Enviando...por favor espere unos segundos</p>
          </div>
        )}
        {messageFromServer === 'recovery email sent' && (
          <div>
            <h3>Su mail ha sido enviado! Revise en su casilla</h3>
          </div>
        )}
        <NavLink to='/' className="nav-link">Volver al inicio</NavLink>
        </div>
      </div>
    </div>
    );
  }
}

export default ForgotPassword;