// const LocalStrategy = require("passport-local").Strategy;
// const { User } = require('./db');
// const bcrypt = require("bcrypt");

// module.exports = function initialize(passport) {
//   console.log("inicializando");
//   const authenticateUser = (email, password, done) => {
//     User.findOne({ where: { email: email } })
//       .then(user => {
//         if (!user) {
//           return done(null, false, {
//             message: 'El correo electrónico no existe.',
//           });
//         }
//         bcrypt.compare(password, user.password, (err, isMatch) => {
//           if (err) {
//             console.log(err);
//           }
//           if (isMatch) {
//             console.log('Hola')
//             return done(null, user);
//           } else {
//             return done(null, false, { message: "Contraseña Incorrecta" });
//           }
//         });

//       })
//       .catch(err => {
//         if (err) {
//           console.log('error en Servidor');
//           return done(err);
//         }
//       });
//   };

//   passport.use(new LocalStrategy(
//     { usernameField: "email", passwordField: "password" },
//     authenticateUser
//   ));

//   passport.serializeUser((user, done) => done(null, user.id));

//   passport.deserializeUser((id, done) => {
//     User.findOne({ where: { id: id } })
//       .then(user => {
//         if (user) {
//           return done(null, user);
//         }
//       })
//       .catch(err => {
//         if (err) {
//           console.log('error');
//           return done(err);
//         }
//       })
//   });
// }


