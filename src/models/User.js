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
    required: false,
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
});

module.exports = mongoose.model("User", Schema);
