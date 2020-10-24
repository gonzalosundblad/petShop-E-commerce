const server = require('express').Router();
const { Product, Category, productcategory, User, Order, LineaDeOrden } = require('../db.js');


//   '/orders'
//Si un usuario completa una orden, esa orden debe mantener el precio del item al momento de la compra, sin importar que el precio del producto cambie después.
//PREGUNTA OLIVER RUTA MODIFICAR ORDEN S47
// EN LOS UPDATE, SI HAGO RES.SEND(RESULTADO DE PROMESA) ESTOY MANDANDO EL ARRAY CON ARRAY[0]=1 Y ARRAY[1]=EL OBJETO Q QUIERO MANDAR. CREO QUE DEBERIA RES.SENDEAR SOLO EL ARRAY[1]
// poruqe postman anda raro?
// que es una orden? que es el carrito? un usuario puede tener muchas ordenes dentro de un solo carrito? puede tener dos carritos? estado carrito?
//cuando modifico una orden solo cambio su estado ? creo q deberia poder agregar o sacar productos tmbbbb


server.get('/', (req, res) => {       //S44 : Crear ruta que retorne todas las ordenes (si hay params retorna la de params -> state)
    if(req.query.state) {
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

server.get('/:id', (req, res) => {    //S46 : Crear Ruta que retorne una orden en particular.
    Order.findByPk(req.params.id)
        .then(order => {
            res.json(order)
        })
        .catch(err => {
            res.send('Esta orden no existe')
        })
})

server.put('/:id', (req, res) => {    //S47 : Crear Ruta para modificar una Orden ..... modifica solo el state?????
    const { orderState } = req.body
    Order.update({
        orderState
    },{
        returning: true,
        where: {
            id: req.params.id
        }
    }).then(function(order) {
        if(order[0] == 0) {
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