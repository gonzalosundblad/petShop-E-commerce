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

module.exports = server;
