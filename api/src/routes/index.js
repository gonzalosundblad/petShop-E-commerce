const { Router } = require('express');
// import all routers;
const productRouter = require('./product.js');
const searchRouter = require('./searchProduct.js');
const usersRouter = require('./users');
const ordersRouter = require('./orders');
const reviewsRouter = require('./reviews');

var router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/search', searchRouter);          //AGREGAMOS RUTA  /search
router.use('/users', usersRouter);           //AGREGAMOS RUTA  /users
router.use('/orders', ordersRouter);        //AGREMGAMOS RUTA /orders
router.use('/reviews', reviewsRouter);     //AGREGAMOS RUTA  /reviews

module.exports = router;
