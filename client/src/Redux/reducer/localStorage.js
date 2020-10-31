var array = []

export const loadState = () => {
    const request = [];
    for(var i = 0; i < localStorage.length; i++){
      let clave = localStorage.key(i);
      if(clave !== "carrito" && clave !== "user"){
        let prod = JSON.parse(localStorage.getItem(clave));
        request.push(prod);
      }
    }
    return request;
};
export const saveState = (state) => {
  try {
    let serializedData = JSON.stringify(state);
    localStorage.setItem(state.product_id, serializedData);
  } catch (error) {
  }
};

export const clearState = () => {
  for(var i = 0; i < localStorage.length; i++){
    let clave = localStorage.key(i);
    console.log(clave);
    if(clave !== "carrito" && clave !== "user"){
      localStorage.removeItem(clave)
    }
  }
};