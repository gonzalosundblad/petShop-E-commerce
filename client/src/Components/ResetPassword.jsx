import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import { NavLink } from 'react-router-dom';




const loading = {
  margin: '1em',
  fontSize: '24px',
};

const title = {
  pageTitle: 'Password Reset Screen',
};

export default class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      password: '',
      updated: false,
      isLoading: true,
      error: false,
      empty: ''
    };
  }

  async componentDidMount() {
    // console.log(window.location.href)
      console.log(this.props)
    // const {
    //   match: {
    //     params: { token },
    //   },
    // } = this.props;
    try {
      const response = await axios.get('http://localhost:3001/reset', {
        params: {
        //   resetPasswordToken: '81d317b6d7b766e41c99c78158bcd5ba6ec948cf',
            resetPasswordToken: window.location.href.slice(36)
        },
      });
      // console.log(response);
      if (response.data.message === 'password reset link a-ok') {
        this.setState({
          name: response.data.name,
          updated: false,
          isLoading: false,
          error: false,
        });
      }
    } catch (error) {
      console.log(error.response.data);
      this.setState({
        updated: false,
        isLoading: false,
        error: true,
      });
    }
  }

  handleChange = name => (event) => {
    const { password, empty } = this.state;
    this.setState({
      [name]: event.target.value,
       empty: event.target.value
    });
    console.log(empty)
    console.log(password.length)
    if(password !== '') {
        this.setState({
            empty: false
        })
    if(password.length < 3) {
        this.setState({
            empty: true
        })
    }
    }
  };

  updatePassword = async (e) => {
    e.preventDefault();
    const { name, password, empty } = this.state;
    if(empty === true || empty === '') {
         return this.setState({
            empty: true
        })
    }
    // const {
    //   match: {
    //     params: { token },
    //   },
    // } = this.props;
    try {
      const response = await axios.put(
        'http://localhost:3001/updatePasswordViaEmail',
        {
          name,
          password,
        //   resetPasswordToken: token,
        //   resetPasswordToken: '81d317b6d7b766e41c99c78158bcd5ba6ec948cf',
          resetPasswordToken: window.location.href.slice(36)


        },
      );
      console.log(response.data);
      if (response.data.message === 'password updated') {
        this.setState({
          updated: true,
          error: false,
        });
      } else {
        this.setState({
          updated: false,
          error: true,
        });
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  render() {
    const {
 password, error, isLoading, updated, empty
} = this.state;
console.log(this.state);
    if (error) {
      return (
        <div>
          <h1 title={title} />
          <div style={loading}>
            <h4>El link no es valido o ha expirado, pida un nuevo mail de reset</h4>
            <NavLink to='/' style={{ margin: "10px" }}>Volver al inicio</NavLink>
            <NavLink to='/forgot' style={{ margin: "10px" }}>Generar nuevo mail</NavLink>
          </div>
        </div>
      );
    }
    if (isLoading) {
        return (
            <div>
          <h1 title={title} />
          <div style={loading}>Cargando datos de usuario...</div>
        </div>
      );
    }
    
//     if(empty === 'damn its empty') {
//         return (
//           <div>
//         <p>Debe ingresar una contraseña valida</p>
//           </div>
//        )
//    }
    if(updated) {
        return (
        <div>
        <p>
            Su contraseña se actualizo exitosamente :) Intente iniciar sesion de nuevo
        </p>
        <div><NavLink to='/login'>Iniciar sesion</NavLink></div>
        <div><NavLink to='/'>Ir al inicio</NavLink></div>
        </div>
    )}
   
    return (
      <div>
        <h1 title={title} />
        <form onSubmit={this.updatePassword}>
            <p>Ingrese su nueva contraseña</p>
          <input
            id="password"
            label="password"
            onChange={this.handleChange('password')}
            value={password}
            type="password"
          />
          <button>Actualizar contraseña</button>
        </form>

        {empty && (
                <div>
            <p>Debe ingresar una contraseña valida</p>
                 </div>
        )}
      </div>
    );
 
        
  }
}

// ResetPassword.propTypes = {
//   // eslint-disable-next-line react/require-default-props
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       token: PropTypes.string.isRequired,
//     }),
//   }),
// };