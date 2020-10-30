const server = require('express').Router();
const { User } = require('../db.js');
require('dotenv').config()
const passport = require('passport');
const { isAuthenticated, isAdmin, isNotAuthenticated } = require("../passport");

//   '/google'

server.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));

server.get('/callback', passport.authenticate('google', { failureRedirect: '/http://localhost:3000/login' }), 
    function(req, res) {
        console.log(req.user);
        res.send({name: req.user.displayName, email: req.user.emails[0].value, pic: req.user.photos[0].value});
    })









module.exports = server;