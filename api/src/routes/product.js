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





server.post('/', (req, res) => {
	const {name, description, price, stock} = req.body ;
	if(!name || !description){
		return res.status(400).json({error: "Campos requeridos"})
	}
	Product.create({
			name,
		  description,
			price,
			stock
			})
	.then(function(product){
		console.log(product);
    res.json(product).status(200)
  })
})





server.put('/:id', function(req, res, next) {
	const {name, description, price, stock} = req.body;
	Product.update({
		name,
		description,
		price,
		stock
	},
	{
		returning: true,
		where: {
			id: req.params.id
	}
  }
	).then(function([ rows, [updated] ]) {
		res.status(200);
		res.json(updated)
	})
  });


  server.delete('/:id', (req, res) => {

	var productId = req.params.id;

	if(!productId){
		res.status(404).send('Debes ingresar un ID')
	} else {
		Product.findByPk(productId)
			.then(value => {
				value.destroy()
			}).then(value2 => {
				res.status(200).send('Borrado exitosamente');
			}).catch(err => {
				res.status(500).send('Error interno');
			})
	}
})



server.post('/category', (req, res) => { //crear o agregar categoria
	const {name, description} = req.body ;
		if(!name){
			return res.status(400).json({error: "Campos requeridos"})
		}
	Category.create({
		name,
		description
			})
	.then(function(category){
    res.json(category).status(200)
  })
})




server.put('/category/:id', function(req, res, next) {
	const {name, description} = req.body;
	Category.update({
		name,
		description
	},
	{
		returning: true,
		where: {
			id: req.params.id
	}
  }
	).then(function([ rows, [updated] ]) {
		res.status(200);
		res.json(updated)
	})
  });


  server.delete('/category/:id', (req, res) => {

	var categoryId = req.params.id;

	if(!categoryId){
		res.status(404).send('Debes ingresar un ID')
	} else {
		Category.findByPk(categoryId)
			.then(value => {
				value.destroy()
			}).then(value2 => {
				res.status(200).send('Borrado exitosamente');
			}).catch(err => {
				res.status(500).send('Error interno');
			})
	}
});









module.exports = server;
