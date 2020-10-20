const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

  // defino el modelo

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('order', {
    orderState: {
      type: DataTypes.ENUM('carrito', 'creada', 'procesando', 'cancelada', 'completa'),
      defaultValue: 'carrito'
    }
  }
)};




