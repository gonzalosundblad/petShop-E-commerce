const server = require('express').Router();
require ( 'dotenv' ).config()
const {  User } = require('../db.js');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const checkPassword = async(user, password) => {
	const comparacion = await bcrypt.compare(password, user.password)
	return comparacion
};

server.post("/login",( req, res, next ) => {
	const email = req.body.email
	const password = req.body.password
	User.findOne({
		where:{ email }
	})
	.then(user => {
		if(!user) return res.json('Esta dirección de correo no se encuentra registrada');
		checkPassword(user,password)
            .then( match => {
                if( match ){
                    const userData = { user: {
                        user_id : user.user_id,
                        name : user.name,
                        last_name : user.last_name,
                        role : user.role,
                        email : email
                        }
                    }
                    const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '90m' });
                    return res.status(200).json({accessToken, user : {
                        user_id : user.user_id,
                        name : user.name,					
                        last_name : user.last_name,
                        role : user.role,
                        email : email
                    }})
                } else {
                    res.status(401).json('Contraseña incorrecta')
                }
            })
        }).catch(err => {
            res.status(400).json("Ocurrio un error :(")
        })
});

module.exports = server