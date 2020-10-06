const { DataTypes } = require('sequelize');
const { conn } = require('./db.js');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

  // defino el modelo

const Categories = conn.define('categories', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    }
});

var Perros =  Categories.create({
    name: "Perros"
});

var Gatos =  Categories.create({
    name: "Gatos"
});

var Roedores =  Categories.create({
    name: "Roedores"
});



module.exports = {
    Categories
}