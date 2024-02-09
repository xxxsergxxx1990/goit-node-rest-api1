const bcrypt = require("bcrypt");
const User = require("../../models/users");
const { HttpError } = require("../../helpers/HttpError");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log("User:", user);
    if (!user) {
      throw HttpError(401, "login || password  is not valid");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    console.log("isValidPassword:", isValidPassword);

    if (!isValidPassword) {
      throw HttpError(401, " login || password is not valid");
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "300m" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
