require('dotenv').config()
const express = require('express');
const { User } = require('./db');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const passport = require('passport');
const bcrypt = require("bcrypt");
const session = require('express-session');
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
// const cors = require('cors')


require('./db.js');

const server = express();
server.name = 'API';


server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser('secret'));
server.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  // res.header('Access-Control-Allow-Origin', 'https://github.com');
  // res.header('Access-Control-Allow-Origin', 'https://accounts.google.com');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// const corsOptions = {
//   origin: 'https://accounts.google.com',
//   credentials: true
// }
// server.use(cors(corsOptions));

//Configuracion de passport
server.use(passport.initialize());
server.use(passport.session());

const authenticateUser = (email, password, done) => {
  User.findOne({
    where: {
      email
    }
  }).then(user => {
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
  }).catch(err => {
    if (err) {
      console.log('Error en el Servidor');
      return done(err);
    }
  });
}

passport.use(new LocalStrategy(
  { usernameField: "email", passwordField: "password" },
  authenticateUser
));

passport.serializeUser((user, done) => {
  done(null, user)
});

passport.deserializeUser((user_id, done) => {
  User.findOne({
    where: {
      user_id: user_id.user_id
    }
  }).then((user) => {
    if (user) {
      return done(null, {
        user_id: user.user_id,
        email: user.email,
        role: user.role,
      });
    } else {
      done(new Error("Usuario no encontrado"), null);
    }
  }).catch((err) => {
    console.error(err);
    return done(new Error("Error interno"), null);
  });
});


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
  passReqToCallback: true
},
  function (request, accessToken, refreshToken, profile, done) {
    console.log(profile)
    User.findOne({
      where: {
        email: profile.emails[0].value,
        googleAccount: true
      }
    }).then((user) => {
      if (!user) {
        return User.create({
          name: profile.given_name,
          last_name: profile.family_name,
          email: profile.emails[0].value,
          googleAccount: true,
          role: 'user',
          password: profile.id
        });
      } else {
        done(null, {
          user_id: user.user_id,
          email: user.email,
          role: user.role
        });
      }
    }).then(user => {
      done(null, user)
    }).catch(err => {
      console.log('Error google: ', err)
    })
  }
));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL_GITHUB
},
  function (accessToken, refreshToken, profile, done) {
    User.findOne({
      where: {
        email: profile.emails[0].value,
        githubAccount: true
      }
    }).then((user) => {
      if (!user) {
        return User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          githubAccount: true,
          role: 'user',
          password: profile.profileUrl
        });
      } else {
        console.log(user)
        done(null, {
          user_id: user.user_id,
          email: user.email,
          role: user.role
        });
      }
    }).then(user => {
      done(null, user)
    }).catch(err => {
      console.log('Error github: ', err)
    })
  }
));

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});


module.exports = server;