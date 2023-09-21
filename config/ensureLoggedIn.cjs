module.exports = function(req, res, next) {
    // Status code of 401 is Unauthorized
    //If req.user does not exist
    if (!req.user) return res.status(401).json('Unauthorized');
    // A-okay
    //hits the next item in the call stack
    next();
  };