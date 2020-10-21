const {User} = require('../db')

module.exports = (req, res, next) => {
  User.findOne({
    where: {
      rol: "Admin"
    }
  }).then(res => {
    console.log(res);
    return next()
  })
  .catch( err => {
    res.status(401).send("Necesita registrarse")
   })
}