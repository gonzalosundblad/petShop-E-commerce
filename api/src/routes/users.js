const server = require('express').Router();
const { Product, User, Order, LineaDeOrden } = require('../db.js');
const bcrypt = require('bcrypt');


//============================USUARIOS=============================

server.post('/', (req, res) => {//S34 : Crear Ruta para creación de Usuario
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
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

server.put('/:id', (req, res) => {  //S35 : Crear Ruta para modificar Usuario segun id
  const { id } = req.params;
  const { name, email, password, newPassword, last_name } = req.body;
  console.log(req.body)
  User.update({
    name,
    last_name,
    email,
    password: newPassword
  }, {
    returning: true,
    where: {
      user_id: id
    }
  }).then(function (user) {
    console.log(user)
    if (user[0] == 0) {
      res.status(400).send('Error, campos requeridos')
      return user[0]
    }
    res.status(200).json(user)
  }).catch(err => {
    res.status(400)
    console.log('Error: ', err)
  })
});

server.get('/', (req, res) => {//S36 : Crear Ruta que retorne todos los Usuarios
  User.findAll()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.send('No hay usuarios :(')
    });
});

server.delete('/:id', (req, res) => { //S37 : Crear Ruta para eliminar Usuario
  var userId = req.params.id;
  if (!userId) {
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

//===========================Contraseña Nueva ====================
server.put('/:id/passwordReset', async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  User.update({
    password: password
  }, {
    returning: true,
    where: {
      user_id: id
    }
  }).then((user) => {
    res.json(user)
  })
    .then(user => {
      return res.status(201).json(user)
    })
})

//============================CARRITO===============================

server.post('/:idUser/cart', (req, res) => {                            //S38 : Crear Ruta para agregar Item al Carrito
  const { idUser } = req.params;
  const { product_id, quantity, price } = req.body;
  Order.findOrCreate({
    where: {
      userId: idUser,
      orderState: 'carrito'
    }
  }).then(ord => {
    // console.log(ord[0])
    const order_id = ord[0].id;
    return LineaDeOrden.create({
      product_id,
      order_id,
      quantity,
      price
    });
  }).then((l) => {
    console.log(l);
    res.status(200).send(l)
  }).catch(err => {
    res.status(400)
    console.log('Error: ', err)
  })
});

server.get('/:idUser/cart', (req, res) => {                             //S39 : Crear Ruta que retorne todos los items del Carrito
  const { idUser } = req.params;
  Order.findAll({
    where: {
      userId: idUser,
      orderState: 'carrito'
    },
    include: {
      model: Product,
      as: 'products'
    }
  }).then((items) => {
    res.status(200).send(items)
  }).catch((err) => {
    res.status(404).send('Error')
    console.log('Error: ', err)
  })
});

server.get('/:idUser/cart/orders', (req, res) => {                      //SCREADA : Crear Ruta que retorne todos los items de la orden creada
  const { idUser } = req.params;
  Order.findAll({
    where: {
      userId: idUser
    },
    include: {
      model: Product,
      as: 'products'
    }
  }).then((items) => {
    res.status(200).send(items)
  }).catch((err) => {
    res.status(404).send('Error')
    console.log('Error: ', err)
  })
});

server.delete('/:idUser/cart', (req, res) => {                          //S40 : Crear Ruta para vaciar el carrito
  const idUser = req.params.idUser;
  Order.findOne({
    where: {
      userId: idUser,
      orderState: 'carrito'
    }
  }).then(orden => {
    return LineaDeOrden.findAll({
      where: { order_id: orden.id }
    })
  }).then(lineaDeOrden => {
    lineaDeOrden.forEach(element => {
      element.destroy()
    });
  }).then(() => {
    res.send("Eliminado")
  }).catch((error) => {
    res.send(error)
  })
});

server.put('/:idUser/cart', function (req, res) {                         //S41 : Crear Ruta para editar las cantidades del carrito
  const idUser = req.params.idUser;
  const { product_id, quantity } = req.body;
  Order.findOne({
    where: {
      userId: idUser,
      orderState: 'carrito'
    }
  }).then(order => {
    console.log(order)
    return LineaDeOrden.findOne({
      where: {
        order_id: order.id,
        product_id
      }
    });
  }).then(orders => {
    return orders.update({
      quantity
    });
  }).then(() => {
    res.status(200).json({ product_id, quantity });
  })
})

server.delete('/:idUser/deleteCartProduct', (req, res) => {             //ELIMINA UN PRODUCTO DE LA LINEA DE ORDEN invento de eric para eliminar de a 1 en vez de vaciar todo de un saque
  const idUser = req.params.idUser;                                   // S111: INVENTO DE ERIC
  const { product_id } = req.body;
  Order.findOne({
    where: {
      userId: idUser,
      orderState: 'carrito'
    }
  }).then(orden =>
    LineaDeOrden.destroy({
      where: {
        order_id: orden.id,
        product_id: product_id,
      }
    })
  ).then(eliminado => {
    res.send({ Eliminaste: eliminado })
  }).catch((error) => {
    res.send(error)
  })
})

//===========================Ordenes================================

server.get('/:id/orders', (req, res) => {                               //S45: Crear Ruta que retorne todas las Ordenes de los usuarios
  Order.findAll({
    where: {
      userId: req.params.id
    }
  })
    .then(orders => {
      res.json(orders)
    })
    .catch(err => {
      res.send('Este usuario no tiene ordenes')
    })
});



module.exports = server;
