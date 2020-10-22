const server = require('express').Router();
require('dotenv').config()
const { User } = require('../db.js');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const passport = require('passport');


server.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    let user = await User.findOne({
      where: {
        email: email
      }
    })
    if (!user) {
      return res.status(401).json({ message: 'No se encontró el mail: ', email: email });
    }
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.log(err);
      }
      if (isMatch) {
        passport.authenticate('local', {
          successRedirect: `/${user.id}`,
          failureRedirect: '/login'
        })
        return res.json({ message: 'ok' })
      } else {
        return res.status(401).json({ message: 'Contraseña Incorrecta' })
      }
    });
  }
})


server.get('/me', (req, res) => {
  res.json({ message: "Usted está autorizado correctamente!", user: req.user });
});

module.exports = server;

