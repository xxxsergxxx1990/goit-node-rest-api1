const User = require("../../models/users");
const { HttpError } = require("../../helpers/HttpError");
const bcrypt = require("bcrypt");
const gravatar = require('gravatar');
const jimpRead = promisify(jimp.read);
const registration = async (req, res, next) => {
  const { email, password } = req.body;

  const avatarUrl = gravatar.url(email, { s: '250', r: 'pg', d: 'mm' });
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const result = await User.create({
      email,
      password: hashedPassword,
      avatar: avatarUrl,
    });

    const avatar = await jimpRead(avatarUrl);
    await avatar.resize(250, 250).writeAsync(result.avatar);

    res.status(201).json({
      id: result._id,
      email: result.email,
      avatar: result.avatar,
    });
  } catch (error) {
    if (error.message.includes("E11000")) {
      next(HttpError(409, "Email in use"));
    }

    next(error);
  }
};

module.exports = { registration };
