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

const updatefavoriteSchema = Joi.object({
    favorite:Joi.boolean().required(),
})

module.exports = {
    createContactSchema,
    updateContactSchema,
    updatefavoriteSchema
}