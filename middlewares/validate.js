const schemaConacts = require("../schemas/contacts");
const RequestError = require("../helpers/RequestError");

function validateBody(schema) {
  const func = async (req, res, next) => {
    const { error } = schemaConacts.validate(req.body);
    if (error) {
      next(RequestError(400, error.message));
    }
    next();
  };
  return func;
}

module.exports = validateBody;
