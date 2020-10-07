const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

  // defino el modelo

  module.exports = (sequelize) => {
    // defino el modelo
     sequelize.define('order', {
    price: {
        type: DataTypes.INTEGER,
        defaultValue: "0"
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: "1"
    }
  }

 )};




