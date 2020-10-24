
//==============AUTENTICACIONES=====================

function isAuthenticated(req, res, next) {
  if(req.isAuthenticated())
    return next();
  else
    return res.status(401).send({message: 'Necesita loguearse primero'});
}
  
function isNotAuthenticated(req, res, next) {
  if(!req.isAuthenticated())
    return next();
  else
    return res.status(401).send();
}

function isAdmin(req, res, next) {
  if(req.user && req.user.role === "admin") { 
    return next();
  } else {
    return res.status(401).send();
  }
}

function isNotAdmin(req, res, next) {
  if(!!req.user === false || req.user.role !== "admin") {
    return next;
  } else {
    return res.status(401).send();
  }
}

module.exports = {
    isAuthenticated,
    isNotAuthenticated,
    isAdmin,
    isNotAdmin
}


