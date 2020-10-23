const {User} = require('../db')

module.exports = (req, res, next) => {
  User.findAll({
    where: {
      role: "user"
    }
  }).then(resp => {
    console.log(resp);
   var user = resp.map(u => u.role)
   if(resp.length > 0){
     if(user[0] === "user"){
       return next()
     }
   }else{
     console.log("necesita estar registrado")
   }
})
 }
