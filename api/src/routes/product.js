const server = require('express').Router();
const { Product, Category } = require('../db.js');

server.get('/', (req, res, next) => {

	Product.findAll()
		.then(products => {
			res.json(products);
		})
		.catch(next);
});

// server.get('/category/:nombreCat', (req, res, next) => {
// 	let nombreCat = req.params.nombreCat
// 	Category.findAll()
// 		.then(cat => {
// 			res.json(cat)
// 		})
// 		.catch(next);
// });


server.get('/categorias/:nombreCat', (req, res, next) => {
	Product.findAll({
		where: {
			category: req.params.nombreCat
		}
	})
		.then(cat => {
			res.send(cat)
		})
		.catch(function(err){
			console.log(err)
		})
})

module.exports = server;
