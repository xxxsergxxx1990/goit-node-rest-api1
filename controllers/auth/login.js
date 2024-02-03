const bcrypt = require("bcrypt");
const User = require("../../models/users");
const { HttpError } = require("../../helpers/HttpError");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log("User:", user);
    if (!user) {
      throw HttpError(401, "Email  is not valid");
    }

    const isValidPassword = bcrypt.compare(password, user.password);

    console.log("isValidPassword:", isValidPassword);

    if (!isValidPassword) {
      throw HttpError(401, " Password is not valid");
    }

    res.json({ token: "<TOKEN>" });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
