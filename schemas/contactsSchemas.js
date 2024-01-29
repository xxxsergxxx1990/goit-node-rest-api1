const Joi = require('joi')

const createContactSchema = Joi.object({
    name: Joi.string().required(),
    email:Joi.string().required(),
    phone:Joi.number().required(),
    
})

const updateContactSchema = Joi.object({
    name: Joi.string().required(),
    email:Joi.string().required(),
    phone:Joi.string().required(),
    
})

const updatefavoriteSchema = {
    type: "object",
    properties: {
      favorite: { type: "boolean" },
    },
    required: ["favorite"],
  };
  

module.exports = {
    createContactSchema,
    updateContactSchema,
    updatefavoriteSchema
}