import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';


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
    };
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  sendEmail = async (e) => {
    e.preventDefault();
    const { email } = this.state;
    if (email === '') {
      this.setState({
        showError: false,
        messageFromServer: '',
        showNullError: true,
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
          });
        }
      } catch (error) {
        console.error(error.response.data);
        if (error.response.data === 'email not in db') {
          this.setState({
            showError: true,
            messageFromServer: '',
            showNullError: false,
          });
        }
      }
    }
  };

  render() {
    const {
 email, messageFromServer, showNullError, showError 
} = this.state;

    return (
      <div>
        <h1 title={title} />
        <form className="profile-form" onSubmit={this.sendEmail}>
            <p>Le enviaremos un mail a su correo. Abralo y vaya al link que contiene</p>
          <input
            id="email"
            label="email"
            value={email}
            onChange={this.handleChange('email')}
            placeholder="Ingrese su email"
          />
          <button>Enviar</button>
        </form>
        {showNullError && (
          <div>
            <p>Debe ingresar un email</p>
          </div>
        )}
        {showError && (
          <div>
            <p>Esta direccion de mail no corresponde a un usuario.</p>
            <p>Intente de nuevo o registrese con una nueva cuenta.</p>
            
        <NavLink to='/register' className="nav-link">Registrarme</NavLink>

          </div>
        )}
        {messageFromServer === 'recovery email sent' && (
          <div>
            <h3>Su mail ha sido enviado! Revise en su casilla</h3>
          </div>
        )}
        <NavLink to='/' className="nav-link">Volver al inicio</NavLink>

      </div>
    );
  }
}

export default ForgotPassword;