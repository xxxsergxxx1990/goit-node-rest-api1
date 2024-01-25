const express = require("express");
const router = express.Router();

const controller = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const contactSchema = require("../../schemas/contacts");

router.get("/", controller.getAllContacts);

router.get("/:contactId", controller.getContactById);

router.post("/", validateBody(contactSchema), controller.addContact);

router.put("/:contactId", validateBody(contactSchema), controller.updateById);

router.delete("/:contactId", controller.removeById);

module.exports = router;
