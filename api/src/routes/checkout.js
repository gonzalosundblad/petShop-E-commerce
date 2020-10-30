const server = require('express').Router();
const { User, Order } = require('../db.js');
const crypto = require('crypto');
require('dotenv').config();
const nodemailer = require('nodemailer');

const {
        EMAIL_ADDRESS, 
        EMAIL_PASSWORD
      } = process.env;



server.post('/', (req, res) => {


    if (req.body.email === '') {
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
        
        // ACA HARIA LA REQ AL BANCO PARA Q ME HAGAN EL PAGO. SI TODO OK ENTONCES SIGO SINO NO. LO SIMULO CON UN IF(MATHRANDOM)

    if(Math.random() > 0.5) {  

        Order.update({
            orderState: "completa"
        },{
            returning: true,
            where: {
                userId: user.user_id,
                orderState: "carrito"
            }
        }).then(function (order) {
            if (order[0] == 0) {
              res.status(400).send('Error, no encontramos una orden para completar')
              return order[0];
            }
            // res.status(200).json(order)
          }).catch(err => {
            res.status(400)
            console.log('Error: jee', err)
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
          subject: 'Tu compra ha sido confirmada!',
          text:
            'Este es el resumen de su compra: ${poner compra aca poniendo el texto entero entre backticks cuando tenga la data de la compra q me llega del store}\n\n'
            
            +'Gracias por confiar en nosotros!'

            + 'ANDOOO *sticker de agusamani*'
        };

        console.log('sending mail');

        
            transporter.sendMail(mailOptions, (err, response) => {
          if (err) {
            console.error('there was an error: ', err);
          } else {
            console.log('here is the res: ', response);
            res.status(200).send('checkout email sent');
          }
        });
      } else {
          res.send('checkout failed mai frend')
      }}
    })

})

module.exports = server;