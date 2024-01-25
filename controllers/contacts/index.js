const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const updateById = require("./updateById");
const removeById = require("./removeById");
const { controllerWrapper } = require("../../helpers");

module.exports = {
  getAllContacts: controllerWrapper(getAllContacts),
  getContactById: controllerWrapper(getContactById),
  addContact: controllerWrapper(addContact),
  updateById: controllerWrapper(updateById),
  removeById: controllerWrapper(removeById),
};
