const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

const User = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "No es un email valido"
        },
        notNull: {
          msg: 'Email obligatorio'
        }
      },
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user',
      validate: {
        len: {
          args: [4, 5],
          msg: "No es un role valido"
        },
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    googleAccount: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    githubAccount: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    resetPasswordToken: DataTypes.STRING,
    resetPasswordExpires: DataTypes.DATE
  });
};

module.exports = User;


