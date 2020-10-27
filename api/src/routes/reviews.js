const server = require('express').Router();
const { Product, Review, User } = require('../db.js');
const { isAuthenticated } = require("../passport");

server.post('/product/:id/review', isAuthenticated, (req, res) => {                       //S54 : Crear ruta para crear/agregar Review
    const product_id = req.params.id;
    const { qualification, description, user_id } = req.body;
    Review.create({
        qualification,
        description,
        user_id,
        product_id,
    }).then((data) => {
        res.status(201).json(data)
    }).catch((error) => {
        res.status(400).json(error)
    })
})

server.put('/product/:id/review/:idReview', isAuthenticated, (req, res) => {              //S55 : Crear ruta para Modificar Review
    const {id, idReview} = req.params;
    const { qualification ,description } = req.body

    Review.update({
        qualification: qualification,
        description: description
    },{
        where:{
            product_id: id,
            review_id: idReview
        }
    }).then(data => {
        res.send(data).status(200)
    }).catch(err => {
        console.log('Error: ', err)
        res.status(400).send(err)
    })
})

server.delete('/product/:id/review/:idReview', isAuthenticated, (req, res) => {           //S56 : Crear Ruta para eliminar Review
    const {idReview} = req.params

    Review.destroy({
        where:{
            review_id: idReview
        }
    }).then(data => {
        res.send('Review eliminado :)').status(200)
    }).catch(err => {
        console.log('Error: ', err)
        res.send('Ocurrio un error :(')
    })
})

server.get('/product/:id/review/', isAuthenticated, (req, res) => {                       //S57 : Crear Ruta para obtener todas las reviews de un producto.
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
