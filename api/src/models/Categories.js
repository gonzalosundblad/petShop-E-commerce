const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

  // defino el modelo

  module.exports = (sequelize) => {
    // defino el modelo
     sequelize.define('category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    }
  }
  )};

var Perros =  Categories.create({
    name: "Perros"
});

var Gatos =  Categories.create({
    name: "Gatos"
});

var Roedores =  Categories.create({
    name: "Roedores"
});


