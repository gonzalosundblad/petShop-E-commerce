const server = require('express').Router();
const { Product, Category, productcategory, User, Order, LineaDeOrden } = require('../db.js');
const { isAuthenticated, isAdmin, isNotAuthenticated } = require("../passport");

server.get('/', isAdmin, (req, res) => {                //S44 : Crear ruta que retorne todas las ordenes (si hay params retorna la de params -> state)
  if (req.query.state) {
    Order.findAll({
      where: {
        orderState: req.query.state
      }
    })
      .then(orders => {
        return res.json(orders);
      })
      .catch(err => {
        return res.send('No hay ordenes en este estado')
      })
  }
  Order.findAll()
    .then(orders => {
      res.json(orders);
    })
    .catch(err => {
      res.send('No hay ordenes :(')
    });
})

server.get('/:id', isAuthenticated, (req, res) => {     //S46 : Crear Ruta que retorne una orden en particular.
  Order.findByPk(req.params.id)
    .then(order => {
      res.json(order)
    })
    .catch(err => {
      res.send('Esta orden no existe')
    })
})

server.put('/:id', isAuthenticated, (req, res) => {     //S47 : Crear Ruta para modificar una Orden
  const { orderState } = req.body
  Order.update({
    orderState
  }, {
    returning: true,
    where: {
      id: req.params.id
    }
  }).then(function (order) {
    if (order[0] == 0) {
      res.status(400).send('Error, campos requeridos')
      return order[0];
    }
    res.status(200).json(order)
  }).catch(err => {
    res.status(400)
    console.log('Error: ', err)
  })
});

module.exports = server;