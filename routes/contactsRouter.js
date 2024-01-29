const express = require("express");
const contacts = require("../controllers/contactsControllers.js");
const validateBody = require("../helpers/validateBody");
const sсhema = require("../schemas/contactsSchemas");

const contactsRouter = express.Router();

contactsRouter.get("/", contacts.getAllContacts);

contactsRouter.get("/:id", contacts.getOneContact);

contactsRouter.delete("/:id", contacts.deleteContact);

contactsRouter.post(
  "/",
  validateBody(sсhema.createContactSchema),
  contacts.createContact
);

contactsRouter.put(
  "/:id",
  validateBody(sсhema.updateContactSchema),
  contacts.updateContact
);


contactsRouter.patch(
    "/:id/favorite",
    validateBody(sсhema.updatefavoriteSchema),
    contacts.updateFavorite
  );
  
module.exports = contactsRouter;
