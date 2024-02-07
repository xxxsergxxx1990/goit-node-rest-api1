const { HttpError } = require("../helpers/HttpError");
const User = require('../models/users')


const logout = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(HttpError(401, "Not authorized"));
    }

    user.token = null;
    await user.save();

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  const userId = req.user._id;
console.log(req.user)
  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(HttpError(401, "Not authorized"));
    }

    res.json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { logout, getCurrentUser };
