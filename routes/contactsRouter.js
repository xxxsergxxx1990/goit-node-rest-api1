const express = require("express");
const contacts = require("../controllers/contactsControllers.js");
const validateBody = require("../helpers/validateBody");
const sсhema = require("../schemas/contactsSchemas");
const jwtMiddleware = require("../middleware/jwtMiddleware");
const contactsRouter = express.Router();



contactsRouter.get("/", contacts.getAllContacts);

contactsRouter.get("/:id", contacts.getOneContact);

contactsRouter.delete("/:id", contacts.deleteContact);

contactsRouter.post(
  "/",
  jwtMiddleware,
  validateBody(sсhema.createContactSchema),

  contacts.createContact
);

contactsRouter.put(
  "/:id",
  jwtMiddleware,
  validateBody(sсhema.updateContactSchema),
  contacts.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  jwtMiddleware,
  validateBody(sсhema.updatefavoriteSchema),
  contacts.updateFavorite
);

module.exports = contactsRouter;
