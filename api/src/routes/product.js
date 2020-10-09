const server = require('express').Router();
const { Product, Category } = require('../db.js');

server.get('/', (req, res, next) => {  //TRAE TODOS LOS PRODUCTOS

	Product.findAll()
		.then(products => {
			res.json(products);
		})
		.catch(next);
});

server.get('/category/:nombreCat', (req, res, next) => {  //TRAE TODOS LOS PRODUCTOS DE X CATEGORIA

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

server.get('/:id', (req, res) => {			//TRAE EL PRODUCTO DEL CORRESPONDIENTE ID

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
	}).catch(err => res.status(404).send('Producto no encontrado'))
})

server.post('/', (req, res) => {		//AGREGA NUEVOS PRODUCTOS

	const {name, description, price, stock, categoryId } = req.body;
	
	if( !name || !description || !categoryId ){
		return res.status(400).send("Campos requeridos")
	} else {
		Product.create({
				name,
				description,
				price,
				stock,
				categoryId
			})
			.then(function(product){
				res.json(product).status(201)
			})
	}
})
	
server.post('/category', (req, res) => {		//AGREGA NUEVAS CATEGORIAS

	const { name, description } = req.body ;
	
	if(!name){
		return res.status(400).send('Campos requeridos')
	}
	Category.create({
		name,
		description
	}).then(function(category){
		res.json(category).status(200)
	})
})

server.post('/:idProducto/category/:idCategoria', (req, res) => {	//AGREGA CATEGORIA AL PRODUCTO

	const { idProducto, idCategoria } = req.params;

	var product;
	var cat;
	var promesaPro = Product.findByPk(idProducto);
	var promesaCat = Category.findByPk(idCategoria);

	Promise.all([promesaPro, promesaCat])
		.then(function(data){//return product.setCategory(cat)
			product = data[0];
			cat = data[1].id;
			return product.setCategory(cat)
		.then(function(newProduct){
			res.send("Categoria Asignada")
		})
	})
})

server.put('/:id', function(req, res, next) {		//MODIFICA UN PRODUCTO SEGUN SU ID

	const {name, description, price, stock, categoryId } = req.body;

	Product.update({
		name,
		description,
		price,
		stock,
		categoryId
	},{
		returning: true,
		where: {
			id: req.params.id
		}
	}).then(function(product) {
		res.status(200).json(product)
	}).catch(err => {
		console.log('Error: ', err)
	})
});

server.put('/category/:id', function(req, res, next) {		//MODIFICA UNA CATEGORIA SEGUN ID

	const {name, description} = req.body;
	
	Category.update({
		name,
		description
	},{
		returning: true,
		where: {
			id: req.params.id
		}
	}).then(function([ rows, [updated] ]) {
		res.status(200);
		res.json(updated)
	})
});

server.delete('/:id', (req, res) => {		//ELIMINA UN PRODUCTO SEGUN ID

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
				res.status(404).send('Este producto nunca exitió');
			})
	}
})



server.delete('/category/:id', (req, res) => {		//ELIMINA UNA CATEGORIA

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