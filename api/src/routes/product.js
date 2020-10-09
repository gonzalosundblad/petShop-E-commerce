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


// server.get('/:id', (req, res) => {


// 	Product.findAll({
// 		where: {
// 			id: req.params.id
// 		}
// 		// include: {
// 		//   model: Category,
// 		// //   required: true
// 		// }
// 	  }).then(hola => {
// 		  console.log(hola)})
// 	//   }).then(info => {
// 	// 	res.json({
// 	// 		name: info.name,
// 	// 		description: info.description,
// 	// 		price: info.price,
// 	// 		stock: info.stock,
// 	// 		category: info.categoryId
// 	// 	})
// 	// })
// })



server.get('/:id', (req, res) => {


	Product.findOne({
		where: {
			id: req.params.id
		}
	}).then(info => {
		res.json({
			name: info.name,
			description: info.description,
			price: info.price,
			stock: info.stock,
			category: info.categoryId
		})
	})
})

module.exports = server;
