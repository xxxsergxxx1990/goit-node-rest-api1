const express = require("express");
const router = express.Router();
const validateBody = require("../helpers/validateBody");
const sсhema = require("../schemas/contactsSchemas");
const controller = require("../controllers/auth/register");
const controllerLogin = require("../controllers/auth/login");

router.post(
  "/users/register",
  validateBody(sсhema.userSchema),
  controller.registration
);
router.post(
  "/users/login",
  validateBody(sсhema.userSchema),
  controllerLogin.login
);

module.exports = router;