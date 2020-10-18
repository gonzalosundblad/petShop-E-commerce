const server = require('express').Router();
const { Product, Category, User, Order, LineaDeOrden } = require('../db.js');

//============================USUARIOS=============================

server.post('/', (req, res) => {                        // AGREGA NUEVO USUARIO
    const { name, email, password } = req.body;
    if( !name || !email || !password) {
        return res.status(400).send("Campos requeridos")
    }
    User.create({
        name,
        email,
        password
    }).then(user => {
        res.status(200).json(user)
    }).catch(err => {
        console.log('Error: ', err)
    })
});

server.put('/:id', (req, res) => {                      // MODIFICA USUARIO EXISTENTE POR ID
    const { name, email, password } = req.body;
    User.update({
        name,
        email,
        password,
    },{
        returning: true,
        where: {
            id: req.params.id
        }
    }).then(function(user) {
        if(user[0] == 0) {
			res.status(400).send('Error, campos requeridos')
			return user[0]
        }
        res.status(200).json(user)
    }).catch(err => {
        res.status(400)
        console.log('Error: ', err)
    })

});

server.get('/', (req, res) => {                         // TRAE TODOS LOS USUARIOS
    User.findAll()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
			res.send('No hay usuarios :(')
		});
});

server.delete('/:id', (req, res) => {                   // ELIMINA USUARIOS POR ID
    var userId = req.params.id;
    if(!userId){
		res.status(404).send('Debes ingresar un ID')
    } else {
        User.findByPk(userId)
            .then(value => {
                value.destroy()
            }).then(value2 => {
                res.status(200).send('Borrado exitosamente')
            }).catch(err => {
                res.status(404).send('Este usuario nunca existió')
            })
    }
})

//============================CARRITO===============================

server.post('/:idUser/cart', (req, res) => {            //AGREGA ITEM AL CARRITO
    const idUser = req.params.idUser;
    const { product_id, quantity, price } = req.body;

    Order.findOrCreate({
        where:{
            userId: idUser,
            orderState: 'carrito'
        }
    }).then(ord => {
        const order_id = ord[0].id;
        return LineaDeOrden.create({
            product_id,
            order_id,
            quantity,
            price
        });
    }).then((l) => {
        res.status(200).send(l)
    }).catch(err => {
        res.status(400)
        console.log('Error: ', err)
    })
    
});

server.get('/:idUser/cart', (req, res) => {             //TRAE TODOS LOS ITEMS DE UN USUARIO EN PARTICULAR      
    const idUser = req.params.idUser;
    Order.findAll({
        where: {
            userId: idUser,
            orderState: 'carrito'
        },
        include: {
            model:Product, 
            as: 'products'
        }
    }).then((items) => {
        res.status(200).send(items)
    }).catch((err) => {
        res.status(404).send('Error')
        console.log('Error: ', err)
    })
});

server.delete('/:idUser/cart', (req, res) => {          //VACIA EL CARRITO DE DETERMINADO USUARIO
    const idUser = req.params.idUser;
    Order.findOne({
        where: {
            userId: idUser,
            orderState: 'carrito'
        }
    }).then( orden => {
        return LineaDeOrden.findAll({
            where: { order_id: orden.id }
        })
    }).then( lineaDeOrden => {
        lineaDeOrden.forEach(element => {
           element.destroy() 
        });
    }).then(()=>{
        res.send("Eliminado")
    }).catch((error)=>{
        res.send(error)
    })
});

server.put('/:idUser/cart', function(req, res){         //MODIFICA LA CANTIDAD DE ITEMS DE LA LINEA DE ORDEN
    const idUser = req.params.idUser;
    const { product_id, quantity } = req.body;
    Order.findOne({
        where:{
            userId: idUser,
            orderState: 'carrito'
        }
    }).then(order => {
        console.log(order)
        return LineaDeOrden.findOne({
            where:{
                order_id: order.id,
                product_id
            }
        });
    }).then(orders => {
        return orders.update({
            quantity
        });
    }).then(() => {
        res.status(200).json({product_id, quantity});
    })
})

server.delete('/:idUser/deleteCartProduct', (req, res) => {  //ELIMINA UN PRODUCTO DE LA LINEA DE ORDEN
    const idUser = req.params.idUser;
    const { product_id } = req.body;
    Order.findOne({        
        where: {
            userId: idUser,            
            orderState: 'carrito'
        }
    }).then( orden =>        
        LineaDeOrden.destroy({
            where: {
                order_id: orden.id,
                product_id: product_id,
            }
        })
    ).then( eliminado => {
        res.send( {Eliminaste: eliminado} )
    }).catch((error)=>{
        res.send(error)
    })    
})

module.exports = server;