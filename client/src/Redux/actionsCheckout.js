
export function datosEnvio(payload) {
    console.log(payload)
  return {
      type: 'SET_DATOS_ENVIO', 
      payload
  }
};

// export function editarUno(payload) {
//     console.log(payload)
//     return {
//         type: 'SET_EDIT_DATA',
//         payload
//     }
// }