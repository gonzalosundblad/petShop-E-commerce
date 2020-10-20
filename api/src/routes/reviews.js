const server = require('express').Router();
const { Product, Review, User } = require('../db.js');


server.post('/product/:id/review', (req, res) =>{//------------ Insertar una Review a un Producto
    const product_id = req.params.id;
    const { qualification, description, user_id } = req.body;
    Review.create({
        qualification,
        description,
        user_id,
        product_id,
    })
    .then((data) => {
        res.status(201).send(data)        
    })
    .catch((error) => {
        res.status(400).json({status: 400, message: error})
    })
})

server.put('/product/:id/review/:idReview', (req, res) => {
    const { id, idReview } = req.params;
    const { qualification, description } = req.body;

    Review.update({
        description,
        qualification
    },{
        returning: true,
        where: {
            product_id: id,
            review_id: idReview
        }
    })
    .then((data) => {
        res.status(200).json(data)        
    })
    .catch((error) => {
        res.status(400).json({status: 400, message: error})
    })
})

server.delete('/product/:id/review/:idReview', (req, res) => {           //S56 : Crear Ruta para eliminar Review
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

server.get('/product/:id/review', (req, res) => {
    const { id } = req.params;
    Review.findAll({
		include: { model: User },
		where: { product_id: id }
    })
    .then(data => {
        res.json(data).status(200)
    })
    .catch(err => {
        console.log('Error: ', err)
        res.send('Ocurrio un error :(')
    })
})

module.exports = server;