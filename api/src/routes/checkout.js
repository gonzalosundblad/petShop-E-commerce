const server = require('express').Router();
const { User, Order } = require('../db.js');
const crypto = require('crypto');
require('dotenv').config();
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const {
  EMAIL_ADDRESS,
  EMAIL_PASSWORD
} = process.env;

var n = 0; // para asegurarme q falle seguido la req al banco y asi poder mostrar ambas pantallas

server.post('/', (req, res) => {
  console.log(__dirname)
  const { email, nombre, apellido, direccion, pisoDepto, CP, ciudad, provincia, precioFinal, carrito } = req.body;

  var productos = []
  for(var i = 0; i < carrito.length; i++) {
    productos.push(' ' + carrito[i].LineaDeOrden.quantity + ' ' + carrito[i].name)
  }
  
  var sendImg = {
    orderId: carrito[0].LineaDeOrden.order_id,
    nombre: nombre,
    apellido: apellido,
    direccion: direccion,
    pisoDepto: pisoDepto,
    ciudad: ciudad,
    provincia: provincia,
    CP: CP,
    productos: productos,
    price: precioFinal,
    
  }
  for(var i = 0; i < carrito.length; i++) {
    sendImg[i] = carrito[i].image 
  }


  console.log(req.body);

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
        //pero tambien quiero q falle la primera vez para mostrar ambas pantallas 
    n = n + 1 
    if(Math.random() > 0.5 && n > 1) {  

        Order.update({
          orderState: "completa"
        }, {
          returning: true,
          where: {
            userId: user.user_id,
            orderState: "creada"
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
          service: 'gmail', // en produccion hay q usar un tercer servicio como nodemailer
          auth: {
            user: EMAIL_ADDRESS,
            pass: EMAIL_PASSWORD,
          },
        });

        // var options = {
        //   viewEngine : {
        //       extname: '.hbs', // handlebars extension
        //       layoutsDir: './views/email/', // location of handlebars templates
        //       defaultLayout: 'template', // name of main template
        //       // partialsDir: 'views/email/', // location of your subtemplates aka. header, footer etc
        //   },
        //   viewPath: './views/email',
        //   extName: '.hbs'
        //   };
        const options = {
          viewEngine: {
            partialsDir: __dirname + "/views/partials",
            // layoutsDir: 'C:/Users/Gonzalo Sundblad/henry/ecommerce-ft05-g2/api/views/layouts',
            layoutsDir: './views/layouts', //ESTO ANDA MUY RARO. SOLO ME DEJA BUSCAR SI LA CARPETA VIEWS ESTA EN /API Y BUSCA COMO SI ESTUVIERA PARADO AHI (PONGO ../../ Y SALE DOS PARA ATRAS DE API. PONGO ./ Y LO ENCUENTRA) QCYOOO


            // layoutsDir: 'C:/Users/Gonzalo Sundblad/henry/ecommerce-ft05-g2/api/src/routes/views/layouts',
            extname: ".hbs"
          },
          extName: ".hbs",
          viewPath: "views"
        };

        transporter.use('compile', hbs(options))
        const order = sendImg;


       
        const mailOptions = {
          from: 'henrypetshop.2020@gmail.com',
          to: `${user.email}`,
          subject: 'Tu compra ha sido confirmada!',
          // text: 
          //   'Este es el resumen de su compra: \n\n'
          //   + `Sera entregada a ${direccion}, ${pisoDepto}, ${ciudad}, ${provincia}, ${CP}\n`
          //   + `Precio final: $${precioFinal}\n`
          //   + `Usted a comprado: ${productos}\n`
          //   + 'Gracias por confiar en nosotros!\n',
            template: "orderConfirmation",
            context: order

          // template: 'template'
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
      }
    }
  })

})

module.exports = server;