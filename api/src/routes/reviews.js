const server = require('express').Router();
const { Product, Review, User } = require('../db.js');
const { isAuthenticated } = require("../passport");

server.post('/product/:id/review', (req, res) => {                       //S54 : ruta para crear/agregar Review
  //Guardo el id del producto enviado por params en una constante
  const product_id = req.params.id;
  //Guardo el id del user en una constante
  const user_id = req.user.user_id;
  //Guardo la calificacion y descripcion enviada por body con destructuring
  const { qualification, description } = req.body;
  Review.create({
    qualification,
    description,
    user_id: user_id,
    product_id,
  }).then((data) => {
    //en caso de que haya creado el producto de manera exitosa la devuelvo como un json
    res.status(201).json(data)
  }).catch((error) => {
    //en caso de error devuelvo un 400 y un json con el error
    res.status(400).json(error)
  })
})

server.put('/product/:id/review/:idReview', (req, res) => {              //S55 : ruta para Modificar Review
  //Guardo el id del producto y de la review enviado por params en una constante
  const { id, idReview } = req.params;
  //Guardo el id del user en una constante
  const user_id = req.user.user_id;
  //Guardo la calificacion y descripcion enviada por body con destructuring
  const { qualification, description } = req.body;
  Review.update({
    qualification: qualification,
    description: description
  }, {
    returning: true,
    where: {
      user_id: user_id,
      product_id: id,
      review_id: idReview
    }
  }).then(data => {
    // en la data recibida en caso de que todo salio bien devuelve un array con un 1 si se modifica lo solicitado o un 0 en caso de que no haya modificado nada
    res.send(data[1]).status(200)
  }).catch(err => {
    console.log('Error: ', err)
    res.status(400).send(err)
  })
})

server.delete('/product/:id/review/:idReview', (req, res) => {           //S56 : Crear Ruta para eliminar Review
  const { idReview } = req.params;
  const user_id = req.user.user_id;

  Review.destroy({
    where: {
      user_id: user_id,
      review_id: idReview
    }
  }).then(data => {
    //data captura un 1 si el delete se hace exitosamente o un 0 si no se elimina nada
    if (data === 0) {
      res.send('Esta review pertenece a otro usuario o no existe')
    }
    res.send('Review eliminada exitosamente :)').status(200)
  }).catch(err => {
    console.log('Error: ', err)
    res.send('Ocurrio un error :(')
  })
})

server.get('/product/:id/review/', (req, res) => {                       //S57 : Crear Ruta para obtener todas las reviews de un producto.
  const { id } = req.params
  Review.findAll({
    where: {
      product_id: id
    },
    include: {
      model: User
    }
  }).then(response => {
    res.status(200).json(response)
  }).catch(err => {
    res.status(404).json(err)
  })
})

module.exports = server;
