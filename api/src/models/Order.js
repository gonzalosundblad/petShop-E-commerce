const { DataTypes } = require('sequelize');
const { conn } = require('./db.js');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

  // defino el modelo

const Order = conn.define('order', {
    price: {
        type: DataTypes.INTEGER,
        defaultValue: "0"
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: "1"
    }
});



module.exports = {
    Order
}