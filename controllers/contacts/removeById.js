const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  result
    ? res.json({ message: "contact deleted" })
    : RequestError(404, "Not found");
};

module.exports = removeById;
