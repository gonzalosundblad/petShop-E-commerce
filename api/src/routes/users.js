const server = require('express').Router();
const { Product, Category, productcategory, User, Order } = require('../db.js');

//   '/users'
// 15/10 preguntar por relaciones (ver en db.js) y preguntar por validacion password (ver modelo user) y preguntar por url de firebase

server.post('/', (req, res) => { // AGREGA NUEVO USUARIO
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



server.put('/:id', (req, res) => {               // MODIFICA USUARIO EXISTENTE POR ID
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

server.get('/', (req, res) => {          // TRAE TODOS LOS USUARIOS
    User.findAll()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
			res.send('No hay usuarios :(')
		});
});


server.delete('/:id', (req, res) => {    // ELIMINA USUARIOS POR ID
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



module.exports = server;
