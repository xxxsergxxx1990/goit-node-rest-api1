// const contacts = require("../services/contactsServices");
const HttpError = require("../helpers/HttpError");
const Contact = require("../models/contacts");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await Contact.find({});

    return res.status(200).json(result);
  } catch (error) {
    next();
  }
};

const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);

    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next();
  }
};

const createContact = async (req, res, next) => {
  try {
    if (!req.body) {
      throw HttpError(400, "Request body is missing");
    }

    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const result = await Contact.findByIdAndUpdate(
      id,
      { name, email, phone },
      { new: true }
    );
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next();
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findOneAndDelete({ _id: id });

    if (!result) {
      throw HttpError(404);
    }

    res.json(result);
  } catch (err) {
    next();
  }
};

const updateFavorite = async (req, res, next) => {
  const { favorite } = req.body;
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, favorite, { new: true });

  try {
    if (!result) {
      throw HttpError(404, `Contact with id = ${id} not found`);
    }
    res.status(200).json(result);
  } catch (error) {
    next();
  }
};

module.exports = {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateFavorite,
};
