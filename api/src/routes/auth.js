const server = require('express').Router();
const { User } = require('../db.js');
require('dotenv').config()
const passport = require('passport');
const { isAuthenticated, isAdmin } = require("../passport");

server.post( "/login", isNotAuthenticated, passport.authenticate("local"), (req, res) => {      // S63 : Crear ruta de Login
        console.log(req.user)
        res.send({ user: req.user, logged: true });
    }
);

server.post("/logout", isAuthenticated, (req, res) => {
    req.logOut();
    res.send({ message: "Has cerrado sesión" });
});

server.get('/me', isAuthenticated, (req, res) => {
    res.json({ message: "Usted se ha logueado correctamente!", user: req.user });
});

server.post('/promote/:id', isAdmin,(req, res) => { //   S67 : Crear ruta /promote (Promote convierte al usuario con ID: id a Admin.)
    var user_id = req.params.id;
    User.update({
        role: "admin"
    },{
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

module.exports = server;
