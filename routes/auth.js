const express = require("express");
const router = express.Router();
const validateBody = require("../helpers/validateBody");
const sсhema = require("../schemas/contactsSchemas");
const controller = require("../controllers/auth/register");
const controllerLogin = require("../controllers/auth/login");
const upload = require('../middleware/upload')
const updateAvatar = require('../controllers/auth/updateAvatar')
const jwtMiddleware = require('../middleware/jwtMiddleware')

router.post(
  "/register",
  validateBody(sсhema.userSchema),
  controller.registration
);
router.post(
  "/login",
  validateBody(sсhema.userSchema),
  controllerLogin.login
);
router.patch(
  "/avatars",
  validateBody(sсhema.avatarAchema),
  jwtMiddleware,
  upload.single("avatar"),
  updateAvatar
);
module.exports = router;
