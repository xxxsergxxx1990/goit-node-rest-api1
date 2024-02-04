const jwt = require('jsonwebtoken');
const User = require('../models/users'); 
const { HttpError } = require('../helpers/HttpError');

const jwtMiddlewar = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    next(HttpError(401, 'Unauthorized: Token is missing'));
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id);

    if (!user || token !== user.token) {
      next(HttpError(401, 'Unauthorized: Invalid token'));
    }

    req.user = user;

    next();
  } catch (error) {
    next(HttpError(401, 'Unauthorized: Invalid token'));
  }
};

module.exports = jwtMiddlewar;
