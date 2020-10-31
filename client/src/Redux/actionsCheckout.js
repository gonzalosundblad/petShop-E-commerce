
export function datosEnvio(payload) {
    console.log(payload)
  return {
      type: 'SET_DATOS_ENVIO', 
      payload
  }
};

