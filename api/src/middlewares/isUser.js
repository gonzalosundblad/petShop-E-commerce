module.exports = (req, res, next) => {
  if(req.user.rol === "user"){
    return next();
  }
  res.status(401).send("Necesita registrarse")
}