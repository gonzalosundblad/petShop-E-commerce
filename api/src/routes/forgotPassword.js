const server = require('express').Router();
const { User } = require('../db.js');
const crypto = require('crypto');
require('dotenv').config();
const nodemailer = require('nodemailer');

const {
        EMAIL_ADDRESS, 
        EMAIL_PASSWORD
      } = process.env;


  server.post('/', (req, res) => {
    if (req.body.email === '') {
        console.log(EMAIL_ADDRESS, 
            EMAIL_PASSWORD)
      res.status(400).send('email required');
    }
    console.error(req.body.email);
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user === null) {
        console.error('email not in database');
        res.status(403).send('email not in db');
      } else {
        const token = crypto.randomBytes(20).toString('hex');
        user.update({
          resetPasswordToken: token,
          resetPasswordExpires: Date.now() + 3600000,
        });
        
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: EMAIL_ADDRESS,
            pass: EMAIL_PASSWORD,
          },
        });

        const mailOptions = {
          from: 'henrypetshop.2020@gmail.com',
          to: `${user.email}`,
          subject: 'Link para resetear contraseña',
          text:
            'Este es un mail para actualizar la contraseña de su cuenta de HenryPet\n\n'
            + 'Por favor cliquea en el siguiente link, o copielo y peguelo en el navegador para completar el proceso. La validez del link es de 60 minutos:\n\n'
            + `http://localhost:3000/resetpassword/${token}\n\n`
            + 'Si usted no hizo este pedido, por favor ignore este mail y su contraseña sera conservada.\n',
        };

        console.log('sending mail');

        transporter.sendMail(mailOptions, (err, response) => {
          if (err) {
            console.error('there was an error: ', err);
          } else {
            console.log('here is the res: ', response);
            res.status(200).send('recovery email sent');
          }
        });
      }
    });
  });


  module.exports = server;