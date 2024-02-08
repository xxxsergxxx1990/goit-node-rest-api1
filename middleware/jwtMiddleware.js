const jwt = require("jsonwebtoken");
const User = require("../models/users");
const { HttpError } = require("../helpers/HttpError");

const jwtMiddlewar = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next(HttpError(401, "Unauthorized: Token is missing"));
  }

  try {
   
    const [tokenType, tokenValue] = token.split(' ');

    if (tokenType !== 'Bearer') {
      return next(HttpError(401, 'Unauthorized: Invalid token type'));
    }

    const decodedToken = jwt.verify(tokenValue, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id);
   console.log(tokenType)
  

    req.user = user;

    return next();
  } catch (error) {
    return next(HttpError(401, 'Unauthorized:  token'));
  }
};


module.exports = jwtMiddlewar;
