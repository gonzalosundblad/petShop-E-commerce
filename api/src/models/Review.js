const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
// defino el modelo
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('review', {
    review_id:{
      type:DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    description: {
      type: DataTypes.TEXT
    },
    qualification:{
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
          min:1,
          max:5,
      }
    }
  }
  
)};

