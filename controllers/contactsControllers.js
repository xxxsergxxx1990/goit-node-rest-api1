const contacts = require("../services/contactsServices");
const HttpError = require("../helpers/HttpError");
const Contact = require("../models/contacts");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await Contact.find({});

    return res.status(200).json(result);
  } catch (error) {
    next(error);
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
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
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
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findOneAndDelete(id);

    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    const { favorite } = req.body;
    const { id } = req.params;

    if (favorite === undefined) {
      return res.status(400).json({ message: "Favorite field is required" });
    }

    const result = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Not found " });
    }

    res.status(200).json(result);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid contact ID" });
    }

    next(error);
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
