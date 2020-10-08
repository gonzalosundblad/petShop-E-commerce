const server = require('express').Router();
const { Product, Category } = require('../db.js');

server.get('/', (req, res, next) => {

	Product.findAll()
		.then(products => {
			res.json(products);
		})
		.catch(next);
});

server.get('/category/:nombreCat', (req, res, next) => {

	Category.findOne({
		where: {
			name: req.params.nombreCat
		}
	}).then(cat => {
		return cat.id
	}).then(loquellega => {
		Product.findAll({
		where: {
			categoryId: loquellega
		}
	}).then(cat => {
		res.json(cat)
	}).catch(function(err){
		res.status(500)
		res.json(err)
		})
	})	
})

server.get('/:id', (req, res) => {

	var promiseProduct = Product.findByPk(req.params.id)
	var promiseCategory = Category.findAll();

	Promise.all([promiseProduct, promiseCategory])
		.then(function(values){
	  		var product = values[0];
	  		var lista = values[1];
		  	var ele = lista.find(element => element.id === product.categoryId);
		  	var objeto = {
			  	name : product.name,
				description : product.description,
				price: product.price,
				stock: product.stock,
			  	categoria : ele.name,
		  	}
		res.json(objeto)
	}).catch(err => res.send('Producto no encontrado'))
})


module.exports = server;
