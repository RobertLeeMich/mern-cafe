const jwt = require("jsonwebtoken");

//next calls when we're done with the middleware and want to go to next action, which is running the controller function
module.exports = function (req, res, next) {
  // Check for the token being sent in a header or as a query parameter
  let token = req.get("Authorization") || req.query.token;
  if (token) {
    // Remove the 'Bearer ' if it was included in the token header
    token = token.replace("Bearer ", "");
    // Check if token is valid and not expired
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      // If valid token, decoded will be the token's entire payload
      // If invalid token, err will be set
      //This line decides if a user is logged in or out basically
      if (err) {
        req.user = null;
      } else {
        //decoded user === the user in the token's payload
        req.user = decoded.user;
      }

        //   req.user = err ? null : decoded.user;
      // If your app cares... (optional)
      req.exp = err ? null : new Date(decoded.exp * 1000);
      //next function in line (in this case it goes to the controller function)
      return next();
    });
  } else {
    // No token was sent
    req.user = null;
    return next();
  }
};
