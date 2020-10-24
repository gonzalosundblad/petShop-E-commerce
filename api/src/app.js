const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require("passport-local").Strategy;
const { User } = require('./db');
const bcrypt = require("bcrypt");


require('./db.js');

const server = express();
server.name = 'API';
// require('./passport')(passport);


const authenticateUser = (email, password, done) => {
  User.findOne({ where: { email: email } })
    .then(user => {
      if (!user) {
        return done(null, false, {
          message: 'El correo electrónico no existe.',
        });
      }
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.log(err);
        }
        if (isMatch) {
          return done(null, {
            user_id: user.user_id,
            name: user.name,
            last_name: user.last_name,
            role: user.role,
            email: user.email
          });
        } else {
          return done(null, false, { message: "Contraseña Incorrecta" });
        }
      });

    })
    .catch(err => {
      if (err) {
        console.log('error en Servidor');
        return done(err);
      }
    });
}


passport.use(new LocalStrategy(
  { usernameField: "email", passwordField: "password" },
  authenticateUser
));

passport.serializeUser((user, done) => done(null, user.user_id));

// passport.deserializeUser((id, done) => {
//   User.findOne({ where: { id: id } })
//     .then(user => {
//       if (user) {
//         return done(null, user);
//       }
//     })
//     .catch(err => {
//       if (err) {
//         console.log('error');
//         return done(err);
//       }
//     })
// })



server.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

server.use(passport.initialize())
// require('./passport')(passport);
server.use(passport.session())


server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//passport configuration
server.use(passport.initialize());
server.use(passport.session());

const authenticateUser = (email, password, done) => {
  User.findOne({ where: { email: email } })
    .then(user => {
      if (!user) {
        return done(null, false, {
          message: 'El correo electrónico no existe.',
        });
      }
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.log(err);
        }
        if (isMatch) {
          return done(null, {
            user_id: user.user_id,
            name: user.name,
            last_name: user.last_name,
            role: user.role,
            email: user.email
          });
        } else {
          return done(null, false, { message: "Contraseña Incorrecta" });
        }
      });
    })
    .catch(err => {
      if (err) {
        console.log('error en Servidor');
        return done(err);
      }
    });
}

passport.use(new LocalStrategy(
  { usernameField: "email", passwordField: "password" },
  authenticateUser
));

passport.serializeUser((user, done) => done(null, user.user_id));

passport.deserializeUser((user_id, done) => {
  User.findOne({ where: { user_id: user_id } })
    .then(user => {
      if (user) {
        return done(null, user);
      }
    }).catch(err => {
      if (err) {
        console.log('error');
        return done(err);
      }
    })
});

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});


module.exports = server;
