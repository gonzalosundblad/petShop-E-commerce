// import React from 'react';
// import { useState, useEffect } from 'react';
// import OrdenUsuario from '../Containers/ordenUsuario';
// import {getUser, deleteUser, putUser} from '../Redux/actionsOrden'
// import Estilo from '../Estilos/Perfil.module.css'
// import {connect} from 'react-redux'

// function Perfil (user){
// console.log(user.user.user_id);
// const id = user.user.user_id
// const [state, setState] = useState({
//     name: "",
//     email: "",
//     password: "",
//     oldPassword: ""
// });
// var user = user.user

// function handleChange(e){
//   //console.log(e.target.value);
//   setState({
//     ...state,
//     [e.target.name]: e.target.value,
//   });
// }

// function handleSubmit(e){
//   //console.log(e);
//     const cambios =  {
//     name: state.name,
//     email: state.email,
//     password: state.password,
//     oldPassword: state.oldPassword
//   }
//   if(cambios.name.length === 0){cambios.name = user.name}
//   if(cambios.email.length === 0){cambios.email = user.email}

//   putUser(id, cambios).payload
//   .then(resp => {
//     console.log(resp)
//     reload()
//   })
// }

// function onDelete(){
//   deleteUser(id)
//   .then(resp => {
//     console.log(resp)
//   })
//   reload()
// }
// function reload(){
//   window.location.reload()
// }
// if(!id){
//   return(
//     <div>
//       <h1>Debes iniciar sesión o registrarte para ver tu perfil</h1>
//       <a href="/register">Registrarme</a>
//       <a href="/login">Iniciar Sesión</a>
//     </div>
//   )
// }else{
//     return (
//       <div className={Estilo.productoGrande} >
//           <h1 className={Estilo.bienvenido} >Bienvenido {user.name} ! </h1>
//           <h2 className={Estilo.producto} >Tu email : {user.email}  </h2>
//               <div>
//                   <form onSubmit={handleSubmit}>
//                     <div>
//                       <div  className={Estilo.nombre}>
//                         <label >Nombre:</label>
//                         <input type="text" placeholder={user.name} name="name" onChange={handleChange}  className={Estilo.nombre2}/>
//                       </div>
//                       <div className={Estilo.email}>
//                         <label>Email:</label>
//                         <input type="email" placeholder={user.email} name="email" onChange={handleChange} className={Estilo.email2}/>
//                       </div>
//                       <div className={Estilo.password}>
//                         <label>Contraseña vieja(tenga en cuenta que si no es correcta la vieja contraseña, esta no se modificara):</label>
//                         <input type="text" placeholder="Ingrese antigua contraseña" name="oldPassword" onChange={handleChange} className={Estilo.password2} />
//                       </div>
//                       <div>
//                         <label>Nueva Contraseña:</label>
//                         <input type="text" placeholder="Ingrese nueva contraseña"  name="password" onChange={handleChange} className={Estilo.password2} />
//                       </div>

//                       <div className={Estilo.botonesFinales} >
//                         <button type="submit" value="Actualizar" className={Estilo.botoncitos} >
//                           Modificar datos
//                         </button>
//                         <button type="submit" onClick={onDelete} className={Estilo.botoncitos2}  >
//                           Eliminar Cuenta
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//             </div>
//       </div>
//     );
//   }}


// function mapStateToProps(state) {
//   //console.log(state.auth);
//   const { user } = state.auth.user;
//   return {
//     user,
//   };
// }

// export default connect(mapStateToProps)(Perfil);
