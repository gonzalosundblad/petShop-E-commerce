const server = require('express').Router();
const { Product, Category, productcategory } = require('../db.js');

server.get('/', (req, res, next) => {  //TRAE TODOS LOS PRODUCTOS
	Product.findAll()
		.then(products => {
			res.json(products);
		})
		.catch(next);
});

server.get('/category/:nombreCat', (req, res, next) => {  //TRAE TODOS LOS PRODUCTOS DE X CATEGORIA
	const nombreCat = req.params.nombreCat
	Category.findAll({
		include : {
			model : Product
		},
		where : {
			name : nombreCat
		}
	})
	.then(data => {
		res.json(data[0].products);
	})
})

server.get('/:id', (req, res) => {			//TRAE EL PRODUCTO DEL CORRESPONDIENTE ID
	var arr = [];
	Product.findByPk(req.params.id, {
		include: {
			model: Category
		}
	}).then(function(data) {
		for (let i = 0; i < data.categories.length; i++) {
			arr.push(data.categories[i].name)
		}
		console.log(data)
		res.json({
			name: data.name,
			description: data.description,
			price: data.price,
			stock: data.stock,
			image: data.image,
			categories: arr
		})
	})
})

server.post('/', (req, res) => {		//AGREGA NUEVOS PRODUCTOS
	const {name, description, price, stock } = req.body;
	if( !name || !description ){
		return res.status(400).send("Campos requeridos")
	} else {
		Product.create({
				name,
				description,
				price,
				stock
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

server.post('/:idProducto/category/:idCategoria', (req, res) => {		//AGREGA UNA CATEGORIA A UN PRODUCTO
	const { idProducto, idCategoria } = req.params;
	Product.findByPk(idProducto)
	.then(data => {
		data.addCategories(idCategoria)
		res.send('categoria agregada')
	})
})

server.delete('/:idProducto/category/:idCategoria', (req, res) => {		//ELIMINA UNA CATEGORIA DE UN PRODUCTO
	const { idProducto, idCategoria } = req.params;
	Product.findByPk(idProducto)
	.then(data => {
		data.removeCategories(idCategoria)
		res.send('categoria eliminada')
	})
})

server.put('/:id', function(req, res, next) {       //MODIFICA UN PRODUCTO SEGUN SU ID
    const {name, description, price, stock } = req.body;
    Product.update({
        name,
        description,
        price,
        stock
    },{
        returning: true,
        where: {
            id: req.params.id
        }
    }).then(function(product) {
        if(product[0] == 0) {
        return product[0]
        }
        res.status(200).json(product)
    }).then(err => {
        res.status(400).send('Error, campos requeridos')
    }).catch(err => {
        res.status(400)
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