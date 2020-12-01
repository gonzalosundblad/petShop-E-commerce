const server = require('express').Router();
const { User } = require('../db.js');
const { Sequelize } = require('sequelize');

const Op = Sequelize.Op;

  server.get('/', (req, res) => {
    User.findOne({
      where: {
        resetPasswordToken: req.query.resetPasswordToken,
        resetPasswordExpires: {
          [Op.gt]: Date.now(),
        },
      },
    }).then((user) => {
      if (user == null) {
        console.error('password reset link is invalid or has expired');
        res.status(403).send('password reset link is invalid or has expired');
      } else {
        res.status(200).send({
          name: user.name,
          message: 'password reset link a-ok',
        });
      }
    });
  });

  module.exports = server;
