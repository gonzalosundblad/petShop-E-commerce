const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
   sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    precio: {
      type: DataTypes.DECIMAL,
      defaultValue: '0'
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: '0'
    },
    // image: {
    //   type: DataTypes.BLOB,
    //   allowNull: false
    // //como poner placeholder de default.
    // }
  });
};


