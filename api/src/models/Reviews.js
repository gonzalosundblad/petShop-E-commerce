const { DataTypes } = require('sequelize');
const { conn } = require('./db.js');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

  // defino el modelo

const Review = conn.define('review', {
    text: DataTypes.TEXT
});



module.exports = {
    Review
}