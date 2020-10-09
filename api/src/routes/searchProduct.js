const server = require('express').Router();
const { Product, Category } = require('../db.js');
const Sequelize = require('sequelize');
const {or, and, gt, lt} = Sequelize.Op;



server.get('/', function(req, res) {    //UN SEARCH PARA BUSCAR TODOS LOS PRODUCTOS QUE MATCHEEN CON EL QUERY PARAMS

    Product.findAll({
        where: {
            [Sequelize.Op.or]: [
                {name: {
                    [Sequelize.Op.iLike] : '%' + req.query.products + '%'}},
                {description: {
                    [Sequelize.Op.iLike] : '%' + req.query.products + '%'}}
                ] 
            }
    }).then(rta => {
        res.json(rta)
    })
});





module.exports = server;