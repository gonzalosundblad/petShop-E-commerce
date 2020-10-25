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
        const userData = {
          user: {
            user_id: user.user_id,
            name: user.name,
            last_name: user.last_name,
            role: user.role,
            email: email
          }
        }
        const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '90m' });
        return res.status(200).json({
          accessToken, user: {
            user_id: user.user_id,
            name: user.name,
            last_name: user.last_name,
            role: user.role,
            email: email
          }
        })
      } else {
        return res.status(401).json({ message: 'Contraseña Incorrecta' })
      }
    })
  }
})


server.get('/me', (req, res) => {
  res.json({ message: "Usted está autorizado correctamente!", user: req.isAuthenticated() });
});

module.exports = server;
