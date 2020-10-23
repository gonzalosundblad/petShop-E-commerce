const server = require('express').Router();
require('dotenv').config()
const passport = require('passport')


server.post(
  "/login",
  passport.authenticate("local"),
  (req, res) => {
    console.log(req.user)
    res.send({ user: req.user, logged: true });
  }
);

server.get('/logout', (req, res) => {
  req.logout();
  res.send('usted hizo logout correctamente')
});



module.exports = server;

