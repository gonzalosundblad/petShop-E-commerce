const server = require('express').Router();
const { User } = require('../db.js');
require('dotenv').config()
const passport = require('passport');
const { isAuthenticated, isAdmin, isNotAuthenticated } = require("../passport");

server.post("/login", isNotAuthenticated, passport.authenticate("local"), (req, res) => {      // S63 : Crear ruta de Login
  res.send({ user: req.user, logged: true });
});

server.post("/logout", isAuthenticated, (req, res) => {                                         // S64 : Crear ruta de logout
  req.logOut();
  res.send({ message: "Has cerrado sesión" });
});

server.get('/me', isAuthenticated, (req, res) => {       
  User.findOne({
    where: {
      email: req.user.email
    }
  }).then(user => {
    res.json({ message: "Usted se ha logueado correctamente!", user: req.session.passport.user})
  })                                      
});

server.post('/promote/:id', isAdmin, (req, res) => {                                             // S67 : Crear ruta /promote (Promote convierte al usuario con ID: id a Admin.)
  var user_id = req.params.id;
  User.update({
    role: "admin"
  }, {
    returning: true,
    where: {
      user_id
    }
  }).then(admin => {
    res.status(200).json(admin[1]);
  }).catch(err => {
    res.status(400).send('errorrororor');
  })
})

//==================GOOGLE AUTHENTICATION========================

server.get('/google', isNotAuthenticated, passport.authenticate('google', { scope: ['profile', 'email'], prompt: "select_account" }));

server.get('/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }), (req, res) => {
  // Successful authentication, redirect home.
  res.redirect('http://localhost:3000');
  res.send({ user: req.user, logged: true })
});

//==================GITHUB AUTHENTICATION========================

server.get('/github', isNotAuthenticated, passport.authenticate('github', { scope: ['user:email'] }));

server.get('/github/callback', passport.authenticate('github', { failureRedirect: 'http://localhost:3000/login' }), (req, res) => {
  // Successful authentication, redirect home.
  res.redirect('http://localhost:3000');
  res.send({ user: req.user, logged: true })
});

module.exports = server;