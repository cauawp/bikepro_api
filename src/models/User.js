const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: false,
  },
  rg: {
    type: String,
    required: false,
  },
  telefone: {
    type: String,
    required: false,
  },
  resetToken: {
    type: String,
    required: false,
  },
  resetTokenExpiration: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model("User", Schema);
