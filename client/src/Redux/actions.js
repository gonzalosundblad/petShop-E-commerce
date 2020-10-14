import GET_ALL from './constantes'


const mostrarCatalogo = () => {
  return axios({
    method: 'get',
    url: 'http://localhost:3001/products/',
    data: data
  })
}