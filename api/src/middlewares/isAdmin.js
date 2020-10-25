
module.exports = (req, res, next) => {
  if (req.user.rol === "Admin") {
    return next();
  }
  res.status(401).send("Acceso no autorizado")
}