// import React,{useEffect} from 'react';
// import { deleteUser } from '../Redux/actionsOrden';
// import { getMe } from '../Redux/actionsLogin';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';

// function EliminarCuenta({getMe, deleteUser, user}){
    
    

//     function onDelete() {
//     const id = user.user.user_id
//     deleteUser(id)
//     }

//     return (
//         <div class="modal">
//             <div class="modal-dialog" role="document">
//                 <div class="modal-content">
//                 <div class="modal-header">
//                     <h5 class="modal-title">Eliminar Cuenta</h5>
//                     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//                     <span aria-hidden="true">&times;</span>
//                     </button>
//                 </div>
//                 <div class="modal-body">
//                     <p> ¿Seguro que desea eliminar la cuenta?</p>
//                 </div>
//                 <div class="modal-footer">
//                     <button type="button" class="btn btn-primary" onClick={onDelete}>Si, eliminar.</button>
//                     <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
//                 </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// function mapStateToProps(state) {
//     return {
//       user: state.auth.user
//     };
//   }
  
//   function mapDispatchToProps(dispatch) {
//     return {
//       dispatch,
//       ...bindActionCreators({deleteUser, getMe }, dispatch)
//     }
//   }
  
//   export default connect(mapStateToProps, mapDispatchToProps)(EliminarCuenta);