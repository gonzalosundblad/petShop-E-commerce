
//==============AUTENTICACIONES=====================

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
  else
    return res.status(401).send({ message: 'Necesita loguearse primero' });
}

function isNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return res.send({ message: "Ya estas logueado flac@" });
  if (!req.isAuthenticated()) return next();
  else
    return res.status(401).send('No estas Logueado');
}

function isAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    return next();
  } else {
    return res.status(401).send('No tienes permiso para ejecutar esta accion :(');
  }
}

function isNotAdmin(req, res, next) {
  if (!!req.user === false || req.user.role !== "admin") {
    return next;
  } else {
    return res.status(401).send('Necesitas ser un administrador');
  }
}

module.exports = {
  isAuthenticated,
  isNotAuthenticated,
  isAdmin,
  isNotAdmin
}


