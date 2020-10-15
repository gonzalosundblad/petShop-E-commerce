const server = require('express').Router();
const { Product, Category, productcategory } = require('../db.js');

server.get('/', (req, res, next) => {  //TRAE TODOS LOS PRODUCTOS
	Product.findAll()
		.then(products => {
			res.json(products);
		})
		.catch(err => {
			res.send('No hay productos :(')
		});
});

server.get('/category', (req, res) => {
	Category.findAll()
		.then(function(categ) {
			res.json(categ)
		}).catch(err => {
			console.log('Error: ', err)
			res.send('No hay categorias o ocurrio un error :(').status(400)
		})
})

server.get('/category/:nombreCat', (req, res, next) => {  //TRAE TODOS LOS PRODUCTOS DE X CATEGORIA
	const nombreCat = req.params.nombreCat
	Category.findAll({
		include : {
			model : Product
		},
		where : {
			name : nombreCat
		}
	}).then(data => {
		res.json(data[0].products);
	}).catch(err => {
		console.log('Error: ', err)
		res.send('No existe esa categoria :(').status(404)
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
	}).catch(err => {
		console.log('Error: ', err)
		res.send('No existe ese producto :(')
	})
})

server.post('/', (req, res) => {		//AGREGA NUEVOS PRODUCTOS
	const {name, description, price, stock, categoryId, image} = req.body;
	console.log(req.body)
	if( !name || !description ){
		return res.status(400).send("Nombre y descripcion son requeridos")
	} else if(!categoryId) {
		Product.create({ 
			name, 
			description, 
			price, 
			stock, 
			image: `https://firebasestorage.googleapis.com/v0/b/petshopfiles.appspot.com/o/fotosProductos%2F${image.slice(12)}?alt=media&token`
		 })
			.then(function(productSinId) {
				productSinId.addCategories("0")
				res.json(productSinId)
			})
	} else {
		var category = Category.findAll({
			where: {
				id: categoryId
			}
		})
		var producto = Product.create({ 
			name, 
			description, 
			price, 
			stock, 
			image: `https://firebasestorage.googleapis.com/v0/b/petshopfiles.appspot.com/o/fotosProductos%2F${image.slice(12)}?alt=media&token` 
		 })
		Promise.all([category, producto])
			.then(values => {
				var category = values[0]
				var producto = values[1]
				if(category && producto) {
					producto.addCategories(category)
					res.json(producto)
				} else {
					res.json(producto)
				}
			}).catch(err => {
				console.log('Error: ', err)
				res.send('Ocurrio un error :(').status(404)
			})	
	}
})
	
server.post('/:idProducto/category/:idCategoria', (req, res) => {		//AGREGA UNA CATEGORIA A UN PRODUCTO
	const { idProducto, idCategoria } = req.params;
	Product.findAll({
		include: { model: Category },
		where: { id: idProducto }
	}).then(function(product) {
		if(product[0].categories[0].id === 0) {		//Si tiene categoryId 0 (Sin categoria) le asigna el categoryId recibido por params
			product[0].setCategories(idCategoria)
			res.json(product)
		} else {									
			product[0].addCategories(idCategoria)	//Si ya tenia un categoryId anteriormente le asigno otro existente a parte del que tenia
			console.log(product[0])
			res.json(product)
		}
	})
	// Product.findByPk(idProducto)
	// .then(data => {
	// 	data.addCategories(idCategoria)
	// 	res.send('categoria agregada')
	// }).catch(err => {
	// 	console.log('Error: ', err)
	// 	res.send('Ese producto o categoria no existe :(')
	// })
})

server.post('/category', (req, res) => {		//AGREGA NUEVAS CATEGORIAS
  const { name, description } = req.body ;
  console.log(req.body)
	if(!name){
		return res.status(400).send('Campos requeridos')
	}
	Category.create({
		name,
		description
	}).then(function(category){
		res.json(category).status(200)
	}).catch(err => {
		console.log('Error: ', err)
	})
})

// server.delete('/:idProducto/category/:idCategoria', (req, res) => {		//ELIMINA UNA CATEGORIA DE UN PRODUCTO
// 	const { idProducto, idCategoria } = req.params;
// 	Product.findByPk(idProducto)
// 	.then(data => {
// 		data.removeCategories(idCategoria)
// 		res.send('La categoria fue eliminada del producto')
// 	}).catch(err => {
// 		console.log('Error: ', err)
// 		res.send('Ocurrio un error :(')
// 	})
// })

server.delete('/:idProducto/category/:idCategoria', (req, res) => {		//ELIMINA UNA CATEGORIA DE UN PRODUCTO
	const { idProducto, idCategoria } = req.params;
	Product.findAll({
		include: { model: Category },									
		where: { id: idProducto }
	}).then(data => {
		var arr = [];
		for (let i = 0; i < data[0].categories.length; i++) {			//recorro todas las categorias del producto
			arr.push(data[0].categories[i].id)
		}
		console.log(arr)//												   ----------------------------------------------------------
		if(arr.length > 1) {	// <---------------Pregunto-------------- ||  si tiene mas de 1 categoria solo elimino la categoria ||
			data[0].removeCategories(idCategoria)//						  ||--------------------------------------------------------||
			res.send('Categoria eliminada')	// 						      ||  se elimina PERO se mantienen las demas categorias     ||
		} else {//														   ----------------------------------------------------------
			data[0].setCategories('0')// <--------------------------------||Si tiene solo una categoria? le asigno la categoria 0   ||
			res.send('Categoria eliminada')//                             || para mantenerla en la tabla de union con esa categoria ||
		}//																   ----------------------------------------------------------
	}).catch(err => {
		console.log('Error: ', err)
		res.send('Ocurrio un error :(')
	})
})

server.put('/:id', function(req, res) {       //MODIFICA UN PRODUCTO SEGUN SU ID
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
			res.status(400).send('Error, campos requeridos')
			return product[0]
        }
        res.status(200).json(product)
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