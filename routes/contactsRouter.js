const express = require("express");
const contacts = require("../controllers/contactsControllers.js");
const validateBody = require("../helpers/validateBody");
const shema = require("../schemas/contactsSchemas");

const contactsRouter = express.Router();

contactsRouter.get("/", contacts.getAllContacts);

contactsRouter.get("/:id", contacts.getOneContact);

contactsRouter.delete("/:id", contacts.deleteContact);

contactsRouter.post(
  "/",
  validateBody(shema.createContactSchema),
  contacts.createContact
);

contactsRouter.put(
  "/:id",
  validateBody(shema.updateContactSchema),
  contacts.updateContact
);


contactsRouter.patch(
    "/:id/favorite",
    validateBody(shema.updatefavoriteSchema),
    contacts.updateFavorite
  );
  
module.exports = contactsRouter;
